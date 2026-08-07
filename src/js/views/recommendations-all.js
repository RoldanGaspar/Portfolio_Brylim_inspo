function renderRecommendationsAll() {
    return `
        <div class="page-header reveal">
            <h2>recommendations</h2>
            <p class="page-desc">Testimonials and recommendations from government leaders, AI scientists, and product managers I've worked with.</p>
        </div>

        <div class="recs-full-grid reveal">
            ${portfolioData.recsList.map(rec => `
                <div class="rec-card tilt-card">
                    <div class="quote-icon"><i class="ph-fill ph-quotes"></i></div>
                    <p class="rec-text">${rec.text}</p>
                    <div class="rec-author">
                        <div class="rec-avatar">${rec.initials}</div>
                        <div class="rec-info">
                            <strong>${rec.author}</strong>
                            <span>${rec.role}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
