// Application Initialization
window.addEventListener('hashchange', () => {
    router();
    // Auto-close mobile drawer on route change
    const sidebar = document.querySelector('.sidebar');
    const menuBtnIcon = document.querySelector('#mobile-menu-toggle i');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        if (menuBtnIcon) menuBtnIcon.className = 'ph ph-list';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    router();
    if (window.initTheme) initTheme(getCurrentView);
    if (window.initModals) initModals();
    if (window.initSoundToggle) initSoundToggle();
    
    // Add sound feedback & auto-close drawer on click
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.playSound) playSound('click');
            const sidebar = document.querySelector('.sidebar');
            const menuBtnIcon = document.querySelector('#mobile-menu-toggle i');
            if (sidebar && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                if (menuBtnIcon) menuBtnIcon.className = 'ph ph-list';
            }
        });
    });

    // Mobile Menu Toggle Event Handler
    const menuBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('mobile-open');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'ph ph-x' : 'ph ph-list';
            }
            if (window.playSound) playSound('click');
        });
    }
});
