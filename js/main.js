fetch("../html/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    if (typeof initSearch === "function") initSearch();
  });

// Load Footer
fetch("../html/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

// Load Tools
fetch("../html/tools.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("tools").innerHTML = data;
  });

  // Load Tools
fetch("../html/sidebar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("sidebar").innerHTML = data;
  });
