// .github/scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const baseUrl = process.env.BASE_URL || 'https://nextonlinetools.com/';

// === helper to recursively find .html files inside a directory ===
function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let results = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (entry.isFile() && full.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

// === CHANGE THIS if you want to scan the whole repo ===
// I recommend scanning only the tools folder to avoid noise:
const scanFolder = 'tools'; // <-- only include pages under /tools
if (!fs.existsSync(scanFolder)) {
  console.error(`Folder "${scanFolder}" not found. Exiting.`);
  process.exit(0);
}

const files = getFiles(scanFolder).map(f => {
  // convert to posix path and ensure leading slash
  const p = '/' + path.posix.normalize(f.replace(/\\/g, '/'));
  return p;
});

console.log('Found HTML files to include in sitemap:', files);

const urls = files.map(f => {
  const urlPath = f.replace(/index\.html$/, ''); // convert /foo/index.html -> /foo/
  return { url: urlPath, changefreq: 'weekly', priority: 0.7 };
});

const stream = new SitemapStream({ hostname: baseUrl });

streamToPromise(Readable.from(urls).pipe(stream))
  .then(data => {
    // write plain XML (NOT gzipped)
    fs.writeFileSync('sitemap.xml', data.toString('utf8'));
    console.log('✅ sitemap.xml written with', urls.length, 'urls');
  })
  .catch(err => {
    console.error('Error generating sitemap', err);
    process.exit(1);
  });
