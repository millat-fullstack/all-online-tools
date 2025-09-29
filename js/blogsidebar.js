document.addEventListener("DOMContentLoaded", function () {
  const sidebarContainer = document.getElementById("blog-sidebar");

  if (sidebarContainer) {
    fetch("/html/blogsidebar.html") // adjust path if needed
      .then(response => {
        if (!response.ok) {
          throw new Error("Sidebar not found");
        }
        return response.text();
      })
      .then(data => {
        sidebarContainer.innerHTML = data;
      })
      .catch(error => {
        console.error("Error loading sidebar:", error);
      });
  }
});