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
    '#/audio': renderAudioLounge
};

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

    if (hash.startsWith('#/shop/')) {
        const slug = hash.replace('#/shop/', '');
        const item = portfolioData.shop.find(s => s.id === slug);
        viewFunc = () => renderShopDetail(item);
        viewHash = '#/shop';
    } else if (hash.startsWith('#/projects/')) {
        const slug = hash.replace('#/projects/', '');
        const project = portfolioData.projects.find(p => p.id === slug);
        viewFunc = () => renderProjectDetail(project);
        viewHash = '#/projects';
    } else {
        if (!hash.startsWith('#/')) {
            viewHash = '#/';
            anchor = hash;
        }
        viewFunc = routes[viewHash] || renderHome;
    }

    if (currentView !== viewHash) {
        routerView.classList.add('page-exit');
        
        setTimeout(() => {
            routerView.innerHTML = viewFunc();
            currentView = viewHash;
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
            if (window.initGithubGraph && (viewHash === '#/' || viewHash === '#home')) initGithubGraph();
            if (window.playSound) playSound('nav');
        }, currentView === null ? 0 : 200);
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
