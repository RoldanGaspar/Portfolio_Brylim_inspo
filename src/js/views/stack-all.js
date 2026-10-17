function renderStackAll() {
    const stackCategories = portfolioData.stackCategories || [];

    return `
        <div class="stack-page-container reveal">
            <div class="page-header">
                <h2 class="page-title-clean">tech stack</h2>
                <p class="page-desc-clean">The tools, frameworks, and platforms I reach for &mdash; across the front end, back end, infrastructure, and AI.</p>
            </div>

            <div class="stack-category-groups">
                ${stackCategories.map(cat => `
                    <div class="stack-cat-block">
                        <h4 class="stack-cat-title">${cat.title}</h4>
                        <div class="stack-pill-grid">
                            ${cat.items.map(item => `<span class="stack-pill">${item}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
