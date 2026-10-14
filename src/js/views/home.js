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
                    <i class="ph-fill ph-seal-check verified-badge" id="hero-verified-badge" title="Click to verify Roldan Gaspar! ✔️"></i>
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
                <h3>200K+ <span class="stat-arrow">↗</span></h3>
                <p>COMMUNITY</p>
            </div>
            <div class="stat-card">
                <h3>6+ yrs <span class="stat-arrow">↗</span></h3>
                <p>SHIPPING</p>
            </div>
            <div class="stat-card">
                <h3>10x <span class="stat-arrow">↗</span></h3>
                <p>HACKATHONS</p>
            </div>
            <div class="stat-card">
                <h3>PH100 <span class="stat-arrow">↗</span></h3>
                <p>STELLARPH</p>
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
                    <article class="blog-item">
                        <div class="blog-content">
                            <h4>${post.title}</h4>
                            <p>${post.preview.substring(0, 80)}...</p>
                        </div>
                        <span class="blog-date">${post.date}</span>
                    </article>
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
                <!-- Left Background Card: Kabi -->
                <div class="project-stack-card pos-left" data-id="kabi-fitness" data-url="#/projects/kabi-fitness">
                    <div class="stack-card-tags">
                        <span class="stack-tag dark">&lang; #1 PAID FITNESS APP &rang;</span>
                    </div>
                    <div class="stack-card-header">
                        <div class="app-icon-badge kabi-bg">
                            <i class="ph-fill ph-barbell"></i>
                        </div>
                        <div class="app-card-title">
                            <h4>Kabi &mdash; Gym Companion</h4>
                        </div>
                    </div>
                    <p class="stack-card-desc">A gym companion for staying consistent and tracking overload.</p>
                    <div class="stack-store-badges">
                        <div class="store-badge-svg appstore"><i class="ph-fill ph-apple-logo"></i> App Store</div>
                        <div class="store-badge-svg playstore"><i class="ph-fill ph-google-play-logo"></i> Google Play</div>
                    </div>
                </div>
                
                <!-- Right Background Card: Travel Buddy -->
                <div class="project-stack-card pos-right" data-id="travel-buddy" data-url="#/projects/travel-buddy">
                    <div class="stack-card-tags">
                        <span class="stack-tag dark">&lang; AI TRAVEL PLANNER &rang;</span>
                    </div>
                    <div class="stack-card-header">
                        <div class="app-icon-badge travel-bg">
                            <i class="ph-fill ph-airplane-tilt"></i>
                        </div>
                        <div class="app-card-title">
                            <h4>Travel Buddy</h4>
                        </div>
                    </div>
                    <p class="stack-card-desc">Planning trips and exploring with GenAI trip assistant.</p>
                    <div class="stack-store-badges">
                        <div class="store-badge-svg appstore"><i class="ph-fill ph-apple-logo"></i> App Store</div>
                        <div class="store-badge-svg playstore"><i class="ph-fill ph-google-play-logo"></i> Google Play</div>
                    </div>
                </div>

                <!-- Center Active Card: Tarsi -->
                <div class="project-stack-card pos-center" data-id="tarsi-budget-tracker" data-url="#/projects/tarsi-budget-tracker">
                    <div class="stack-card-tags">
                        <span class="stack-tag dark">&lang; #1 FINANCE APP &rang;</span>
                        <span class="stack-tag">APP STORE HIDDEN GEMS</span>
                        <span class="stack-tag">APPS MADE IN THE PHILIPPINES</span>
                    </div>
                    <div class="stack-card-header">
                        <div class="app-icon-badge tarsi-bg">
                            <i class="ph-fill ph-wallet"></i>
                        </div>
                        <div class="app-card-title">
                            <h4>Tarsi &mdash; Budget Tracker</h4>
                        </div>
                    </div>
                    <p class="stack-card-desc">An offline-first budget & expense tracker powered by on-device AI.</p>
                    <div class="stack-store-badges">
                        <div class="store-badge-svg appstore"><i class="ph-fill ph-apple-logo"></i> App Store</div>
                        <div class="store-badge-svg playstore"><i class="ph-fill ph-google-play-logo"></i> Google Play</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Experience Section -->
        <section id="experience" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">03 &mdash; experience</span>
                <a href="#/experience" class="view-all magnetic">FULL HISTORY &rarr;</a>
            </div>
            <div class="experience-list">
                <a href="#/experience" class="exp-item">
                    <span class="exp-year">2025</span>
                    <span class="exp-title">Lead AI Engineer</span>
                    <span class="exp-company">Standard Chartered</span>
                </a>
                <a href="#/experience" class="exp-item">
                    <span class="exp-year">2025</span>
                    <span class="exp-title">AI Ops Engineer</span>
                    <span class="exp-company">CoE for GenAI - Cambridge</span>
                </a>
                <a href="#/experience" class="exp-item">
                    <span class="exp-year">2024</span>
                    <span class="exp-title">Senior Full-Stack Developer</span>
                    <span class="exp-company">Core Technology - Cambridge</span>
                </a>
            </div>
            
            <div id="stack" class="stack-section">
                <div class="section-header">
                    <span class="section-number">STACK</span>
                    <a href="#/stack" class="view-all magnetic">VIEW ALL &rarr;</a>
                </div>
                <div class="tech-tags">
                    <a href="#/stack" class="tech-tag">TypeScript</a>
                    <a href="#/stack" class="tech-tag">React</a>
                    <a href="#/stack" class="tech-tag">Next.js</a>
                    <a href="#/stack" class="tech-tag">Node.js</a>
                    <a href="#/stack" class="tech-tag">Python</a>
                    <a href="#/stack" class="tech-tag">AWS</a>
                    <a href="#/stack" class="tech-tag">PyTorch</a>
                    <a href="#/stack" class="tech-tag">+ more</a>
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
                <div class="cert-card tilt-card">
                    <div class="cert-logo-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" class="cert-logo">
                    </div>
                    <h4>Generative AI Leader</h4>
                    <p>GOOGLE</p>
                    <a href="#/certifications" class="cert-verify">{ VERIFY }</a>
                </div>
                <div class="cert-card tilt-card">
                    <div class="cert-logo-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" class="cert-logo">
                    </div>
                    <h4>Generative AI Certified Professional</h4>
                    <p>ORACLE</p>
                    <a href="#/certifications" class="cert-verify">{ VERIFY }</a>
                </div>
                <div class="cert-card tilt-card">
                    <div class="cert-logo-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Neo4j-logo.svg" alt="Neo4j" class="cert-logo">
                    </div>
                    <h4>Neo4j Certified Professional</h4>
                    <p>NEO4J</p>
                    <a href="#/certifications" class="cert-verify">{ VERIFY }</a>
                </div>
            </div>
            <div class="certs-provider-callout">
                <img src="${portfolioData.netacadCertsList[0].badgeUrl}" alt="JavaScript Essentials 1 badge" class="certs-provider-callout-badge">
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
                <div class="rec-card tilt-card">
                    <div class="quote-icon"><i class="ph-fill ph-quotes"></i></div>
                    <p class="rec-text">Roldan, I believe, would be the next Philippine unicorn. He is technically skilled, deeply driven, and executes AI ideas into real products.</p>
                    <div class="rec-author">
                        <div class="rec-avatar">HA</div>
                        <div class="rec-info">
                            <strong>Henry Aguda</strong>
                            <span>SECRETARY, DICT...</span>
                        </div>
                    </div>
                </div>
                <div class="rec-card tilt-card">
                    <div class="quote-icon"><i class="ph-fill ph-quotes"></i></div>
                    <p class="rec-text">It was a real pleasure to work with Roldan. He's not only a fantastic professional who consistently delivers clean code...</p>
                    <div class="rec-author">
                        <div class="rec-avatar">JS</div>
                        <div class="rec-info">
                            <strong>Joshua Shailes</strong>
                            <span>SENIOR AI DATA SCIENTIST...</span>
                        </div>
                    </div>
                </div>
                <div class="rec-card tilt-card">
                    <div class="quote-icon"><i class="ph-fill ph-quotes"></i></div>
                    <p class="rec-text">Roldan was the most talented software engineer I've mentored in a long time. He's a fast learner, and he always takes full ownership...</p>
                    <div class="rec-author">
                        <div class="rec-avatar">CA</div>
                        <div class="rec-info">
                            <strong>Cris Lawrence Adriano</strong>
                            <span>INTEGRATIONS PRODUCT MGR...</span>
                        </div>
                    </div>
                </div>
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
