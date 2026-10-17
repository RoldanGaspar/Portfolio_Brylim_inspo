function renderHome() {
    return `
        <!-- Hero Section -->
        <section class="hero reveal" id="home">
            <div class="hero-image-container">
                <div class="halftone-effect">
                    <img src="MyPic.webp" alt="Roldan Gaspar" width="600" height="600" loading="eager">
                </div>
            </div>
            <div class="hero-text">
                <h2 class="hero-title">
                    Roldan Gaspar 
                    <i class="ph-fill ph-seal-check verified-badge" id="hero-verified-badge" role="button" tabindex="0" aria-label="Verify Roldan Gaspar" title="Click to verify Roldan Gaspar! ✔️"></i>
                </h2>
                <div class="hero-location">
                    <i class="ph-fill ph-map-pin location-icon"></i>
                    <span>Pampanga, Philippines</span>
                </div>
                <div class="hero-neon-tagline">
                    <span class="solid-neon-badge badge-cyan">
                        <i class="ph-fill ph-lightning lightning-bolt"></i>
                        <span>Software Engineer</span>
                    </span>
                    <span class="solid-neon-badge badge-violet">
                        <i class="ph-fill ph-brain pulse-icon"></i>
                        <span>AI</span>
                    </span>
                    <span class="solid-neon-badge badge-emerald">
                        <i class="ph-fill ph-shield-checkered shield-icon"></i>
                        <span>Cybersecurity Enthusiast</span>
                    </span>
                </div>
                <p class="hero-bio">
                    I'm a full-stack engineer. I build modern web & mobile apps, and these days I'm focused on generative AI.
                </p>
                <p class="hero-bio">
                    Right now I'm building cool new stuff every day. I love turning rough ideas into things people actually use.
                </p>
                <div class="hero-socials">
                    <a href="https://github.com/RoldanGaspar" target="_blank" rel="noopener noreferrer" class="magnetic">github</a> / <a href="https://www.linkedin.com/in/roldangaspar" target="_blank" rel="noopener noreferrer" class="magnetic">linkedin</a> / <a href="mailto:gaspar26roldan@gmail.com" class="magnetic">email</a>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="stats reveal">
            <div class="stat-card">
                <h3>10+ <span class="stat-arrow">↗</span></h3>
                <p>CREDENTIALS</p>
            </div>
            <div class="stat-card">
                <h3>4 <span class="stat-arrow">↗</span></h3>
                <p>OPEN REPOS</p>
            </div>
            <div class="stat-card">
                <h3>0 <span class="stat-arrow">↗</span></h3>
                <p>DEPENDENCIES</p>
            </div>
            <div class="stat-card">
                <h3>100% <span class="stat-arrow">↗</span></h3>
                <p>VERIFIED</p>
            </div>
        </section>

        <hr class="section-divider">

        <!-- Blog Section -->
        <section id="blog-preview" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">01 &mdash; blog</span>
                <a href="#/blog" class="view-all magnetic">ALL POSTS &rarr;</a>
            </div>
            <div class="blog-list">
                ${portfolioData.blog.slice(0,3).map(post => `
                    <a href="#/blog/${post.id}" class="blog-item">
                        <div class="blog-content">
                            <h4>${post.title}</h4>
                            <p>${post.preview.substring(0, 80)}...</p>
                        </div>
                        <span class="blog-date">${post.date}</span>
                    </a>
                `).join('')}
            </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">02 &mdash; projects</span>
                <a href="#/projects" class="view-all magnetic">ALL PROJECTS &rarr;</a>
            </div>
            <div class="projects-stack-container" id="projects-stack-deck">
                ${['awardena-security', 'pos-inventory', 'tarsi-budget-tracker']
                    .map(id => portfolioData.projects.find(p => p.id === id))
                    .filter(p => p && p.homeCard)
                    .map(p => `
                    <div class="project-stack-card ${p.homeCard.posClass}" data-id="${p.id}" data-url="#/projects/${p.id}" role="button" tabindex="0" aria-label="${p.homeCard.ariaLabel}">
                        <div class="stack-card-tags">
                            ${p.homeCard.tags.map(tag => `<span class="stack-tag${tag.dark ? ' dark' : ''}">${tag.text}</span>`).join('')}
                        </div>
                        <div class="stack-card-header">
                            <div class="app-icon-badge ${p.homeCard.badgeClass}"${p.homeCard.badgeStyle ? ` style="${p.homeCard.badgeStyle}"` : ''}>
                                <i class="${p.homeCard.iconClass}"></i>
                            </div>
                            <div class="app-card-title">
                                <h4>${p.homeCard.shortTitle}</h4>
                            </div>
                        </div>
                        <p class="stack-card-desc">${p.homeCard.shortDesc}</p>
                        <div class="stack-store-badges">
                            ${p.homeCard.storeBadges.map(badge => `<div class="store-badge-svg ${badge.cls}"><i class="${badge.icon}"></i> ${badge.label}</div>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="projects-stack-hint">
                <i class="ph-bold ph-hand-swipe-left"></i>
                <span>Swipe or tap cards to cycle &bull; Tap front card to open</span>
            </div>
        </section>

        <!-- Experience Section -->
        <section id="experience" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">03 &mdash; experience</span>
                <a href="#/experience" class="view-all magnetic">FULL HISTORY &rarr;</a>
            </div>
            <div class="experience-list">
                ${portfolioData.experienceList.map(exp => `
                    <a href="#/experience" class="exp-item">
                        <span class="exp-year">${exp.shortYear}</span>
                        <span class="exp-title">${exp.title}</span>
                        <span class="exp-company">${exp.shortCompany || exp.company}</span>
                    </a>
                `).join('')}
            </div>
            
            <div id="stack" class="stack-section">
                <div class="section-header">
                    <span class="section-number">STACK</span>
                    <a href="#/stack" class="view-all magnetic">VIEW ALL &rarr;</a>
                </div>
                <div class="tech-tags">
                    ${portfolioData.featuredStack.map(tech => `<a href="#/stack" class="tech-tag">${tech}</a>`).join('')}
                    <a href="#/stack" class="tech-tag tag tag-more magnetic">+ more</a>
                </div>
            </div>
        </section>

        <!-- Certifications Section -->
        <section id="certifications" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">04 &mdash; certifications</span>
                <a href="#/certifications" class="view-all magnetic">ALL CERTIFICATIONS &rarr;</a>
            </div>
            <div class="cert-grid">
                ${portfolioData.certsList.slice(0, 3).map(cert => `
                    <div class="cert-card tilt-card">
                        <div class="cert-logo-box">
                            <img src="${cert.badgeUrl}" alt="${cert.title}" class="cert-logo" style="object-fit:contain; border-radius:4px;">
                        </div>
                        <h4>${cert.shortTitle || cert.title}</h4>
                        <p>${cert.issuer}</p>
                        <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="cert-verify">{ VERIFY &nearr; }</a>
                    </div>
                `).join('')}
            </div>
            <div class="certs-provider-callout">
                <img src="${portfolioData.netacadCertsList?.[0]?.badgeUrl || ''}" alt="JavaScript Essentials 1 badge" class="certs-provider-callout-badge">
                <div class="certs-provider-callout-copy">
                    <span class="cert-provider-kicker">CISCO NETWORKING ACADEMY</span>
                    <h4>10 Credly badges &amp; 9 certificates</h4>
                    <p>Cisco Networking Academy and AWS Educate credentials.</p>
                </div>
                <a href="#/certifications" class="view-all magnetic">VIEW ALL &rarr;</a>
            </div>
        </section>

        <!-- Recommendations Section -->
        <section id="recommendations" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">05 &mdash; recommendations</span>
                <a href="#/recommendations" class="view-all magnetic">ALL RECOMMENDATIONS &rarr;</a>
            </div>
            <div class="rec-grid">
                ${portfolioData.recsList.map(rec => `
                    <div class="rec-card tilt-card">
                        <div class="quote-icon"><i class="ph-fill ph-quotes"></i></div>
                        <p class="rec-text">${rec.shortText || rec.text}</p>
                        <div class="rec-author">
                            <div class="rec-avatar">${rec.initials}</div>
                            <div class="rec-info">
                                <strong>${rec.author}</strong>
                                <span>${rec.shortRole || rec.role}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- Affiliations Section -->
        <section id="affiliations" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">06 &mdash; affiliations</span>
                <a href="#affiliations" class="view-all magnetic">ALL AFFILIATIONS &rarr;</a>
            </div>
            <div class="aff-grid">
                <div class="aff-item">
                    <div class="aff-logo" style="color: #1a73e8;">AAP</div>
                    <div class="aff-info">
                        <strong>AAP</strong>
                        <span>MEMBER</span>
                    </div>
                </div>
                <div class="aff-item">
                    <div class="aff-logo" style="color: #4CAF50;">PSIA</div>
                    <div class="aff-info">
                        <strong>PSIA</strong>
                        <span>MEMBER</span>
                    </div>
                </div>
                <div class="aff-item">
                    <div class="aff-logo" style="color: var(--text-color);">PH</div>
                    <div class="aff-info">
                        <strong>AppBuildersPH</strong>
                        <span>FOUNDER</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- GitHub Section -->
        <section id="github" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">07 &mdash; github</span>
                <a href="https://github.com/RoldanGaspar" target="_blank" rel="noopener noreferrer" class="view-all magnetic">@ROLDANGASPAR &nearr;</a>
            </div>
            ${generateGithubGraph()}
        </section>
    `;
}
