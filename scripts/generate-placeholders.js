const fs = require('fs');
const { PNG } = require('pngjs');

function createPlaceholderPNG(width, height, color, outputPath) {
  const png = new PNG({ width, height });
  
  // Fill with color
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      png.data[idx] = color[0];     // R
      png.data[idx + 1] = color[1]; // G
      png.data[idx + 2] = color[2]; // B
      png.data[idx + 3] = color[3]; // A
    }
  }

  const buffer = PNG.sync.write(png);
  fs.writeFileSync(outputPath, buffer);
}

// Create favicon.png (16x16)
createPlaceholderPNG(16, 16, [0, 122, 255, 255], '../assets/favicon.png');

// Create icon.png (192x192)
createPlaceholderPNG(192, 192, [0, 122, 255, 255], '../assets/icon.png');

// Create splash.png (1242x2436)
createPlaceholderPNG(1242, 2436, [255, 255, 255, 255], '../assets/splash.png');

// Create adaptive-icon.png (192x192)
createPlaceholderPNG(192, 192, [0, 122, 255, 255], '../assets/adaptive-icon.png');
