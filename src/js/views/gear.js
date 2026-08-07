function renderGear() {
    let html = `<div class="page-header reveal">
                    <h2>gear</h2>
                    <p class="page-desc">The hardware and tools I use to build, create, and stay productive — my desk setup, everyday carry, and the kit I shoot content with.</p>
                </div>`;
    
    for (const [category, items] of Object.entries(portfolioData.gear)) {
        html += `
            <div class="gear-category reveal">
                <div class="section-header">
                    <span class="section-number">${category}</span>
                </div>
                <div class="gear-grid">
                    ${items.map(item => `
                        <div class="gear-card tilt-card">
                            <div class="gear-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <h4>${item.name}</h4>
                            <p>${item.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    return html;
}
