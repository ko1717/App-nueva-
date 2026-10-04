import AdmZip from 'adm-zip';
import forge from 'node-forge';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export function signApk(inputApkPath, outputApkPath) {
  console.log(`Signing APK: ${inputApkPath} -> ${outputApkPath}`);

  // 1. Load Keystore and extract RSA Key + X.509 Certificate
  const b64 = fs.readFileSync('debug.keystore.base64', 'utf8').trim();
  const p12Der = forge.util.decode64(b64);
  const p12Asn1 = forge.asn1.fromDer(p12Der);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, 'android');

  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];
  const cert = certBags[0].cert;
  const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag];
  const key = keyBags[0].key;

  const zip = new AdmZip(inputApkPath);
  const entries = zip.getEntries();

  // 2. Remove all existing META-INF files
  const cleanEntries = [];
  for (const entry of entries) {
    if (entry.entryName.startsWith('META-INF/') || entry.isDirectory) {
      continue;
    }
    cleanEntries.push(entry);
  }

  // Sort entries for deterministic signature
  cleanEntries.sort((a, b) => a.entryName.localeCompare(b.entryName));

  // 3. Build MANIFEST.MF
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

  // 4. Build CERT.SF
  let sfContent = 'Signature-Version: 1.0\r\n';
  sfContent += 'Created-By: 1.0 (Android)\r\n';
  sfContent += `SHA-256-Digest-Manifest: ${manifestSha256}\r\n`;
  sfContent += `SHA1-Digest-Manifest: ${manifestSha1}\r\n\r\n`;

  for (const [entryName, section] of manifestSections.entries()) {
    const sectionBuffer = Buffer.from(section, 'utf8');
    const sectionSha256 = crypto.createHash('sha256').update(sectionBuffer).digest('base64');
    const sectionSha1 = crypto.createHash('sha1').update(sectionBuffer).digest('base64');

    sfContent += `Name: ${entryName}\r\n`;
    sfContent += `SHA-256-Digest: ${sectionSha256}\r\n`;
    sfContent += `SHA1-Digest: ${sectionSha1}\r\n\r\n`;
  }

  const sfBuffer = Buffer.from(sfContent, 'utf8');

  // 5. Build CERT.RSA (PKCS#7 signature over CERT.SF)
  const p7 = forge.pkcs7.createSignedData();
  p7.content = forge.util.createBuffer(sfBuffer.toString('binary'), 'raw');
  p7.addCertificate(cert);
  p7.addSigner({
    key: key,
    certificate: cert,
    digestAlgorithm: forge.pki.oids.sha256,
    authenticatedAttributes: [
      {
        type: forge.pki.oids.contentType,
        value: forge.pki.oids.data
      },
      {
        type: forge.pki.oids.messageDigest
      },
      {
        type: forge.pki.oids.signingTime,
        value: new Date('2026-01-01T00:00:00Z')
      }
    ]
  });

  // Detached signature
  p7.sign({ detached: true });
  const asn1 = p7.toAsn1();
  const der = forge.asn1.toDer(asn1).getBytes();
  const rsaBuffer = Buffer.from(der, 'binary');

  // 6. Create clean new zip with META-INF first, then all files
  const newZip = new AdmZip();

  // Add META-INF files
  newZip.addFile('META-INF/MANIFEST.MF', manifestBuffer);
  newZip.addFile('META-INF/CERT.SF', sfBuffer);
  newZip.addFile('META-INF/CERT.RSA', rsaBuffer);

  // Add all content files
  for (const entry of cleanEntries) {
    newZip.addFile(entry.entryName, entry.getData());
  }

  newZip.writeZip(outputApkPath);
  console.log(`Successfully signed ${outputApkPath} (Total files: ${cleanEntries.length + 3})`);
}

// Run standalone if executed directly
if (process.argv[1] && process.argv[1].endsWith('sign-apk.js')) {
  signApk('AvgustMIPE.apk', 'AvgustMIPE.apk');
  signApk('AvgustMIPE.apk', 'public/AvgustMIPE.apk');
}
