const tools = [
  { name: "QR Code Generator & Scanner", url: "qr-tool.html" },
  { name: "Unit Converter", url: "unit-converter.html" },
  { name: "Text to Slug Generator", url: "slug-tool.html" },
  { name: "PDF to JPG Converter", url: "pdf-to-jpg.html" },
  // add more tools here
];

const searchInput = document.getElementById("toolSearch");

searchInput.addEventListener("keyup", function(e) {
  if (e.key === "Enter") {
    const query = searchInput.value.toLowerCase();
    const match = tools.find(t => t.name.toLowerCase().includes(query));
    if (match) {
      window.location.href = match.url;
    } else {
      alert("No matching tool found.");
    }
  }
});
