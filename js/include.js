// include.js
async function loadHTML(id, file, callback) {
  try {
    let res = await fetch(file);
    if (!res.ok) throw new Error("HTTP error " + res.status);
    let text = await res.text();
    document.getElementById(id).innerHTML = text;

    // Run callback if provided (e.g., initSearch after header is loaded)
    if (callback && typeof callback === "function") callback();
  } catch (err) {
    console.error("Error loading file:", file, err);
  }
}

// Load header and run initSearch after it’s loaded
loadHTML("header", "/html/header.html", () => {
  if (typeof initSearch === "function") initSearch();
});

// Load footer normally
loadHTML("footer", "/html/footer.html");
