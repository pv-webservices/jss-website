// Builds a header-friendly logo from the untouched original:
// crops the artwork and paints out the decorative corner wedges so it sits on the ivory header.
import sharp from 'sharp';

const SOURCE = 'public/website logo.jpeg';
const BG = '#f7f0e6';
const crop = { left: 70, top: 62, width: 1470, height: 660 };

const cornerMask = Buffer.from(`<svg width="${crop.width}" height="${crop.height}" xmlns="http://www.w3.org/2000/svg">
  <polygon points="0,0 170,0 0,120" fill="${BG}"/>
  <polygon points="${crop.width},${crop.height} ${crop.width - 150},${crop.height} ${crop.width},${crop.height - 120}" fill="${BG}"/>
</svg>`);

const cleaned = await sharp(SOURCE).extract(crop).composite([{ input: cornerMask }]).toBuffer();
await sharp(cleaned).resize({ width: 520 }).webp({ quality: 90 }).toFile('public/images/logo-clean.webp');
await sharp(cleaned).resize({ width: 1040 }).webp({ quality: 88 }).toFile('public/images/logo-clean@2x.webp');
await sharp(SOURCE).resize(1200, 630, { fit: 'contain', background: BG }).jpeg({ quality: 88 }).toFile('public/images/social.jpg');
console.log('Prepared cleaned logo (520w, 1040w) and social preview.');
