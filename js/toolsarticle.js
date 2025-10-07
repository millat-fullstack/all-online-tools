const articleMap = {
  "image-to-text-converter.html": "/toolsarticle/imagetext.html",
  "qr-code-generator-create-free-qr-code-or-scan-qr-code.html": "/toolsarticle/qrcode.html",
  "color-picker.html": "/toolsarticle/colorpicker.html",
  "webp-to-jpg.html": "/toolsarticle/webpjpg.html",
  "pdf-to-jpg.html": "/toolsarticle/pdfjpg.html",
  "link-extractor.html": "/toolsarticle/extractlinks.html",
  "image-resizer.html": "/toolsarticle/imageresizer.html",
  "png-to-jpg-converter.html": "/toolsarticle/pngjpg.html"
};

function loadToolArticle(containerId) {
  const page = window.location.pathname.split("/").pop(); // current filename only
  const articleFile = articleMap[page];

  if (articleFile) {
    fetch(articleFile)
      .then(res => res.text())
      .then(data => {
        document.getElementById(containerId).innerHTML = data;
      })
      .catch(err => console.error("Error loading article:", err));
  }
}