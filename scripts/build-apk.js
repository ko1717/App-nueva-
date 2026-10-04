import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function buildAndPackageApk() {
  console.log('--- 1. Packaging Web App into Android APK ---');

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

  const baseApkPath = 'AvgustMIPE.apk';
  const zip = new AdmZip(baseApkPath);

  // 1. Remove all existing assets/ and META-INF/ entries from the APK
  const oldEntries = zip.getEntries();
  for (const entry of oldEntries) {
    if (entry.entryName.startsWith('assets/') || entry.entryName.startsWith('META-INF/')) {
      zip.deleteFile(entry.entryName);
    }
  }

  // 2. Recursively add all files from `dist` into `assets/`
  function addDistFilesToZip(dir, zipPrefix) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      const zipPath = `${zipPrefix}/${file}`;

      if (stat.isDirectory()) {
        addDistFilesToZip(fullPath, zipPath);
      } else {
        if (file.endsWith('.apk') || file.endsWith('.map')) continue;
        const fileData = fs.readFileSync(fullPath);
        zip.addFile(zipPath, fileData);
      }
    }
  }

  console.log('Embedding modern web application build into APK assets/...');
  addDistFilesToZip(distDir, 'assets');

  // 3. Write intermediate unsigned APK
  const unalignedApk = 'AvgustMIPE_unaligned.apk';
  const alignedApk = 'AvgustMIPE_aligned.apk';
  zip.writeZip(unalignedApk);

  // 4. Run official Android zipalign 4
  console.log('--- 2. Zip aligning APK (4-byte alignment) ---');
  execSync(`zipalign -f 4 ${unalignedApk} ${alignedApk}`, { stdio: 'inherit' });

  // 5. Sign with official Android apksigner (v2 + v3 scheme)
  console.log('--- 3. Signing APK with official Google apksigner (v2 + v3 Scheme) ---');
  execSync(`apksigner sign --ks debug.p12 --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android --out AvgustMIPE.apk ${alignedApk}`, { stdio: 'inherit' });

  // 6. Verify with apksigner
  console.log('--- 4. Verifying APK signature ---');
  execSync('apksigner verify -v AvgustMIPE.apk', { stdio: 'inherit' });

  // Copy to public and dist
  fs.copyFileSync('AvgustMIPE.apk', 'public/AvgustMIPE.apk');
  if (fs.existsSync('dist')) {
    fs.copyFileSync('AvgustMIPE.apk', 'dist/AvgustMIPE.apk');
  }

  // Cleanup temp files
  if (fs.existsSync(unalignedApk)) fs.unlinkSync(unalignedApk);
  if (fs.existsSync(alignedApk)) fs.unlinkSync(alignedApk);
  if (fs.existsSync('temp_unaligned.apk')) fs.unlinkSync('temp_unaligned.apk');
  if (fs.existsSync('temp_aligned.apk')) fs.unlinkSync('temp_aligned.apk');

  console.log('\nSUCCESS! AvgustMIPE.apk has been generated, zip-aligned and officially signed (100% Android verified)!');
}

buildAndPackageApk().catch(err => {
  console.error('Error packaging APK:', err);
  process.exit(1);
});
