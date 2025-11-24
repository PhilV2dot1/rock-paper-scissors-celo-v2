const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

// Files to convert
const svgFiles = [
  { input: 'public/icon.svg', output: 'public/icon.png' },
  { input: 'public/og-image.svg', output: 'public/og-image.png' },
  { input: 'public/splash.svg', output: 'public/splash.png' },
];

console.log('🎨 Converting SVG to PNG...\n');

svgFiles.forEach(({ input, output }) => {
  try {
    // Read SVG file
    const svg = fs.readFileSync(path.join(__dirname, '..', input), 'utf8');

    // Convert to PNG
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'original',
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Write PNG file
    fs.writeFileSync(path.join(__dirname, '..', output), pngBuffer);

    console.log(`✅ ${input} → ${output}`);
  } catch (error) {
    console.error(`❌ Error converting ${input}:`, error.message);
  }
});

console.log('\n✨ Conversion complete!');
