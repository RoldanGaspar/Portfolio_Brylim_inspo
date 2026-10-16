function renderProjectDetail(project) {
    if (!project) return renderProjectsAll();
    
    return `
        <div class="project-detail-page reveal">
            <a href="#/projects" class="project-back-link magnetic">
                &larr; projects
            </a>
            
            <div class="project-detail-header">
                <div class="project-header-left">
                    <div class="app-icon-large" style="background-color: ${project.iconBg}">
                        ${project.iconText}
                    </div>
                    <div class="project-meta">
                        <div class="badge-group">
                            <span class="project-badge dark">${project.badge}</span>
                            <span class="project-subtitle-badge">${project.subtitle}</span>
                        </div>
                        <h2 class="project-detail-title">${project.title}</h2>
                        <p class="project-tagline-text">${project.tagline}</p>
                    </div>
                </div>
                
                <div class="project-header-actions">
                    <a href="${project.downloadUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary magnetic">
                        ${project.downloadUrl && project.downloadUrl.includes('github.com') 
                            ? `<i class="ph ph-github-logo"></i> View on GitHub &nearr;` 
                            : `<i class="ph ph-arrow-square-out"></i> View Project &nearr;`}
                    </a>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="project-stats-bar">
                ${Object.entries(project.stats || {}).map(([key, val]) => `
                    <div class="p-stat">
                        <span class="stat-label">${key.toUpperCase()}</span>
                        <span class="stat-val">${val}</span>
                    </div>
                `).join('')}
            </div>

            <!-- Visual Mockup Showcase -->
            <div class="project-mockup-frame" style="background-color: ${project.mockupBg}">
                <div class="mockup-header-bar">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                    <span class="mockup-title">${project.title}</span>
                </div>
                <div class="mockup-screen-content">
                    <div class="mockup-card-inside">
                        <div class="app-icon-large small" style="background-color: ${project.iconBg}">
                            ${project.iconText}
                        </div>
                        <h3>${project.title}</h3>
                        <p>${project.desc}</p>
                    </div>
                </div>
            </div>

            <!-- Case Study Body -->
            <div class="project-case-body">
                <div class="case-section">
                    <h3>Overview</h3>
                    <p>${project.desc}</p>
                </div>

                <div class="case-grid-2col">
                    <div class="case-box">
                        <h4><i class="ph-fill ph-warning-circle"></i> The Problem</h4>
                        <p>${project.problem}</p>
                    </div>
                    <div class="case-box">
                        <h4><i class="ph-fill ph-check-circle"></i> The Solution</h4>
                        <p>${project.solution}</p>
                    </div>
                </div>

                <div class="case-section">
                    <h3>Key Features & Highlights</h3>
                    <ul class="project-highlights-list">
                        ${project.highlights.map(h => `<li><i class="ph ph-lightning"></i> ${h}</li>`).join('')}
                    </ul>
                </div>

                <div class="case-section">
                    <h3>Technologies Used</h3>
                    <div class="tech-pill-grid">
                        ${project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}
