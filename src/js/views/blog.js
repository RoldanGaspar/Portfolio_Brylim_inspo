function renderBlog() {
    const posts = portfolioData.blog || [];
    const categories = ['All', ...new Set(posts.map(p => p.category).filter(Boolean))];

    return `
        <div class="page-header reveal">
            <h2>blog</h2>
            <p class="page-desc">Thoughts, tutorials, and notes on AI harnesses, cybersecurity guardrails, and software engineering.</p>
            <div class="blog-filter-bar" id="blog-filter-bar" role="tablist" aria-label="Filter blog posts by category">
                ${categories.map((cat, idx) => `
                    <button class="blog-filter-pill ${idx === 0 ? 'active' : ''}" data-blog-cat="${cat}" type="button">
                        ${cat}
                    </button>
                `).join('')}
            </div>
        </div>
        <div class="blog-full-list reveal" id="blog-full-list">
            ${posts.map(post => `
                <a href="#/blog/${post.id}" class="blog-full-item blog-card-link" data-category="${post.category || 'General'}">
                    <div class="blog-full-image" style="background-image: url('${post.image}')" role="img" aria-label="${post.title}"></div>
                    <div class="blog-full-content">
                        <div class="blog-meta-top">
                            <span class="blog-category-badge">${post.category || 'Engineering'}</span>
                            <span class="blog-date">${post.date}</span>
                        </div>
                        <h3>${post.title}</h3>
                        <p>${post.preview}</p>
                        <div class="blog-card-footer">
                            <div class="blog-tag-row">
                                ${(post.tags || []).map(tag => `<span class="blog-mini-tag">${tag}</span>`).join('')}
                            </div>
                            <span class="read-time">Read ${post.readTime} &rarr;</span>
                        </div>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
}

function initBlogListEvents() {
    const filterBar = document.getElementById('blog-filter-bar');
    const listEl = document.getElementById('blog-full-list');
    if (!filterBar || !listEl) return;

    const pills = filterBar.querySelectorAll('.blog-filter-pill');
    const cards = listEl.querySelectorAll('.blog-full-item');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            const cat = pill.getAttribute('data-blog-cat');
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (window.playSound) playSound('click');

            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                const match = cat === 'All' || cardCat === cat;
                card.style.display = match ? '' : 'none';
            });
        });
    });
}

window.renderBlog = renderBlog;
window.initBlogListEvents = initBlogListEvents;
