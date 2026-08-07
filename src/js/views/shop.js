function renderShop() {
    return `
        <div class="page-header reveal">
            <h2>shop</h2>
            <p class="page-desc">Explore my collection of digital products I've designed and built, ready for instant download.</p>
        </div>
        <div class="shop-grid reveal">
            ${portfolioData.shop.map(item => `
                <a href="#/shop/${item.id}" class="shop-card tilt-card">
                    <div class="shop-card-preview">
                        <span class="shop-tag-badge">${item.tag}</span>
                        <span class="shop-price-badge">${item.price}</span>
                        <div class="resume-doc-preview">
                            <div class="doc-page">
                                <div class="doc-line header-bar"></div>
                                <div class="doc-line thick"></div>
                                <div class="doc-line medium"></div>
                                <div class="doc-line thin"></div>
                                <div class="doc-line thick"></div>
                                <div class="doc-line medium"></div>
                                <div class="doc-line thin"></div>
                            </div>
                        </div>
                        <span class="shop-subtitle-badge">${item.subtitle}</span>
                    </div>
                    <div class="shop-info">
                        <span class="shop-type">${item.type}</span>
                        <h3>${item.title}</h3>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
}
