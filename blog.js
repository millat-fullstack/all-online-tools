async function loadBlogList() {
    const blogList = [
        { file: "blog1.md" },
        { file: "blog2.md" }
    ];

    const container = document.getElementById('blog-list');
    container.innerHTML = '';

    for (let blog of blogList) {
        const res = await fetch(`blogs/${blog.file}`);
        const text = await res.text();

        // Extract front matter
        const meta = extractMeta(text);
        const title = meta.title || 'Untitled';
        const date = meta.date || '';
        const description = meta.description || '';

        container.innerHTML += `
        <article class="blog-card">
            <a href="blog.html?blog=${blog.file}">
                <h2>${title}</h2>
                <p class="blog-date">${date}</p>
                <p class="blog-desc">${description}</p>
            </a>
        </article>
        `;
    }
}

async function loadBlog() {
    const params = new URLSearchParams(window.location.search);
    const blogFile = params.get('blog');
    if (!blogFile) return;

    const res = await fetch(`blogs/${blogFile}`);
    const text = await res.text();

    // Extract meta + content
    const meta = extractMeta(text);
    const content = extractContent(text);

    // Update page content
    document.getElementById('blog-title').innerText = meta.title || 'Untitled';
    document.getElementById('blog-date').innerText = meta.date || '';
    document.getElementById('blog-content').innerHTML = marked.parse(content);

    // Inject SEO tags
    document.title = meta.title + " | My Blog";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = meta.description || meta.title;
    document.head.appendChild(metaDesc);
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

// Decide which to load
if (document.getElementById('blog-list')) {
    loadBlogList();
} else if (document.getElementById('blog-content')) {
    loadBlog();
}
