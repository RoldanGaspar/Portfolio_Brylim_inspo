function renderBlog() {
    return `
        <div class="page-header reveal">
            <h2>blog</h2>
            <p class="page-desc">Thoughts, tutorials, and notes on AI, engineering, and building things.</p>
        </div>
        <div class="blog-full-list reveal">
            ${portfolioData.blog.map(post => `
                <article class="blog-full-item">
                    <div class="blog-full-image" style="background-image: url('${post.image}')"></div>
                    <div class="blog-full-content">
                        <span class="blog-date">${post.date}</span>
                        <h3>${post.title}</h3>
                        <p>${post.preview}</p>
                        <span class="read-time">Read ${post.readTime}</span>
                    </div>
                </article>
            `).join('')}
        </div>
    `;
}
