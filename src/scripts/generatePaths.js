import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { getRoute } from '../utils/getRoute.js';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert Windows path to valid file:// URL
const stopsPath = path.join(__dirname, '../data/stops.js');
const stops = (await import(pathToFileURL(stopsPath).href)).default;


// 🔐 Paste your API key here
const API_KEY = 'placeholder for API key';

async function generatePaths() {
  const paths = [];

  for (let i = 0; i < stops.length - 1; i++) {
    const start = stops[i];
    const end = stops[i + 1];
    try {
      console.log(`Fetching path from ${start.name} → ${end.name}...`);
      const path = await getRoute(start, end, API_KEY);
      paths.push(path);
    } catch (err) {
      console.error(`Error fetching ${start.name} → ${end.name}:`, err.message);
    }
  }

  // Build JS file content
  const output = `const paths = ${JSON.stringify(paths, null, 2)};\n\nexport default paths;`;

  // Write to file (only works in Node.js context)
  const fs = await import('fs');
  fs.writeFileSync('./src/data/paths.js', output);

  console.log('✅ Finished writing paths to /src/data/paths.js');
}

generatePaths();
