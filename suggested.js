document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".suggested-list");
  if (!container) return;

  fetch("../tools.json")
    .then(res => res.json())
    .then(tools => {
      const currentPage = window.location.pathname.split("/").pop();
      const otherTools = tools.filter(tool =>
        tool.link.split("/").pop() !== currentPage
      );

      const suggested = otherTools.sort(() => 0.5 - Math.random()).slice(0, 3);

      container.innerHTML = suggested.map(tool => `
        <div class="tool-card">
          <a href="../${tool.link}">
            <img src="../${tool.image}" alt="${tool.title}">
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
          </a>
        </div>
      `).join("");
    })
    .catch(err => console.error("Error loading suggested tools:", err));
});
