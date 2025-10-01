fetch("https://nextonlinetools.com/html/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    if (typeof initSearch === "function") initSearch();
  });

// Load Footer
fetch("https://nextonlinetools.com/html/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

// Load Tools
fetch("https://nextonlinetools.com/html/tools.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("tools").innerHTML = data;
  });

  // Load Tools
fetch("https://nextonlinetools.com/html/sidebar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("sidebar").innerHTML = data;
  });
