function initTheme(getCurrentView) {
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
        if (window.playSound) window.playSound('click');
    }

    setTheme(savedTheme || 'system');

    themeBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => setTheme(newBtn.getAttribute('data-set-theme')));
    });

    // ScrollSpy for Home page
    window.addEventListener('scroll', () => {
        if (getCurrentView && getCurrentView() !== '#/') return;
        
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
