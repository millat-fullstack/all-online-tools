const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const { Readable } = require("stream");

const baseUrl = "https://nextonlinetools.com/"; // <-- change this to your GitHub Pages domain

// Recursively get all .html files inside /tools and root
function getFiles(dir, files_ = []) {
  const files = fs.readdirSync(dir);
  for (let i in files) {
    const name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else if (name.endsWith(".html")) {
      files_.push(name);
    }
  }
  return files_;
}

const files = getFiles("."); // scan whole repo
const urls = files.map(f => {
  return {
    url: f.replace("./", "/").replace("index.html", ""), // clean up URLs
    changefreq: "weekly",
    priority: 0.7,
  };
});

const stream = new SitemapStream({ hostname: baseUrl });

streamToPromise(Readable.from(urls).pipe(stream).pipe(createGzip()))
  .then(data => {
    fs.writeFileSync("sitemap.xml", data.toString());
    console.log("✅ Sitemap generated!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
