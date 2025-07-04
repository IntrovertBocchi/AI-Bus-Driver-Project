import stops from '../data/stops.js';
import { getRoute } from '../utils/getRoute.js';

// 🔐 Paste your API key here
const API_KEY = 'placeholder';

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
