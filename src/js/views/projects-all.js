function renderProjectsAll() {
    return `
        <div class="page-header reveal">
            <h2>projects</h2>
            <p class="page-desc">Featured mobile applications, AI products, and developer tools built with high craft and performance.</p>
        </div>
        <div class="projects-gallery-grid reveal">
            ${portfolioData.projects.map(proj => `
                <a href="#/projects/${proj.id}" class="project-gallery-card tilt-card">
                    <div class="gallery-card-top">
                        <div class="app-icon" style="background-color: ${proj.iconBg}">
                            ${proj.iconText}
                        </div>
                        <div class="gallery-badges">
                            <span class="project-badge dark">${proj.badge}</span>
                        </div>
                    </div>
                    <h3>${proj.title}</h3>
                    <p>${proj.tagline}</p>
                    <div class="gallery-tags">
                        ${proj.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </a>
            `).join('')}
        </div>
    `;
}
