let blogScrollListener = null;

function renderBlogDetail(post) {
    if (!post) return renderBlog();

    const posts = portfolioData.blog || [];
    const currentIndex = posts.findIndex(p => p.id === post.id);
    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
    const sections = post.sections || [];

    function escapeCodeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    return `
        <div class="blog-detail-page reveal">
            <!-- Sticky Reading Progress Bar -->
            <div class="blog-progress-track" aria-hidden="true">
                <div class="blog-progress-fill" id="blog-reading-progress"></div>
            </div>

            <div class="blog-detail-topbar">
                <a href="#/blog" class="project-back-link magnetic">
                    &larr; all posts
                </a>
                <button class="blog-share-btn" id="blog-copy-link-btn" type="button" aria-label="Copy article link">
                    <i class="ph ph-link"></i> <span>Copy link</span>
                </button>
            </div>

            <header class="blog-article-header">
                <div class="blog-article-meta">
                    <span class="blog-category-badge">${post.category || 'Engineering'}</span>
                    <span class="blog-meta-dot">&bull;</span>
                    <span class="blog-date">${post.date}</span>
                    <span class="blog-meta-dot">&bull;</span>
                    <span class="read-time"><i class="ph ph-clock"></i> ${post.readTime} read</span>
                </div>
                <h2 class="blog-article-title">${post.title}</h2>
                <p class="blog-article-lead">${post.preview}</p>
                <div class="blog-tag-row">
                    ${(post.tags || []).map(tag => `<span class="blog-mini-tag">${tag}</span>`).join('')}
                </div>
            </header>

            <div class="blog-article-cover" style="background-image: url('${post.image}')" role="img" aria-label="${post.title}"></div>

            <div class="blog-detail-layout">
                <!-- Main Prose Column -->
                <article class="blog-article-prose" id="blog-article-prose">
                    ${sections.map((sec, idx) => `
                        <section class="blog-article-section" id="blog-sec-${sec.id}" data-sec-id="${sec.id}">
                            <h3 class="blog-sec-heading">
                                <span class="blog-sec-num">0${idx + 1}</span>
                                ${sec.heading}
                            </h3>
                            ${(sec.paragraphs || []).map(p => `<p>${p}</p>`).join('')}
                            ${sec.callout ? `
                                <blockquote class="blog-callout-box">
                                    <i class="ph-fill ph-lightbulb-filament"></i>
                                    <p>${sec.callout}</p>
                                </blockquote>
                            ` : ''}
                            ${sec.code ? `
                                <div class="blog-code-block">
                                    <div class="blog-code-header">
                                        <span class="blog-code-lang">${sec.code.lang}</span>
                                        <button class="blog-code-copy-btn" type="button" aria-label="Copy code snippet">
                                            <i class="ph ph-copy"></i> <span>Copy</span>
                                        </button>
                                    </div>
                                    <pre><code>${escapeCodeHtml(sec.code.snippet)}</code></pre>
                                </div>
                            ` : ''}
                        </section>
                    `).join('')}
                </article>

                <!-- Sticky Table of Contents & Author Sidebar -->
                <aside class="blog-article-sidebar">
                    <div class="blog-toc-card">
                        <span class="blog-toc-title"><i class="ph ph-list-bullets"></i> ON THIS PAGE</span>
                        <nav class="blog-toc-nav" id="blog-toc-nav" aria-label="Table of contents">
                            ${sections.map((sec, idx) => `
                                <button class="blog-toc-link ${idx === 0 ? 'active' : ''}" data-scroll-target="blog-sec-${sec.id}" type="button">
                                    <span class="toc-num">0${idx + 1}</span>
                                    <span class="toc-text">${sec.heading}</span>
                                </button>
                            `).join('')}
                        </nav>
                    </div>

                    <div class="blog-author-card">
                        <div class="blog-author-top">
                            <img src="MyPic.webp" alt="Roldan Gaspar" class="blog-author-avatar" loading="lazy" decoding="async" width="44" height="44">
                            <div>
                                <strong>Roldan Gaspar</strong>
                                <span>Software Engineer &bull; AI &bull; Cyber</span>
                            </div>
                        </div>
                        <p>Writing practical notes on AI harnesses, defensive cybersecurity, and clean frontend architecture.</p>
                    </div>
                </aside>
            </div>

            <!-- Previous / Next Article Footer Navigation -->
            <nav class="blog-adjacent-grid" aria-label="Other blog posts">
                ${prevPost ? `
                    <a href="#/blog/${prevPost.id}" class="blog-adjacent-card prev">
                        <span class="adjacent-label">&larr; PREVIOUS ARTICLE</span>
                        <strong>${prevPost.title}</strong>
                    </a>
                ` : '<div></div>'}
                ${nextPost ? `
                    <a href="#/blog/${nextPost.id}" class="blog-adjacent-card next">
                        <span class="adjacent-label">NEXT ARTICLE &rarr;</span>
                        <strong>${nextPost.title}</strong>
                    </a>
                ` : '<div></div>'}
            </nav>
        </div>
    `;
}

function initBlogDetailEvents() {
    const proseEl = document.getElementById('blog-article-prose');
    if (!proseEl) return;

    if (blogScrollListener) {
        window.removeEventListener('scroll', blogScrollListener);
        blogScrollListener = null;
    }

    const progressEl = document.getElementById('blog-reading-progress');
    const secElements = Array.from(document.querySelectorAll('.blog-article-section'));
    const tocLinks = Array.from(document.querySelectorAll('.blog-toc-link'));

    // Smooth scroll TOC clicks
    tocLinks.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-scroll-target');
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;
            if (window.playSound) playSound('click');
            const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: topOffset, behavior: 'smooth' });
        });
    });

    // 1-Click Copy Code Buttons
    document.querySelectorAll('.blog-code-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const block = btn.closest('.blog-code-block');
            const codeEl = block ? block.querySelector('code') : null;
            if (!codeEl) return;

            const rawCode = codeEl.textContent || '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(rawCode);
            }
            if (window.playSound) playSound('click');

            const span = btn.querySelector('span');
            if (span) span.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                if (span) span.textContent = 'Copy';
                btn.classList.remove('copied');
            }, 1800);
        });
    });

    // Copy Article Permalink Button
    const copyLinkBtn = document.getElementById('blog-copy-link-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(window.location.href);
            }
            if (window.playSound) playSound('click');
            const span = copyLinkBtn.querySelector('span');
            if (span) span.textContent = 'Link copied!';
            setTimeout(() => {
                if (span) span.textContent = 'Copy link';
            }, 1800);
        });
    }

    // Reading Progress & Active TOC Spy
    blogScrollListener = () => {
        if (!document.body.contains(proseEl)) {
            window.removeEventListener('scroll', blogScrollListener);
            blogScrollListener = null;
            return;
        }

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 100;
        if (progressEl) {
            progressEl.style.width = pct + '%';
        }

        let activeTargetId = secElements[0] ? secElements[0].id : '';
        secElements.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= 160) {
                activeTargetId = sec.id;
            }
        });

        tocLinks.forEach(link => {
            const isMatch = link.getAttribute('data-scroll-target') === activeTargetId;
            link.classList.toggle('active', isMatch);
        });
    };

    window.addEventListener('scroll', blogScrollListener, { passive: true });
    blogScrollListener();
}

window.renderBlogDetail = renderBlogDetail;
window.initBlogDetailEvents = initBlogDetailEvents;
