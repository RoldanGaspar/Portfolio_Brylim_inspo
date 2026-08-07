const routerView = document.getElementById('router-view');

// ==========================================
// SOUND SYSTEM
// ==========================================
let soundEnabled = false;
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function playSound(type) {
    if (!soundEnabled) return;
    if (!audioCtx) audioCtx = new AudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.value = 600;
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.08);
    } else if (type === 'nav') {
        osc.type = 'sine';
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.06);
    } else if (type === 'open') {
        osc.type = 'sine';
        osc.frequency.value = 440;
        gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.15);
    } else if (type === 'close') {
        osc.type = 'sine';
        osc.frequency.value = 660;
        gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(330, audioCtx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.15);
    } else if (type === 'key') {
        osc.type = 'square';
        osc.frequency.value = 800 + Math.random() * 400;
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.04);
    }
}

// ==========================================
// VIEWS
// ==========================================

function renderHome() {
    return `
        <!-- Hero Section -->
        <section class="hero reveal" id="home">
            <div class="hero-image-container">
                <div class="halftone-effect">
                    <img src="MyPic.png" alt="Roldan Gaspar">
                </div>
            </div>
            <div class="hero-text">
                <h2 class="hero-title">
                    Roldan Gaspar 
                    <i class="ph-fill ph-seal-check verified-badge"></i>
                </h2>
                <div class="hero-location">
                    <i class="ph-fill ph-map-pin location-icon"></i>
                    <span>Pampanga, Philippines</span>
                </div>
                <p class="hero-tagline">Software Engineer \ AI \ Cybersecurity Enthusiast</p>
                <p class="hero-bio">
                    I'm a full-stack engineer. I build modern web & mobile apps, and these days I'm focused on generative AI.
                </p>
                <p class="hero-bio">
                    Right now I'm building cool new stuff every day. I love turning rough ideas into things people actually use.
                </p>
                <div class="hero-socials">
                    <a href="#" class="magnetic">github</a> / <a href="#" class="magnetic">linkedin</a> / <a href="#" class="magnetic">instagram</a> / <a href="#" class="magnetic">email</a>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="stats reveal">
            <div class="stat-card">
                <h3>200K+ ↗</h3>
                <p>COMMUNITY</p>
            </div>
            <div class="stat-card">
                <h3>6+ yrs ↗</h3>
                <p>SHIPPING</p>
            </div>
            <div class="stat-card">
                <h3>10x ↗</h3>
                <p>HACKATHONS</p>
            </div>
            <div class="stat-card">
                <h3>PH100 ↗</h3>
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
                <a href="#" class="view-all magnetic">ALL PROJECTS &rarr;</a>
            </div>
            <div class="projects-stack">
                <div class="project-card background-card left">
                    <div class="badge">#1 PAID FITNESS APP</div>
                    <div class="card-header">
                        <img src="https://ui-avatars.com/api/?name=K&background=000&color=fff" alt="Kabi" class="app-icon">
                        <h4>Kabi - Gym</h4>
                    </div>
                    <p>A gym companion for staying consistent.</p>
                </div>
                
                <div class="project-card background-card right">
                    <div class="card-header">
                        <h4>Travel Buddy</h4>
                    </div>
                    <p>Planning trips and exploring...</p>
                </div>

                <div class="project-card active-card center tilt-card">
                    <div class="tags">
                        <span class="tag dark">#1 FINANCE APP &rang;</span>
                        <span class="tag">APP STORE HIDDEN GEMS</span>
                    </div>
                    <div class="card-header">
                        <img src="https://ui-avatars.com/api/?name=T&background=4CAF50&color=fff" alt="Tarsi" class="app-icon">
                        <h4>Tarsi &mdash; Budget Tracker</h4>
                    </div>
                    <p>An offline-first budget & expense tracker powered by on-device AI.</p>
                    <div class="store-badges">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" height="30">
                    </div>
                </div>
            </div>
        </section>

        <!-- Experience Section -->
        <section id="experience" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">03 &mdash; experience</span>
                <a href="#" class="view-all magnetic">FULL HISTORY &rarr;</a>
            </div>
            <div class="experience-list">
                <div class="exp-item">
                    <span class="exp-year">2025</span>
                    <span class="exp-title">Lead AI Engineer</span>
                    <span class="exp-company">Standard Chartered</span>
                </div>
                <div class="exp-item">
                    <span class="exp-year">2025</span>
                    <span class="exp-title">AI Ops Engineer</span>
                    <span class="exp-company">CoE for GenAI - Cambridge</span>
                </div>
                <div class="exp-item">
                    <span class="exp-year">2024</span>
                    <span class="exp-title">Senior Full-Stack Developer</span>
                    <span class="exp-company">Core Technology - Cambridge</span>
                </div>
            </div>
            
            <div id="stack" class="stack-section">
                <div class="section-header">
                    <span class="section-number">STACK</span>
                    <a href="#" class="view-all magnetic">VIEW ALL &rarr;</a>
                </div>
                <div class="tech-tags">
                    <span class="tech-tag">TypeScript</span>
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">Next.js</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">Python</span>
                    <span class="tech-tag">AWS</span>
                    <span class="tech-tag">PyTorch</span>
                    <span class="tech-tag">+ more</span>
                </div>
            </div>
        </section>

        <!-- Certifications Section -->
        <section id="certifications" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">04 &mdash; certifications</span>
                <a href="#" class="view-all magnetic">ALL CERTIFICATIONS &rarr;</a>
            </div>
            <div class="cert-grid">
                <div class="cert-card tilt-card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" class="cert-logo">
                    <h4>Generative AI Leader</h4>
                    <p>GOOGLE</p>
                    <a href="#" class="cert-verify">&lang; VERIFY &rang;</a>
                </div>
                <div class="cert-card tilt-card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" class="cert-logo">
                    <h4>Generative AI Certified Professional</h4>
                    <p>ORACLE</p>
                    <a href="#" class="cert-verify">&lang; VERIFY &rang;</a>
                </div>
                <div class="cert-card tilt-card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Neo4j-logo.svg" alt="Neo4j" class="cert-logo">
                    <h4>Neo4j Certified Professional</h4>
                    <p>NEO4J</p>
                    <a href="#" class="cert-verify">&lang; VERIFY &rang;</a>
                </div>
            </div>
        </section>

        <!-- Recommendations Section -->
        <section id="recommendations" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">05 &mdash; recommendations</span>
                <a href="#" class="view-all magnetic">ALL RECOMMENDATIONS &rarr;</a>
            </div>
            <div class="rec-grid">
                <div class="rec-card tilt-card">
                    <div class="quote-icon">"</div>
                    <p class="rec-text">Bryl, I believe, would be the next Philippine unicorn. He is technically skilled.</p>
                    <div class="rec-author">
                        <div class="rec-avatar">HA</div>
                        <div class="rec-info">
                            <strong>Henry Aguda</strong>
                            <span>SECRETARY, DEPARTMENT...</span>
                        </div>
                    </div>
                </div>
                <div class="rec-card tilt-card">
                    <div class="quote-icon">"</div>
                    <p class="rec-text">It was a real pleasure to work with Bryl. He's not only a fantastic professional who consistently delivers...</p>
                    <div class="rec-author">
                        <div class="rec-avatar">JS</div>
                        <div class="rec-info">
                            <strong>Joshua Shailes</strong>
                            <span>SENIOR AI DATA SCIENTIST...</span>
                        </div>
                    </div>
                </div>
                <div class="rec-card tilt-card">
                    <div class="quote-icon">"</div>
                    <p class="rec-text">Bryl was the most talented software engineer I've mentored in a long time. He's a fast learner, and he always...</p>
                    <div class="rec-author">
                        <div class="rec-avatar">CA</div>
                        <div class="rec-info">
                            <strong>Cris Lawrence Adri...</strong>
                            <span>INTEGRATIONS PRODUCT...</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Affiliations Section -->
        <section id="affiliations" class="content-section reveal">
            <div class="section-header">
                <span class="section-number">06 &mdash; affiliations</span>
                <a href="#" class="view-all magnetic">ALL AFFILIATIONS &rarr;</a>
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
                <a href="#" class="view-all magnetic">@BRYLLIM &nearr;</a>
            </div>
            <div class="github-graph-container">
                <div class="github-grid">
                    ${generateGithubGraph()}
                </div>
                <p class="github-footer">2,106 CONTRIBUTIONS IN THE LAST YEAR</p>
            </div>
        </section>
    `;
}

function generateGithubGraph() {
    let dots = '';
    const cols = 52;
    const rows = 7;
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            let level = 0;
            if (Math.random() > 0.4) {
                level = Math.floor(Math.random() * 5);
                if (c > 30 && Math.random() > 0.3) level = Math.max(1, Math.floor(Math.random() * 5));
            }
            dots += `<div class="github-dot" data-level="${level}"></div>`;
        }
    }
    return dots;
}

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

function renderBlog() {
    return `
        <div class="page-header reveal">
            <h2>blog</h2>
            <p class="page-desc">Thoughts, tutorials, and notes on AI, engineering, and building things.</p>
        </div>
        <div class="blog-full-list reveal">
            ${portfolioData.blog.map(post => `
                <article class="blog-full-item">
                    <div class="blog-full-image" style="background-image: url('${post.image}')"></div>
                    <div class="blog-full-content">
                        <span class="blog-date">${post.date}</span>
                        <h3>${post.title}</h3>
                        <p>${post.preview}</p>
                        <span class="read-time">Read ${post.readTime}</span>
                    </div>
                </article>
            `).join('')}
        </div>
    `;
}

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

function renderResources() {
    let html = `<div class="page-header reveal">
                    <h2>resources</h2>
                    <p class="page-desc">A hand-picked list of the resources I keep coming back to — for learning to build software, getting into AI engineering, and staying current.</p>
                </div>`;
    
    for (const [category, items] of Object.entries(portfolioData.resources)) {
        html += `
            <div class="resource-category reveal">
                <div class="section-header">
                    <span class="section-number">${category}</span>
                </div>
                <div class="resource-grid">
                    ${items.map(item => `
                        <a href="#" class="resource-card">
                            <h4>${item.title}</h4>
                            <p>${item.desc}</p>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    return html;
}

function renderCollabs() {
    return `
        <div class="page-header reveal">
            <h2>collabs</h2>
            <p class="page-desc">As a content & digital creator, I partner with brands and organizations on launches, education, and creative campaigns. A few I've worked with:</p>
        </div>
        <div class="collabs-content reveal">
            <div class="brand-logos">
                <i class="ph ph-meta-logo"></i>
                <i class="ph ph-google-logo"></i>
                <i class="ph ph-amazon-logo"></i>
                <span>...and more</span>
            </div>
            
            <div class="world-map">
                <div class="map-placeholder"></div>
                <p class="map-caption">WORKING WITH BRANDS & TEAMS WORLDWIDE</p>
            </div>
            
            <div class="contact-card tilt-card">
                <div class="contact-info">
                    <h3>let's work together</h3>
                    <p>Open to brand collaborations, sponsored content, creative projects, and university talks & speaking. Reach me directly and let's make something.</p>
                </div>
                <a href="mailto:bryllim@gmail.com" class="btn-primary magnetic"><i class="ph ph-envelope-simple"></i> Get in touch</a>
            </div>
        </div>
    `;
}

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


// ==========================================
// ROUTER LOGIC
// ==========================================

const routes = {
    '': renderHome,
    '#/': renderHome,
    '#/shop': renderShop,
    '#/blog': renderBlog,
    '#/gear': renderGear,
    '#/resources': renderResources,
    '#/collabs': renderCollabs,
    '#/consulting': renderConsulting
};

let currentView = null;

function router() {
    let hash = window.location.hash || '#/';
    let viewHash = hash;
    let anchor = null;
    let viewFunc = null;

    if (hash.startsWith('#/shop/')) {
        const slug = hash.replace('#/shop/', '');
        const item = portfolioData.shop.find(s => s.id === slug);
        viewFunc = () => renderShopDetail(item);
        viewHash = '#/shop';
    } else {
        if (!hash.startsWith('#/')) {
            viewHash = '#/';
            anchor = hash;
        }
        viewFunc = routes[viewHash] || renderHome;
    }
    
    if (currentView !== viewHash) {
        // Page transition animation
        routerView.classList.add('page-exit');
        
        setTimeout(() => {
            routerView.innerHTML = viewFunc();
            currentView = viewHash;
            routerView.classList.remove('page-exit');
            routerView.classList.add('page-enter');
            
            setTimeout(() => routerView.classList.remove('page-enter'), 500);
            
            window.scrollTo(0, 0);
            initScrollReveal();
            initTiltCards();
            initMagnetic();
            playSound('nav');
        }, currentView === null ? 0 : 200); // Skip exit anim on first load
    }
    
    // Update active nav link
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === hash || (viewHash === '#/' && href === anchor)) {
            link.classList.add('active');
        }
    });

    if (anchor && anchor !== '#') {
        setTimeout(() => {
            const targetElement = document.querySelector(anchor);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        }, 250);
    }
}

// ==========================================
// SCROLL REVEAL (IntersectionObserver)
// ==========================================
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealEls.forEach(el => observer.observe(el));
}

// ==========================================
// 3D TILT EFFECT
// ==========================================
function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ==========================================
// MAGNETIC EFFECT
// ==========================================
function initMagnetic() {
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// ==========================================
// INIT
// ==========================================
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    router();
    initTheme();
    initModals();
    initSoundToggle();
    
    // Add sound to sidebar nav clicks
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', () => playSound('click'));
    });
});

// ==========================================
// THEME LOGIC
// ==========================================
function initTheme() {
    const themeBtns = document.querySelectorAll('.theme-btn[data-set-theme]');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    
    function setTheme(theme) {
        let resolved;
        if (theme === 'system') {
            resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            localStorage.removeItem('theme');
        } else {
            resolved = theme;
            localStorage.setItem('theme', theme);
        }
        htmlElement.setAttribute('data-theme', resolved);
        
        document.querySelectorAll('.theme-btn[data-set-theme]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-set-theme') === theme);
        });
        playSound('click');
    }

    setTheme(savedTheme || 'system');

    themeBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => setTheme(newBtn.getAttribute('data-set-theme')));
    });

    // ScrollSpy for Home page
    window.addEventListener('scroll', () => {
        if (currentView !== '#/') return;
        
        let current = '';
        const sections = document.querySelectorAll('section[id], div[id="stack"]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = '#' + section.getAttribute('id');
            }
        });

        if (current) {
            document.querySelectorAll('.sidebar-nav a[href^="#"]:not([href^="#/"])').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==========================================
// SOUND TOGGLE
// ==========================================
function initSoundToggle() {
    const soundBtn = document.querySelector('.sound-btn');
    if (!soundBtn) return;
    
    soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        const icon = soundBtn.querySelector('i');
        if (soundEnabled) {
            icon.className = 'ph ph-speaker-high';
            playSound('open');
        } else {
            icon.className = 'ph ph-speaker-slash';
        }
    });
}

// ==========================================
// MODALS LOGIC
// ==========================================
function initModals() {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content-area"></div>
    `;
    document.body.appendChild(modalContainer);

    const overlay = modalContainer.querySelector('.modal-overlay');
    const contentArea = modalContainer.querySelector('.modal-content-area');

    function openModal(contentHtml) {
        contentArea.innerHTML = contentHtml;
        modalContainer.classList.add('active');
        playSound('open');
    }

    function closeModal() {
        modalContainer.classList.remove('active');
        playSound('close');
        setTimeout(() => { contentArea.innerHTML = ''; }, 300);
    }

    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openTerminalModal();
        }
        if (e.altKey && e.key.toLowerCase() === 'j') {
            e.preventDefault();
            openTypingModal();
        }
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ==========================================
    // FUNCTIONAL TERMINAL (Alt+K)
    // ==========================================
    function openTerminalModal() {
        openModal(`
            <div class="terminal-modal fade-in">
                <h2>what do you want to ask?</h2>
                <div class="terminal-input-area">
                    <input type="text" id="terminal-input" class="terminal-input" placeholder="type a command..." autofocus>
                </div>
                <div class="terminal-output" id="terminal-output"></div>
                <div class="terminal-hints">
                    <span>Try: <code>help</code>, <code>about</code>, <code>contact</code>, <code>stack</code>, <code>sudo</code></span>
                </div>
            </div>
        `);
        
        const input = document.getElementById('terminal-input');
        const output = document.getElementById('terminal-output');
        
        if (input) {
            setTimeout(() => input.focus(), 100);
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const cmd = input.value.trim().toLowerCase();
                    input.value = '';
                    processTerminalCommand(cmd, output);
                    playSound('key');
                }
            });
        }
    }
    
    function processTerminalCommand(cmd, output) {
        const commands = {
            help: `<span class="t-green">Available commands:</span><br>
                   <code>about</code> — Who am I<br>
                   <code>contact</code> — How to reach me<br>
                   <code>stack</code> — My tech stack<br>
                   <code>projects</code> — Featured projects<br>
                   <code>experience</code> — Work history<br>
                   <code>sudo</code> — 🤫<br>
                   <code>clear</code> — Clear output`,
            about: `<span class="t-green">Roldan Gaspar</span> — Full-stack engineer focused on generative AI.<br>Building modern web & mobile apps, turning rough ideas into things people actually use.`,
            contact: `<span class="t-green">📧</span> bryllim@gmail.com<br>
                      <span class="t-green">🐙</span> github.com/bryllim<br>
                      <span class="t-green">💼</span> linkedin.com/in/bryllim`,
            stack: `<span class="t-green">Languages:</span> TypeScript, Python, Swift<br>
                    <span class="t-green">Frontend:</span> React, Next.js, SwiftUI<br>
                    <span class="t-green">Backend:</span> Node.js, Laravel, FastAPI<br>
                    <span class="t-green">AI/ML:</span> PyTorch, LangChain, Claude<br>
                    <span class="t-green">Infra:</span> AWS, Docker, Kubernetes`,
            projects: `<span class="t-green">Tarsi</span> — #1 Finance App on App Store 🏆<br>
                       <span class="t-green">Kabi</span> — #1 Paid Fitness App<br>
                       <span class="t-green">Travel Buddy</span> — Trip planning companion`,
            experience: `<span class="t-green">2025</span> Lead AI Engineer @ Standard Chartered<br>
                         <span class="t-green">2025</span> AI Ops Engineer @ CoE for GenAI<br>
                         <span class="t-green">2024</span> Sr. Full-Stack Dev @ Core Technology`,
            sudo: `<span class="t-red">Permission denied:</span> Nice try. You're not the admin here. 😎`,
            clear: 'CLEAR'
        };
        
        // Animate "thinking" then show result
        const thinkingEl = document.createElement('div');
        thinkingEl.className = 'terminal-line';
        thinkingEl.innerHTML = `<span class="t-muted">> ${cmd}</span><br><span class="t-thinking">thinking...</span>`;
        output.appendChild(thinkingEl);
        output.scrollTop = output.scrollHeight;
        
        setTimeout(() => {
            if (cmd === 'clear') {
                output.innerHTML = '';
                return;
            }
            
            const response = commands[cmd] || `<span class="t-red">Unknown command:</span> "${cmd}". Type <code>help</code> for available commands.`;
            thinkingEl.innerHTML = `<span class="t-muted">> ${cmd}</span><br>${response}`;
            output.scrollTop = output.scrollHeight;
        }, 600);
    }

    // ==========================================
    // FUNCTIONAL TYPING TEST (Alt+J)
    // ==========================================
    function openTypingModal() {
        const words = ['become', 'school', 'call', 'consider', 'feel', 'both', 'well', 'program', 'just', 'much', 'own', 'system', 'state', 'should', 'between', 'each', 'life', 'people', 'under', 'work', 'build', 'think', 'great', 'code', 'design', 'create', 'learn', 'focus', 'ship', 'craft'];
        const shuffled = words.sort(() => Math.random() - 0.5).slice(0, 20);
        const wordSpans = shuffled.map((w, i) => `<span class="typing-word" data-idx="${i}">${w}</span>`).join(' ');
        
        openModal(`
            <div class="typing-modal fade-in">
                <div class="typing-stats">
                    <div><span id="wpm-val">0</span> WPM</div>
                    <div><span id="acc-val">100</span>% ACC</div>
                    <div><span id="time-val">0</span>s TIME</div>
                </div>
                <div class="typing-text" id="typing-display">${wordSpans}</div>
                <input type="text" id="typing-input" class="typing-hidden-input" autofocus>
                <p class="typing-hint">Start typing to begin the test...</p>
            </div>
        `);
        
        const input = document.getElementById('typing-input');
        const display = document.getElementById('typing-display');
        const wpmEl = document.getElementById('wpm-val');
        const accEl = document.getElementById('acc-val');
        const timeEl = document.getElementById('time-val');
        
        if (!input) return;
        setTimeout(() => input.focus(), 100);
        
        // Click on modal refocuses input
        const typingModal = contentArea.querySelector('.typing-modal');
        if (typingModal) {
            typingModal.addEventListener('click', () => input.focus());
        }
        
        let wordIndex = 0;
        let startTime = null;
        let correctWords = 0;
        let totalAttempted = 0;
        let timerInterval = null;
        
        // Highlight first word
        const wordEls = display.querySelectorAll('.typing-word');
        if (wordEls[0]) wordEls[0].classList.add('current');
        
        input.addEventListener('input', () => {
            if (!startTime) {
                startTime = Date.now();
                timerInterval = setInterval(() => {
                    const elapsed = Math.floor((Date.now() - startTime) / 1000);
                    timeEl.textContent = elapsed;
                }, 100);
            }
            playSound('key');
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                const typed = input.value.trim();
                input.value = '';
                
                if (wordIndex >= shuffled.length) return;
                
                totalAttempted++;
                const currentWordEl = wordEls[wordIndex];
                
                if (typed === shuffled[wordIndex]) {
                    correctWords++;
                    currentWordEl.classList.add('correct');
                } else {
                    currentWordEl.classList.add('incorrect');
                }
                currentWordEl.classList.remove('current');
                
                wordIndex++;
                
                // Update stats
                const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
                const wpm = Math.round(correctWords / Math.max(elapsed, 0.01));
                const acc = totalAttempted > 0 ? Math.round((correctWords / totalAttempted) * 100) : 100;
                wpmEl.textContent = wpm;
                accEl.textContent = acc;
                
                if (wordIndex < shuffled.length) {
                    wordEls[wordIndex].classList.add('current');
                } else {
                    // Test complete
                    clearInterval(timerInterval);
                    input.disabled = true;
                    const hint = contentArea.querySelector('.typing-hint');
                    if (hint) hint.textContent = `Done! ${wpm} WPM at ${acc}% accuracy. Press Escape to close.`;
                }
            }
        });
    }
}
