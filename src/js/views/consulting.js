function renderConsulting() {
    return `
        <div class="page-header reveal">
            <h2>consulting</h2>
            <p class="page-desc">I help founders and teams ship with AI and great software — through hands-on training, technical leadership, and building the thing itself.</p>
        </div>
        <div class="consulting-grid reveal">
            ${portfolioData.consulting.map(service => `
                <div class="consulting-card tilt-card">
                    <div class="card-top">
                        <h3>${service.title}</h3>
                        <span class="price">${service.price}</span>
                    </div>
                    <p class="desc">${service.desc}</p>
                    <ul class="points">
                        ${service.points.map(pt => `<li><i class="ph ph-check"></i> ${pt}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
}
