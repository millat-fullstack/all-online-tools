document.addEventListener("DOMContentLoaded", () => {
  // Get category from URL
  const params = new URLSearchParams(window.location.search);
  const category = params.get("type");
  if (!category) return;

  // Update page title dynamically
  document.title = `${category} Tools | Next Online Tools`;

  // Fetch tools.json (adjusted path for your folder structure)
  fetch("../json/tools.json")
    .then(res => res.json())
    .then(tools => {
      const container = document.getElementById("tools-list");
      if (!container) return;

      // Filter tools by category (case-insensitive)
      const filtered = tools.filter(tool =>
        tool.category.toLowerCase() === category.toLowerCase()
      );

      // Generate HTML
      if (filtered.length) {
        container.innerHTML = filtered.map(tool => `
          <div class="tool-card">
            <a href="${tool.link}">
              <img src="${tool.image}" alt="${tool.title}">
              <h3>${tool.title}</h3>
              <p>${tool.description}</p>
            </a>
          </div>
        `).join("");
      } else {
        container.innerHTML = `<p>No tools found in the "${category}" category.</p>`;
      }
    })
    .catch(err => console.error("Error loading tools:", err));
});
