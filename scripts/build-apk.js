import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
import { signApkWithV1AndV2 } from './sign-apk-v2.js';

async function buildAndPackageApk() {
  console.log('--- 1. Packaging Web App into Android APK ---');

  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory does not exist. Run `npm run build` first.');
    process.exit(1);
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
        // Exclude any APK or map files if desired
        if (file.endsWith('.apk') || file.endsWith('.map')) continue;
        const fileData = fs.readFileSync(fullPath);
        zip.addFile(zipPath, fileData);
      }
    }
  }

  console.log('Embedding modern web application build into APK assets/...');
  addDistFilesToZip(distDir, 'assets');

  // 3. Write intermediate unsigned APK
  const tempApk = 'AvgustMIPE_temp.apk';
  zip.writeZip(tempApk);

  // 4. Sign with Android keystore using dual Scheme v1 + Scheme v2
  console.log('--- 2. Signing APK with Scheme v1 + Scheme v2 ---');
  signApkWithV1AndV2(tempApk, 'AvgustMIPE.apk');
  signApkWithV1AndV2(tempApk, 'public/AvgustMIPE.apk');
  
  if (fs.existsSync('dist')) {
    fs.copyFileSync('public/AvgustMIPE.apk', 'dist/AvgustMIPE.apk');
  }

  if (fs.existsSync(tempApk)) {
    fs.unlinkSync(tempApk);
  }

  console.log('SUCCESS! AvgustMIPE.apk has been generated and dual-signed (v1 + v2) with 1:1 parity to web.');
}

buildAndPackageApk().catch(err => {
  console.error('Error packaging APK:', err);
  process.exit(1);
});

