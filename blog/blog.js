let blogPosts = [];
let currentPage = 1;
const postsPerPage = 9;

const blogList = document.getElementById("blogList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// Fetch posts.json
fetch("../../json/posts.json")
  .then(res => res.json())
  .then(data => {
    blogPosts = data;
    renderPosts();
  })
  .catch(err => {
    console.error("Error loading posts.json:", err);
  });

function renderPosts() {
  const searchText = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  let filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchText) ||
      post.description.toLowerCase().includes(searchText);
    const matchesCategory =
      category === "all" || post.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = filteredPosts.slice(start, end);

  blogList.innerHTML = paginatedPosts.map(post => `
    <article class="blog-card">
      <img src="${post.image}" alt="${post.title}">
      <h2><a href="${post.link}">${post.title}</a></h2>
      <p>${post.description}</p>
    </article>
  `).join("");

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Pagination controls
prevBtn.addEventListener("click", () => {
  currentPage--;
  renderPosts();
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  renderPosts();
});

// Search + Filter
searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderPosts();
});

categoryFilter.addEventListener("change", () => {
  currentPage = 1;
  renderPosts();
});
