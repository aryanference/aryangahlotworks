/**
 * Generates public/og.png (1200x630 social card) with the profile photo.
 * Run: node scripts/gen-assets.cjs
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public");
fs.mkdirSync(OUT, { recursive: true });

function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#101014"/>
      <stop offset="1" stop-color="#1e1b4b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1080" cy="100" r="240" fill="#5b8cff" fill-opacity="0.22"/>
  <circle cx="90" cy="600" r="200" fill="#7c3aed" fill-opacity="0.20"/>
  <text x="420" y="280" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" fill="#e8eaf0">Aryan Gahlot</text>
  <text x="420" y="336" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="#9aa1ae">ML &amp; AI Researcher, Data Scientist</text>
  <text x="420" y="396" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#5b8cff">Builder, marketer, entrepreneur — building SecorAi.</text>
</svg>`;
}

async function main() {
  const base = await sharp(Buffer.from(ogSvg()), { density: 96 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  // Rounded square avatar for the card (falls back gracefully if missing).
  let pipeline = sharp(base);
  const avatarPath = path.join(OUT, "avatar.webp");
  if (fs.existsSync(avatarPath)) {
    const AV = 240;
    const rounded = await sharp(avatarPath)
      .resize(AV, AV, { fit: "cover", position: "attention" })
      .composite([
        {
          input: Buffer.from(
            `<svg width="${AV}" height="${AV}"><rect width="${AV}" height="${AV}" rx="48" fill="#fff"/></svg>`,
          ),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();
    pipeline = pipeline.composite([{ input: rounded, left: 100, top: 195 }]);
  }

  await pipeline.toFile(path.join(OUT, "og.png"));
  console.log("wrote public/og.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
