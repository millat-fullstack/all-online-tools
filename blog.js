async function loadBlogList() {
    const blogList = [
        { file: "blog1.md" },
        { file: "blog2.md" },
        { file: "blog3.md" }
    ];

    const container = document.getElementById('blog-list');
    if (!container) return;

    container.innerHTML = '';

    for (let blog of blogList) {
        const res = await fetch(`blogs/${blog.file}`);
        const text = await res.text();

        const meta = extractMeta(text);
        const title = meta.title || 'Untitled';
        const date = meta.date || '';
        const description = meta.description || '';
        const image = meta.image || '';

        container.innerHTML += `
        <article class="blog-card">
            <a href="blog.html?blog=${blog.file}">
                ${image ? `<img src="${image}" alt="${title}" class="blog-thumb">` : ''}
                <div class="blog-info">
                  <h2>${title}</h2>
                  <p class="blog-date">${date}</p>
                  <p class="blog-desc">${description}</p>
                </div>
            </a>
        </article>
        `;
    }
}

async function loadBlog() {
    const params = new URLSearchParams(window.location.search);
    const blogFile = params.get('blog');
    if (!blogFile) return;

    // Hide blog list, show article
    document.getElementById('blog-list').style.display = 'none';
    document.getElementById('blog-article').style.display = 'block';

    const res = await fetch(`blogs/${blog.file}`);
    const text = await res.text();

    const meta = extractMeta(text);
    const content = extractContent(text);

    document.getElementById('blog-title').innerText = meta.title || 'Untitled';
    document.getElementById('blog-desc').innerText = meta.description || '';
    document.getElementById('blog-date').innerText = meta.date || '';
    document.getElementById('blog-author').innerText = meta.author ? `✍️ ${meta.author}` : '';
    document.getElementById('blog-views').innerText = meta.views ? `👁 ${meta.views} views` : '';
    if (meta.image) {
        document.getElementById('blog-image').src = meta.image;
        document.getElementById('blog-image').alt = meta.title;
    }
    document.getElementById('blog-content').innerHTML = marked.parse(content);
}

// --- Helpers ---
function extractMeta(text) {
    const match = text.match(/^---([\s\S]*?)---/);
    if (!match) return {};
    const lines = match[1].trim().split('\n');
    const meta = {};
    lines.forEach(line => {
        const [key, ...rest] = line.split(':');
        if (key && rest) {
            meta[key.trim()] = rest.join(':').trim();
        }
    });
    return meta;
}

function extractContent(text) {
    return text.replace(/^---([\s\S]*?)---/, '').trim();
}

// Run correct loader
const params = new URLSearchParams(window.location.search);
if (params.get('blog')) {
    loadBlog();
} else {
    loadBlogList();
}
