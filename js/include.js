// include.js
async function loadHTML(id, file) {
  try {
    let res = await fetch(file);
    if (!res.ok) throw new Error("HTTP error " + res.status);
    let text = await res.text();
    document.getElementById(id).innerHTML = text;
  } catch (err) {
    console.error("Error loading file:", file, err);
  }
}

// Load header & footer
loadHTML("header", "/header.html");
loadHTML("footer", "/footer.html");
