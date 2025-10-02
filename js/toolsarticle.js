const articleMap = {
  "image-to-text-converter.html": "/toolsarticle/imagetext.html",
  "color-picker.html": "/toolsarticle/colorpicker.html",
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