document.addEventListener("DOMContentLoaded", () => {
  fetch("https://nextonlinetools.com/json/tools.json")
    .then(response => response.json())
    .then(tools => {
      const suggestedList = document.querySelector("#suggested-tools .suggested-list");
      if (!suggestedList) return;

      // Shuffle & pick random 4 tools
      const randomTools = tools.sort(() => 0.5 - Math.random()).slice(0, 4);

      // Build HTML
      suggestedList.innerHTML = randomTools.map(tool => `
        <div class="suggested-card">
          <a href="${tool.link}">
            <img src="${tool.image}" alt="${tool.title}">
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
          </a>
        </div>
      `).join("");
    })
    .catch(error => console.error("Error loading tools:", error));
});
