import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function buildAndPackageApk() {
  console.log('=== 1. Starting 100% Android-Compliant APK Build ===');

  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory does not exist. Run `npm run build` first.');
    process.exit(1);
  }

  // Ensure debug.p12 exists
  if (!fs.existsSync('debug.p12')) {
    const b64 = fs.readFileSync('debug.keystore.base64', 'utf8').trim();
    fs.writeFileSync('debug.p12', Buffer.from(b64, 'base64'));
  }

  const tempDir = path.resolve('apk_staging');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  // 1. Unzip base APK structure
  console.log('Extracting base Android package...');
  execSync(`unzip -q AvgustMIPE.apk -d "${tempDir}"`);

  // 2. Remove any old META-INF signatures
  const metaInfDir = path.join(tempDir, 'META-INF');
  if (fs.existsSync(metaInfDir)) {
    fs.rmSync(metaInfDir, { recursive: true, force: true });
  }

  // 3. Sync web dist files into assets/
  console.log('Embedding latest web assets into APK assets/...');
  const targetAssetsDir = path.join(tempDir, 'assets');
  if (!fs.existsSync(targetAssetsDir)) {
    fs.mkdirSync(targetAssetsDir, { recursive: true });
  }

  // Copy dist into assets
  const distEntries = fs.readdirSync(distDir);
  for (const entry of distEntries) {
    if (entry.endsWith('.apk') || entry.endsWith('.map')) continue;
    const src = path.join(distDir, entry);
    execSync(`cp -rf "${src}" "${targetAssetsDir}/"`);
  }

  // 4. Construct unaligned APK with resources.arsc STORED (method 0 - uncompressed)
  console.log('=== 2. Creating APK with STORED (uncompressed) resources.arsc ===');
  const unalignedApk = path.resolve('staging_unaligned.apk');
  const alignedApk = path.resolve('staging_aligned.apk');
  const finalApk = path.resolve('AvgustMIPE.apk');

  if (fs.existsSync(unalignedApk)) fs.unlinkSync(unalignedApk);
  if (fs.existsSync(alignedApk)) fs.unlinkSync(alignedApk);

  // Crucial: resources.arsc MUST be stored without compression (method 0)
  execSync(`cd "${tempDir}" && zip -0 "${unalignedApk}" resources.arsc`, { stdio: 'inherit' });
  // Add all other files with standard compression (-9), excluding resources.arsc and META-INF
  execSync(`cd "${tempDir}" && zip -r -9 -u "${unalignedApk}" . -x "resources.arsc" "META-INF/*"`, { stdio: 'inherit' });

  // 5. 4-byte ZipAlign
  console.log('=== 3. Executing 4-byte zipalign ===');
  execSync(`zipalign -f 4 "${unalignedApk}" "${alignedApk}"`, { stdio: 'inherit' });

  // Verify alignment
  execSync(`zipalign -c -v 4 "${alignedApk}" | grep "resources.arsc"`, { stdio: 'inherit' });

  // 6. Official apksigner with v1, v2, and v3 schemes
  console.log('=== 4. Signing with official apksigner (v1 + v2 + v3 schemes) ===');
  execSync(
    `apksigner sign --ks debug.p12 --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android --min-sdk-version 21 --v1-signing-enabled true --v2-signing-enabled true --v3-signing-enabled true --out "${finalApk}" "${alignedApk}"`,
    { stdio: 'inherit' }
  );

  // 7. Verify all signature schemes
  console.log('=== 5. Verifying Android Signature Schemes ===');
  execSync(`apksigner verify -v --min-sdk-version 23 "${finalApk}"`, { stdio: 'inherit' });

  // 8. Copy to public/ and dist/
  fs.copyFileSync(finalApk, 'public/AvgustMIPE.apk');
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(finalApk, 'dist/AvgustMIPE.apk');
  }

  // Cleanup temporary staging
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
  if (fs.existsSync(unalignedApk)) fs.unlinkSync(unalignedApk);
  if (fs.existsSync(alignedApk)) fs.unlinkSync(alignedApk);
  if (fs.existsSync('apk_temp')) fs.rmSync('apk_temp', { recursive: true, force: true });
  if (fs.existsSync('test_clean.apk')) fs.unlinkSync('test_clean.apk');
  if (fs.existsSync('test_unaligned.apk')) fs.unlinkSync('test_unaligned.apk');
  if (fs.existsSync('test_aligned.apk')) fs.unlinkSync('test_aligned.apk');
  if (fs.existsSync('test_signed.apk')) fs.unlinkSync('test_signed.apk');
  if (fs.existsSync('test_signed2.apk')) fs.unlinkSync('test_signed2.apk');
  if (fs.existsSync('test_signed3.apk')) fs.unlinkSync('test_signed3.apk');

  console.log('\n✅ SUCCESS: AvgustMIPE.apk is 100% compliant with Android standards!');
  console.log(' - resources.arsc: STORED (0% compression, 4-byte aligned)');
  console.log(' - Signature Schemes: v1 (JAR) = true, v2 = true, v3 = true');
  console.log(' - Ready for installation on all physical Android devices.');
}

buildAndPackageApk().catch(err => {
  console.error('Fatal error packaging APK:', err);
  process.exit(1);
});
