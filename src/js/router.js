const routes = {
    '': renderHome,
    '#/': renderHome,
    '#/projects': renderProjectsAll,
    '#/experience': renderExperienceAll,
    '#/stack': renderStackAll,
    '#/certifications': renderCertificationsAll,
    '#/recommendations': renderRecommendationsAll,
    '#/shop': renderShop,
    '#/blog': renderBlog,
    '#/gear': renderGear,
    '#/resources': renderResources,
    '#/collabs': renderCollabs,
    '#/consulting': renderConsulting,
    '#/audio': renderAudioLounge,
    '#/cyber-lab': renderCyberLab
};

const routeMeta = {
    '': {
        title: 'Roldan Gaspar — Software Engineer · AI · Cybersecurity',
        desc: 'Roldan Gaspar — Software Engineer, AI, and Cybersecurity enthusiast based in Pampanga, Philippines. Explore projects, certifications, and soundscapes.'
    },
    '#/': {
        title: 'Roldan Gaspar — Software Engineer · AI · Cybersecurity',
        desc: 'Roldan Gaspar — Software Engineer, AI, and Cybersecurity enthusiast based in Pampanga, Philippines. Explore projects, certifications, and soundscapes.'
    },
    '#/projects': {
        title: 'Projects — Roldan Gaspar',
        desc: 'Explore software engineering, AI, and cybersecurity projects built by Roldan Gaspar.'
    },
    '#/experience': {
        title: 'Experience — Roldan Gaspar',
        desc: 'Software engineering, AI systems, and cybersecurity experience and credential tracks of Roldan Gaspar.'
    },
    '#/stack': {
        title: 'Tech Stack — Roldan Gaspar',
        desc: 'Languages, frameworks, AI workflows, and cybersecurity tools used by Roldan Gaspar.'
    },
    '#/certifications': {
        title: 'Certifications — Roldan Gaspar',
        desc: 'Verified Cisco Networking Academy and AWS Educate certifications and badges earned by Roldan Gaspar.'
    },
    '#/recommendations': {
        title: 'Recommendations & Highlights — Roldan Gaspar',
        desc: 'Verified institutional credentials, academy completions, and technical program milestones of Roldan Gaspar.'
    },
    '#/shop': {
        title: 'Shop — Roldan Gaspar',
        desc: 'Free developer templates and resources by Roldan Gaspar.'
    },
    '#/blog': {
        title: 'Blog — Roldan Gaspar',
        desc: 'Technical articles on AI harnesses, MCP automation, product engineering, and cybersecurity by Roldan Gaspar.'
    },
    '#/gear': {
        title: 'Gear & Setup — Roldan Gaspar',
        desc: 'Workstation hardware and AI/CyberOps development environment used by Roldan Gaspar.'
    },
    '#/resources': {
        title: 'Resources — Roldan Gaspar',
        desc: 'Curated learning resources for AI, machine learning, and LLM engineering.'
    },
    '#/collabs': {
        title: 'Collaborations — Roldan Gaspar',
        desc: 'Open-source collaborations and community engineering initiatives with Roldan Gaspar.'
    },
    '#/consulting': {
        title: 'Consulting — Roldan Gaspar',
        desc: 'Software development, AI engineering, and technical consulting services by Roldan Gaspar.'
    },
    '#/audio': {
        title: 'Audio Lounge — Roldan Gaspar',
        desc: 'Interactive Web Audio synthesizer, ambient soundscapes, and Pomodoro focus timer.'
    },
    '#/cyber-lab': {
        title: 'Cyber Lab — Roldan Gaspar',
        desc: 'Interactive SOC telemetry, packet inspection, and threat mitigation sandbox grounded in Cisco NetAcad coursework.'
    }
};

function updateRouteMeta(pageTitle, pageDesc) {
    const title = pageTitle || routeMeta['#/'].title;
    const desc = pageDesc || routeMeta['#/'].desc;
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);

    const announcer = document.getElementById('route-announcer');
    if (announcer) announcer.textContent = `Navigated to ${title}`;
}

let currentView = null;

function getCurrentView() {
    return currentView;
}

function router() {
    const routerView = document.getElementById('router-view');
    if (!routerView) return;

    let hash = window.location.hash || '#/';
    let viewHash = hash;
    let anchor = null;
    let viewFunc = null;
    let metaTitle = routeMeta['#/'].title;
    let metaDesc = routeMeta['#/'].desc;

    if (hash.startsWith('#/shop/')) {
        const slug = hash.replace('#/shop/', '');
        const item = portfolioData.shop.find(s => s.id === slug);
        viewFunc = () => renderShopDetail(item);
        viewHash = '#/shop';
        if (item) {
            metaTitle = `${item.title} — Roldan Gaspar`;
            metaDesc = item.desc || item.subtitle || routeMeta['#/shop'].desc;
        }
    } else if (hash.startsWith('#/projects/')) {
        const slug = hash.replace('#/projects/', '');
        const project = portfolioData.projects.find(p => p.id === slug);
        viewFunc = () => renderProjectDetail(project);
        viewHash = '#/projects';
        if (project) {
            metaTitle = `${project.title} — Roldan Gaspar`;
            metaDesc = project.tagline || project.desc || routeMeta['#/projects'].desc;
        }
    } else if (hash.startsWith('#/blog/')) {
        const slug = hash.replace('#/blog/', '');
        const post = portfolioData.blog.find(b => b.id === slug);
        viewFunc = () => renderBlogDetail(post);
        viewHash = '#/blog';
        if (post) {
            metaTitle = `${post.title} — Roldan Gaspar`;
            metaDesc = post.preview || routeMeta['#/blog'].desc;
        }
    } else {
        if (!hash.startsWith('#/')) {
            viewHash = '#/';
            anchor = hash;
        }
        viewFunc = routes[viewHash] || renderHome;
        const resolvedMeta = routeMeta[viewHash] || routeMeta['#/'];
        metaTitle = resolvedMeta.title;
        metaDesc = resolvedMeta.desc;
    }

    const routeKey = anchor ? viewHash : hash;

    if (currentView !== routeKey) {
        routerView.classList.add('page-exit');
        
        setTimeout(() => {
            routerView.innerHTML = viewFunc();
            currentView = routeKey;
            updateRouteMeta(metaTitle, metaDesc);
            routerView.classList.remove('page-exit');
            routerView.classList.add('page-enter');
            
            setTimeout(() => routerView.classList.remove('page-enter'), 500);
            
            window.scrollTo(0, 0);
            if (window.initScrollReveal) initScrollReveal();
            if (window.initTiltCards) initTiltCards();
            if (window.initMagnetic) initMagnetic();
            if (window.initProjectsStack) initProjectsStack();
            if (window.initVerifiedBadgeConfetti) initVerifiedBadgeConfetti();
            if (window.initAudioLoungeEvents && viewHash === '#/audio') initAudioLoungeEvents();
            if (window.initCyberLabEvents && viewHash === '#/cyber-lab') initCyberLabEvents();
            if (window.initBlogListEvents && viewHash === '#/blog') initBlogListEvents();
            if (window.initBlogDetailEvents && viewHash === '#/blog') initBlogDetailEvents();
            if (window.initGithubGraph && (viewHash === '#/' || viewHash === '#home')) initGithubGraph();
            if (window.playSound) playSound('nav');
        }, currentView === null ? 0 : 200);
    }
    
    // Update active nav link
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === hash || href === viewHash || (viewHash === '#/' && href === anchor)) {
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
