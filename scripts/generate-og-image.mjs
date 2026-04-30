import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const logoPath = path.join(root, 'attached_assets', 'Horizontal-LOGO-NeurolitSEMTAG@2x_1777555071333.png');
const outputPath = path.join(root, 'artifacts', 'neurolit', 'public', 'opengraph.jpg');

const W = 1200;
const H = 630;

const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0D0D0D"/>
      <stop offset="100%" stop-color="#111116"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E85D3A" stop-opacity="0.35"/>
      <stop offset="40%" stop-color="#F5C518" stop-opacity="0.25"/>
      <stop offset="70%" stop-color="#BEDE2A" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#3D5DAE" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="headlineGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F5C518"/>
      <stop offset="50%" stop-color="#BEDE2A"/>
      <stop offset="100%" stop-color="#E85D3A"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="60" result="blur"/>
    </filter>
    <clipPath id="roundedClip">
      <rect width="${W}" height="${H}" rx="0" ry="0"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

  <!-- Glowing radial blob top-left -->
  <ellipse cx="200" cy="200" rx="340" ry="280" fill="#E85D3A" opacity="0.12" filter="url(#glow)"/>

  <!-- Glowing radial blob bottom-right -->
  <ellipse cx="1050" cy="480" rx="380" ry="300" fill="#3D5DAE" opacity="0.18" filter="url(#glow)"/>

  <!-- Glowing blob center-right -->
  <ellipse cx="850" cy="200" rx="250" ry="220" fill="#BEDE2A" opacity="0.09" filter="url(#glow)"/>

  <!-- Horizontal accent bar top -->
  <rect x="0" y="0" width="${W}" height="4" fill="url(#glowGrad)" opacity="0.8"/>

  <!-- Four color dots — brand palette reference -->
  <circle cx="80" cy="555" r="8" fill="#E85D3A" opacity="0.9"/>
  <circle cx="104" cy="555" r="8" fill="#F5C518" opacity="0.9"/>
  <circle cx="128" cy="555" r="8" fill="#BEDE2A" opacity="0.9"/>
  <circle cx="152" cy="555" r="8" fill="#3D5DAE" opacity="0.9"/>

  <!-- Logo image — white horizontal logo on dark bg -->
  <image href="${logoDataUri}" x="80" y="60" width="340" height="90" preserveAspectRatio="xMidYMid meet"/>

  <!-- Divider line -->
  <line x1="80" y1="185" x2="480" y2="185" stroke="#252525" stroke-width="1"/>

  <!-- Label tag -->
  <text x="80" y="245" font-family="monospace" font-size="13" fill="#BEDE2A" letter-spacing="3" text-anchor="start" opacity="0.9">COMUNIDADE · MEMBERSHIP</text>

  <!-- Main headline line 1 -->
  <text x="80" y="320" font-family="Georgia, serif" font-size="58" font-weight="700" fill="white" letter-spacing="-1">Para empreendedores</text>

  <!-- Main headline line 2 — gradient accent -->
  <text x="80" y="395" font-family="Georgia, serif" font-size="58" font-weight="700" fill="url(#headlineGrad)" letter-spacing="-1">neurodivergentes.</text>

  <!-- Sub-line -->
  <text x="80" y="450" font-family="sans-serif" font-size="20" fill="#A0A0A0" letter-spacing="0.3">Conteúdo, comunidade e sistema para quem pensa diferente.</text>

  <!-- Bottom-right decorative color blocks -->
  <rect x="1020" y="0" width="45" height="210" fill="#E85D3A" opacity="0.7" rx="0"/>
  <rect x="1065" y="0" width="45" height="210" fill="#F5C518" opacity="0.7" rx="0"/>
  <rect x="1110" y="0" width="90" height="210" fill="#BEDE2A" opacity="0.7" rx="0"/>

  <rect x="1020" y="420" width="45" height="210" fill="#3D5DAE" opacity="0.7" rx="0"/>
  <rect x="1065" y="420" width="45" height="210" fill="#E85D3A" opacity="0.6" rx="0"/>
  <rect x="1110" y="420" width="90" height="210" fill="#F5C518" opacity="0.6" rx="0"/>

  <!-- Bottom accent bar -->
  <rect x="0" y="${H - 4}" width="${W}" height="4" fill="url(#glowGrad)" opacity="0.8"/>
</svg>`;

async function generate() {
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  console.log(`OG image written to ${outputPath}`);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
