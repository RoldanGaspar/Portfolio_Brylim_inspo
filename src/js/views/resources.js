function renderResources() {
    let html = `<div class="page-header reveal">
                    <h2>resources</h2>
                    <p class="page-desc">A hand-picked list of the resources I keep coming back to — for learning to build software, getting into AI engineering, and staying current.</p>
                </div>`;
    
    for (const [category, items] of Object.entries(portfolioData.resources)) {
        html += `
            <div class="resource-category reveal">
                <div class="section-header">
                    <span class="section-number">${category}</span>
                </div>
                <div class="resource-grid">
                    ${items.map(item => `
                        <a href="#" class="resource-card">
                            <h4>${item.title}</h4>
                            <p>${item.desc}</p>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    return html;
}
