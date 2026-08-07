function renderShopDetail(item) {
    if (!item) return renderShop();
    return `
        <div class="shop-detail-page reveal">
            <a href="#/shop" class="shop-back-link"><i class="ph ph-caret-left"></i> shop</a>
            
            <div class="shop-detail-header">
                <div class="shop-detail-preview">
                    <span class="shop-tag-badge">${item.tag}</span>
                    <div class="resume-doc-preview large">
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
                
                <div class="shop-detail-meta">
                    <span class="shop-type">${item.type}</span>
                    <h2 class="shop-detail-title">${item.title}</h2>
                    <div class="shop-detail-price">${item.price}</div>
                    
                    <a href="${item.downloadUrl}" class="btn-download magnetic">
                        Download free <i class="ph ph-download-simple"></i>
                    </a>
                    
                    <div class="shop-delivery-note">
                        <i class="ph ph-check"></i> Instant digital delivery
                    </div>
                </div>
            </div>
            
            <div class="shop-detail-body">
                <p class="shop-intro">${item.desc}</p>
                
                <h3>What's inside</h3>
                <ul class="shop-bullets">
                    ${item.whatsInside.map(pt => `<li>${pt}</li>`).join('')}
                </ul>
                
                <h3>Sections</h3>
                <p class="shop-sections-text">${item.sections}</p>
                
                <p class="shop-footer-note">${item.footerText}</p>
            </div>
        </div>
    `;
}
