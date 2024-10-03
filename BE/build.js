const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create the dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

try {
  // Example: Copy the main JavaScript file to the dist folder
  fs.copyFileSync('./src/index.js', './dist/index.js');

  // Example: Minify JavaScript using uglify-js (optional)
  execSync('npx uglifyjs ./src/index.js -o ./dist/index.min.js');

  console.log('Build completed successfully.');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
