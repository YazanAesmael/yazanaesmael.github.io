// Generates public/og.png — the social link-preview "business card" (1200×630).
// Run with: npm run og
// Edit the SVG below to change the card, then re-run. Fonts use the system
// stand-ins for the site's Geist / JetBrains Mono (close enough at preview size).
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="16%" cy="-6%" r="85%">
      <stop offset="0%" stop-color="#8b7bff" stop-opacity="0.30"/>
      <stop offset="55%" stop-color="#8b7bff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8b7bff" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#8b7bff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0b0c0e"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${W}" height="8" fill="#8b7bff"/>

  <!-- brand mark -->
  <rect x="80" y="66" width="128" height="48" rx="9" fill="none" stroke="#313742" stroke-width="1.5"/>
  <text x="144" y="99" font-family="Menlo, monospace" font-size="23" font-weight="700" fill="#eef1f5" text-anchor="middle">y.work</text>

  <!-- open to work pill -->
  <rect x="898" y="66" width="222" height="48" rx="24" fill="#14171c" stroke="#313742" stroke-width="1.5"/>
  <circle cx="928" cy="90" r="6" fill="#37d399"/>
  <text x="946" y="98" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="#c3cad3">Open to work</text>

  <!-- name -->
  <text x="78" y="332" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="98" font-weight="700" fill="#eef1f5">Yazan Aesmael</text>

  <!-- title -->
  <text x="80" y="394" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" font-weight="600" fill="#b3a8ff">Lead Android &amp; Kotlin Multiplatform Engineer</text>

  <!-- accent rule -->
  <rect x="82" y="432" width="540" height="3" rx="2" fill="url(#rule)"/>

  <!-- proof line -->
  <text x="80" y="490" font-family="Menlo, monospace" font-size="25" fill="#aab2bd">100,000+ users led&#160;&#160;&#183;&#160;&#160;Live on the App Store&#160;&#160;&#183;&#160;&#160;KMP, end to end</text>

  <!-- footer -->
  <text x="80" y="568" font-family="Menlo, monospace" font-size="30" font-weight="700" fill="#8b7bff">yazan.work</text>
  <text x="1120" y="568" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" fill="#79828e" text-anchor="end">Android &#183; iOS &#183; Kotlin Multiplatform</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: W },
  background: '#0b0c0e',
  font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica Neue' },
});
const png = resvg.render().asPng();
writeFileSync(new URL('../public/og.png', import.meta.url), png);
console.log('wrote public/og.png —', png.length, 'bytes');
