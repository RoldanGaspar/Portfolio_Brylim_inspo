function renderProjectDetail(project) {
    if (!project) return renderProjectsAll();

    const projects = portfolioData.projects || [];
    const currentIndex = projects.findIndex(p => p.id === project.id);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
    
    return `
        <div class="project-detail-page reveal">
            <div class="blog-detail-topbar">
                <a href="#/projects" class="back-link project-back-link magnetic">
                    <i class="ph ph-arrow-left"></i> projects
                </a>
                <button type="button" class="blog-share-btn" id="project-copy-link-btn" aria-label="Copy link to case study">
                    <i class="ph ph-link"></i> <span>Copy link</span>
                </button>
            </div>
            
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

                ${project.architecture ? `
                    <div class="case-section">
                        <div class="case-arch-header">
                            <h3 class="case-heading"><span class="icon"><i class="ph-fill ph-cpu"></i></span> System Architecture</h3>
                            <span class="case-arch-badge">${project.architecture.pattern}</span>
                        </div>
                        <div class="case-arch-grid">
                            ${project.architecture.layers.map(layer => `
                                <div class="case-arch-step">
                                    <span class="case-arch-num">${layer.step}</span>
                                    <h4 class="case-arch-title">${layer.label}</h4>
                                    <p class="case-arch-desc">${layer.detail}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

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

                <nav class="blog-adjacent-grid" aria-label="Other projects">
                    ${prevProject ? `
                        <a href="#/projects/${prevProject.id}" class="blog-adjacent-card prev">
                            <span class="adjacent-label">&larr; PREVIOUS PROJECT</span>
                            <strong>${prevProject.title}</strong>
                        </a>
                    ` : '<div></div>'}
                    ${nextProject ? `
                        <a href="#/projects/${nextProject.id}" class="blog-adjacent-card next">
                            <span class="adjacent-label">NEXT PROJECT &rarr;</span>
                            <strong>${nextProject.title}</strong>
                        </a>
                    ` : '<div></div>'}
                </nav>
            </div>
        </div>
    `;
}

function initProjectDetailEvents() {
    const copyBtn = document.getElementById('project-copy-link-btn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href);
        }
        if (window.playSound) playSound('click');
        copyBtn.classList.add('copied');
        const span = copyBtn.querySelector('span');
        if (span) span.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            if (span) span.textContent = 'Copy link';
        }, 1800);
    });
}

window.renderProjectDetail = renderProjectDetail;
window.initProjectDetailEvents = initProjectDetailEvents;
