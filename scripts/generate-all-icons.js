import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

async function generateIcons() {
  const masterPath = path.resolve('src/assets/images/avgust_official_logo_1791090507131.jpg');
  if (!fs.existsSync(masterPath)) {
    console.error('Master image not found:', masterPath);
    return;
  }

  console.log('1. Loading master Avgust logo...');
  // Precise bounding box of logo content: X: 261..762 (501px), Y: 123..899 (776px)
  // We extract tightly with 2px margin:
  const tightLogoBuffer = await sharp(masterPath)
    .extract({ left: 258, top: 120, width: 508, height: 782 })
    .png()
    .toBuffer();

  const tightMeta = await sharp(tightLogoBuffer).metadata();
  const tightW = tightMeta.width;
  const tightH = tightMeta.height;
  const tightRatio = tightW / tightH; // ~0.6496

  /**
   * Helper to create centered icon on pure white background
   * @param {number} size - Canvas size
   * @param {number} contentScale - Fraction of canvas for logo height (e.g. 0.62 for adaptive/maskable safe area, 0.76 for standard)
   * @param {boolean} isCircle - Whether to mask canvas as a circle
   */
  async function createIconCanvas(size, contentScale, isCircle = false) {
    const targetH = Math.round(size * contentScale);
    const targetW = Math.round(targetH * tightRatio);

    const resizedLogo = await sharp(tightLogoBuffer)
      .resize(targetW, targetH, { fit: 'contain', kernel: 'lanczos3' })
      .toBuffer();

    const left = Math.round((size - targetW) / 2);
    const top = Math.round((size - targetH) / 2);

    let base = sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    }).composite([
      {
        input: resizedLogo,
        top: top,
        left: left,
        blend: 'over'
      }
    ]);

    if (isCircle) {
      // Create SVG circle mask
      const circleSvg = Buffer.from(`
        <svg width="${size}" height="${size}">
          <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff" />
        </svg>
      `);
      const iconPng = await base.png().toBuffer();
      return sharp(iconPng)
        .composite([{ input: circleSvg, blend: 'dest-in' }])
        .png()
        .toBuffer();
    }

    return base.png().toBuffer();
  }

  // 1. Generate Public / Web / PWA icons
  console.log('2. Generating Web and PWA icons...');
  const pwa512 = await createIconCanvas(512, 0.74, false);
  const pwaMaskable512 = await createIconCanvas(512, 0.60, false); // Strict 60% safe zone for PWA maskable
  const pwa192 = await createIconCanvas(192, 0.74, false);
  const appleTouch = await createIconCanvas(180, 0.72, false);
  const favicon32 = await createIconCanvas(32, 0.80, false);
  const favicon48 = await createIconCanvas(48, 0.80, false);

  fs.writeFileSync('public/pwa-512x512.png', pwa512);
  fs.writeFileSync('public/pwa-maskable-512x512.png', pwaMaskable512);
  fs.writeFileSync('public/pwa-192x192.png', pwa192);
  fs.writeFileSync('public/icon.png', pwa512);
  fs.writeFileSync('public/apple-touch-icon.png', appleTouch);
  fs.writeFileSync('public/avgust-logo.png', pwa512);
  fs.writeFileSync('public/logo.png', pwa512);
  fs.writeFileSync('public/favicon.ico', favicon48);

  const pwaJpg = await sharp(pwa512).jpeg({ quality: 98 }).toBuffer();
  fs.writeFileSync('public/avgust-logo.jpg', pwaJpg);
  fs.writeFileSync('public/logo.jpg', pwaJpg);

  // 2. Android Mipmap densities:
  // mdpi (48, foreground 108)
  // hdpi (72, foreground 162)
  // xhdpi (96, foreground 216)
  // xxhdpi (144, foreground 324)
  // xxxhdpi (192, foreground 432)
  console.log('3. Generating Android Mipmap icons...');
  const densities = [
    { name: 'mdpi', size: 48, fgSize: 108 },
    { name: 'hdpi', size: 72, fgSize: 162 },
    { name: 'xhdpi', size: 96, fgSize: 216 },
    { name: 'xxhdpi', size: 144, fgSize: 324 },
    { name: 'xxxhdpi', size: 192, fgSize: 432 }
  ];

  const generatedMipmaps = {};

  for (const d of densities) {
    const dir = `app/src/main/res/mipmap-${d.name}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Standard square launcher with gentle 72% content scale and clean white background
    const launcherPng = await createIconCanvas(d.size, 0.74, false);
    // Round launcher with 62% content scale inside circle mask
    const roundPng = await createIconCanvas(d.size, 0.62, true);
    // Adaptive icon foreground (108dp canvas with 60% safe area scale)
    const fgPng = await createIconCanvas(d.fgSize, 0.60, false);

    fs.writeFileSync(path.join(dir, 'ic_launcher.png'), launcherPng);
    fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), roundPng);
    fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), fgPng);

    generatedMipmaps[d.name] = { launcherPng, roundPng, fgPng };
  }

  // Also save master foreground in drawable
  const masterFg = await createIconCanvas(432, 0.60, false);
  const drawableDir = 'app/src/main/res/drawable';
  if (!fs.existsSync(drawableDir)) fs.mkdirSync(drawableDir, { recursive: true });
  fs.writeFileSync(path.join(drawableDir, 'ic_launcher_foreground.png'), masterFg);

  // 3. Update APK packages (both root and public)
  console.log('4. Updating APK mipmaps inside AvgustMIPE.apk...');
  const apkPaths = ['AvgustMIPE.apk', 'public/AvgustMIPE.apk'];

  for (const apkPath of apkPaths) {
    if (fs.existsSync(apkPath)) {
      console.log(`Processing ${apkPath}...`);
      const zip = new AdmZip(apkPath);

      for (const d of densities) {
        const v4Dir = `res/mipmap-${d.name}-v4`;
        const { launcherPng, roundPng } = generatedMipmaps[d.name];

        // Replace or add launcher & round
        zip.updateFile(`${v4Dir}/ic_launcher.png`, launcherPng);
        zip.updateFile(`${v4Dir}/ic_launcher_round.png`, roundPng);
      }

      // Also update drawable foreground inside apk if present
      const fgFile = zip.getEntry('res/drawable/ic_launcher_foreground.xml');
      if (fgFile) {
        // keep or update
      }

      zip.writeZip(apkPath);
      console.log(`Successfully updated ${apkPath}`);
    }
  }

  console.log('All icons generated and synced successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
