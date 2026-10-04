import AdmZip from 'adm-zip';
import forge from 'node-forge';
import fs from 'fs';
import crypto from 'crypto';

/**
 * Sign an APK with both APK Signature Scheme v1 (JAR signing) and APK Signature Scheme v2 (APK Signing Block).
 * This ensures compatibility with all Android versions from Android 5.0 through Android 15+.
 */
export function signApkWithV1AndV2(inputApkPath, outputApkPath) {
  console.log(`[Signer] Signing APK (v1 + v2): ${inputApkPath} -> ${outputApkPath}`);

  // 1. Load Keystore and extract RSA Key + X.509 Certificate
  const b64 = fs.readFileSync('debug.keystore.base64', 'utf8').trim();
  const p12Der = forge.util.decode64(b64);
  const p12Asn1 = forge.asn1.fromDer(p12Der);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, 'android');

  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];
  const certForge = certBags[0].cert;
  const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag];
  const keyForge = keyBags[0].key;

  // Get raw certificate DER buffer
  const certDer = Buffer.from(forge.asn1.toDer(forge.pki.certificateToAsn1(certForge)).getBytes(), 'binary');
  // Get raw public key DER buffer (SubjectPublicKeyInfo)
  const pubKeyDer = Buffer.from(forge.asn1.toDer(forge.pki.publicKeyToAsn1(certForge.publicKey)).getBytes(), 'binary');
  // Get private key PEM for Node crypto signing
  const privateKeyPem = forge.pki.privateKeyToPem(keyForge);

  // 2. Perform v1 JAR Signing
  const zip = new AdmZip(inputApkPath);
  const entries = zip.getEntries();

  const cleanEntries = [];
  for (const entry of entries) {
    if (entry.entryName.startsWith('META-INF/') || entry.isDirectory) {
      continue;
    }
    cleanEntries.push(entry);
  }

  cleanEntries.sort((a, b) => a.entryName.localeCompare(b.entryName));

  let manifestContent = 'Manifest-Version: 1.0\r\nCreated-By: 1.0 (Android)\r\n\r\n';
  const manifestSections = new Map();

  for (const entry of cleanEntries) {
    const data = entry.getData();
    const sha256 = crypto.createHash('sha256').update(data).digest('base64');
    const sha1 = crypto.createHash('sha1').update(data).digest('base64');

    const section = `Name: ${entry.entryName}\r\nSHA-256-Digest: ${sha256}\r\nSHA1-Digest: ${sha1}\r\n\r\n`;
    manifestSections.set(entry.entryName, section);
    manifestContent += section;
  }

  const manifestBuffer = Buffer.from(manifestContent, 'utf8');
  const manifestSha256 = crypto.createHash('sha256').update(manifestBuffer).digest('base64');
  const manifestSha1 = crypto.createHash('sha1').update(manifestBuffer).digest('base64');

  let sfContent = 'Signature-Version: 1.0\r\n';
  sfContent += 'Created-By: 1.0 (Android)\r\n';
  sfContent += `SHA-256-Digest-Manifest: ${manifestSha256}\r\n`;
  sfContent += `SHA1-Digest-Manifest: ${manifestSha1}\r\n`;
  sfContent += 'X-Android-APK-Signed: 2\r\n\r\n';

  for (const [entryName, section] of manifestSections.entries()) {
    const sectionBuffer = Buffer.from(section, 'utf8');
    const sectionSha256 = crypto.createHash('sha256').update(sectionBuffer).digest('base64');
    const sectionSha1 = crypto.createHash('sha1').update(sectionBuffer).digest('base64');

    sfContent += `Name: ${entryName}\r\n`;
    sfContent += `SHA-256-Digest: ${sectionSha256}\r\n`;
    sfContent += `SHA1-Digest: ${sectionSha1}\r\n\r\n`;
  }

  const sfBuffer = Buffer.from(sfContent, 'utf8');

  const p7 = forge.pkcs7.createSignedData();
  p7.content = forge.util.createBuffer(sfBuffer.toString('binary'), 'raw');
  p7.addCertificate(certForge);
  p7.addSigner({
    key: keyForge,
    certificate: certForge,
    digestAlgorithm: forge.pki.oids.sha256,
    authenticatedAttributes: [
      { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
      { type: forge.pki.oids.messageDigest },
      { type: forge.pki.oids.signingTime, value: new Date('2026-01-01T00:00:00Z') }
    ]
  });

  p7.sign({ detached: true });
  const rsaBuffer = Buffer.from(forge.asn1.toDer(p7.toAsn1()).getBytes(), 'binary');

  // Write intermediate v1-signed zip buffer
  const v1Zip = new AdmZip();
  v1Zip.addFile('META-INF/MANIFEST.MF', manifestBuffer);
  v1Zip.addFile('META-INF/CERT.SF', sfBuffer);
  v1Zip.addFile('META-INF/CERT.RSA', rsaBuffer);

  for (const entry of cleanEntries) {
    v1Zip.addFile(entry.entryName, entry.getData());
  }

  const v1ApkBytes = v1Zip.toBuffer();

  // 3. Inject APK Signature Scheme v2 (APK Signing Block)
  console.log('[Signer] Generating APK Signature Scheme v2 block...');

  // Find End of Central Directory (EoCD) record in the zip
  // EoCD signature is 0x06054b50 (PK\x05\x06)
  let eocdOffset = -1;
  for (let i = v1ApkBytes.length - 22; i >= 0; i--) {
    if (v1ApkBytes.readUInt32LE(i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }

  if (eocdOffset === -1) {
    throw new Error('Could not locate ZIP End of Central Directory (EoCD)');
  }

  // Central directory offset is at EoCD + 16
  const cdOffset = v1ApkBytes.readUInt32LE(eocdOffset + 16);
  const cdSize = v1ApkBytes.readUInt32LE(eocdOffset + 12);

  // Section 1: Bytes 0 to cdOffset (ZIP entries)
  const section1 = v1ApkBytes.subarray(0, cdOffset);
  // Section 2: Central Directory
  const section2 = v1ApkBytes.subarray(cdOffset, cdOffset + cdSize);
  // Section 3: EoCD with original CD offset unmodified (for hashing)
  const section3 = Buffer.from(v1ApkBytes.subarray(eocdOffset));

  // Compute 1MB chunked SHA-256 digest
  const CHUNK_SIZE = 1048576; // 1 MB
  const chunks = [];

  function splitIntoChunks(buf) {
    for (let offset = 0; offset < buf.length; offset += CHUNK_SIZE) {
      const end = Math.min(offset + CHUNK_SIZE, buf.length);
      chunks.push(buf.subarray(offset, end));
    }
  }

  splitIntoChunks(section1);
  splitIntoChunks(section2);
  splitIntoChunks(section3);

  const chunkDigests = [];
  for (const chunk of chunks) {
    const chunkHeader = Buffer.alloc(5);
    chunkHeader[0] = 0x5a; // APK v2 chunk prefix
    chunkHeader.writeUInt32LE(chunk.length, 1);

    const hash = crypto.createHash('sha256')
      .update(chunkHeader)
      .update(chunk)
      .digest();
    chunkDigests.push(hash);
  }

  // Top-level root digest
  const topHeader = Buffer.alloc(5);
  topHeader[0] = 0x5a;
  topHeader.writeUInt32LE(chunks.length, 1);

  const rootDigest = crypto.createHash('sha256')
    .update(topHeader)
    .update(Buffer.concat(chunkDigests))
    .digest();

  // 4. Construct v2 Signed Data
  // Digest entry: [uint32 algorithm_id: 0x0101 (RSA-SHA256), uint32 digest_len, digest_bytes]
  const digestEntry = Buffer.concat([
    Buffer.from([0x01, 0x01, 0x00, 0x00]), // 0x0101 in LE
    writeLenPrefixed(rootDigest)
  ]);
  const digestsSequence = writeLenPrefixed(writeLenPrefixed(digestEntry));

  // Certificates sequence
  const certsSequence = writeLenPrefixed(writeLenPrefixed(certDer));

  // Additional attributes (empty)
  const additionalAttributes = writeLenPrefixed(Buffer.alloc(0));

  // Signed Data
  const signedData = Buffer.concat([
    digestsSequence,
    certsSequence,
    additionalAttributes
  ]);
  const signedDataPrefixed = writeLenPrefixed(signedData);

  // 5. Compute RSA-SHA256 Signature over signedData
  const sign = crypto.createSign('SHA256');
  sign.update(signedData);
  const signatureBytes = sign.sign(privateKeyPem);

  // Signature entry: [uint32 algorithm_id: 0x0101, uint32 sig_len, sig_bytes]
  const signatureEntry = Buffer.concat([
    Buffer.from([0x01, 0x01, 0x00, 0x00]),
    writeLenPrefixed(signatureBytes)
  ]);
  const signaturesSequence = writeLenPrefixed(writeLenPrefixed(signatureEntry));

  // Public key prefixed
  const publicKeyPrefixed = writeLenPrefixed(pubKeyDer);

  // Signer
  const signer = Buffer.concat([
    signedDataPrefixed,
    signaturesSequence,
    publicKeyPrefixed
  ]);
  const signersSequence = writeLenPrefixed(writeLenPrefixed(signer));

  // APK v2 Scheme Block ID: 0x7109871a
  const v2BlockId = Buffer.from([0x1a, 0x87, 0x09, 0x71]);
  const v2PairValue = signersSequence;
  const v2PairLength = BigInt(4 + v2PairValue.length);

  const pairLenBuf = Buffer.alloc(8);
  pairLenBuf.writeBigUInt64LE(v2PairLength, 0);

  const v2Pair = Buffer.concat([
    pairLenBuf,
    v2BlockId,
    v2PairValue
  ]);

  // APK Signing Block layout:
  // [uint64 size_of_block]
  // [pairs...]
  // [uint64 size_of_block]
  // [16 bytes magic: "APK Sig Block 42"]
  const magic = Buffer.from('APK Sig Block 42', 'ascii');
  const blockSize = BigInt(v2Pair.length + 8 + 16); // pairs length + size2 + magic

  const size1Buf = Buffer.alloc(8);
  size1Buf.writeBigUInt64LE(blockSize, 0);
  const size2Buf = Buffer.alloc(8);
  size2Buf.writeBigUInt64LE(blockSize, 0);

  const apkSigningBlock = Buffer.concat([
    size1Buf,
    v2Pair,
    size2Buf,
    magic
  ]);

  // 6. Assemble the Final Signed APK
  // Update EoCD's Central Directory Offset by +apkSigningBlock.length
  const newCdOffset = cdOffset + apkSigningBlock.length;
  const updatedEocd = Buffer.from(section3);
  updatedEocd.writeUInt32LE(newCdOffset, 16);

  const finalApk = Buffer.concat([
    section1,
    apkSigningBlock,
    section2,
    updatedEocd
  ]);

  fs.writeFileSync(outputApkPath, finalApk);
  console.log(`[Signer] APK successfully signed with Scheme v1 + v2 (${finalApk.length} bytes)!`);
}

function writeLenPrefixed(buffer) {
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32LE(buffer.length, 0);
  return Buffer.concat([lenBuf, buffer]);
}

if (process.argv[1] && process.argv[1].endsWith('sign-apk-v2.js')) {
  signApkWithV1AndV2('AvgustMIPE.apk', 'AvgustMIPE.apk');
}
