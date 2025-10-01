// --- Static pages ---
const staticPages = [
  { title: "About Us", url: "about.html", description: "Learn more about Next Online Tools." },
  { title: "Contact", url: "contact.html", description: "Get in touch with us." },
  { title: "Home", url: "index.html", description: "Back to homepage." }
];

// --- Initialize Search ---
function initSearch() {
  const searchBox = document.getElementById("toolSearch");
  const suggestionsBox = document.getElementById("searchSuggestions");
  if (!searchBox || !suggestionsBox) return;

  let searchData = [...staticPages];

  // --- Load tools.json ---
  const toolsPromise = fetch("/json/tools.json")
    .then(res => res.json())
    .then(tools => {
      tools.forEach(tool => {
        searchData.push({
          title: tool.title,
          url: tool.link,
          description: tool.description
        });
      });
    })
    .catch(err => console.error("Tools JSON error:", err));

  // --- Load posts.json ---
  const postsPromise = fetch("/json/posts.json")
    .then(res => res.json())
    .then(posts => {
      posts.forEach(post => {
        searchData.push({
          title: post.title,
          url: post.link,
          description: post.description
        });
      });
    })
    .catch(err => console.error("Posts JSON error:", err));

  // --- Wait for both JSONs ---
  Promise.all([toolsPromise, postsPromise]).then(() => {
    searchBox.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();
      suggestionsBox.innerHTML = "";

      if (!query) {
        suggestionsBox.style.display = "none";
        return;
      }

      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      );

      if (results.length) {
        suggestionsBox.style.display = "block";
        results.forEach(item => {
          const div = document.createElement("div");
          div.classList.add("suggestion-item");
          div.innerHTML = `<strong>${item.title}</strong><br><small>${item.description || ""}</small>`;
          div.addEventListener("click", () => {
            window.location.href = item.url;
          });
          suggestionsBox.appendChild(div);
        });
      } else {
        suggestionsBox.style.display = "none";
      }
    });

    // Close suggestions when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchBox.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.innerHTML = "";
        suggestionsBox.style.display = "none";
      }
    });
  });
}

// --- Run after DOM loads ---
document.addEventListener("DOMContentLoaded", initSearch);
