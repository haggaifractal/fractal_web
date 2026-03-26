import sharp from 'sharp';

async function createOgImage() {
  try {
    console.log('Reading logo...');
    const logoBuf = await sharp('./public/logo-icon.png')
      .resize({ width: 800, height: 430, fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    console.log('Generating black background composite...');
    await sharp({
      create: { width: 1200, height: 630, channels: 4, background: { r: 15, g: 15, b: 15, alpha: 1 } }
    })
    .composite([{ input: logoBuf, gravity: 'center' }])
    .jpeg({ quality: 95 })
    .toFile('./public/og-image.jpg');

    console.log('✅ og-image.jpg created successfully in the public directory!');
  } catch (err) {
    console.error('❌ Error generating image:', err);
  }
}

createOgImage();
