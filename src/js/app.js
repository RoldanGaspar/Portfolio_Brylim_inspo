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
    if (window.updateVisitorCounterUI) updateVisitorCounterUI();
    
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

    // Contact Modal Trigger
    const contactBtn = document.getElementById('open-contact-modal-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            if (window.playSound) playSound('click');
            if (window.openContactModal) window.openContactModal('Hiring / Project');
            if (sidebar && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                const menuBtnIcon = document.querySelector('#mobile-menu-toggle i');
                if (menuBtnIcon) menuBtnIcon.className = 'ph ph-list';
            }
        });
    }

    // Delegated Contact Triggers for dynamically rendered views
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-contact]');
        if (trigger) {
            e.preventDefault();
            const inquiry = trigger.getAttribute('data-open-contact') || 'General Inquiry';
            if (window.playSound) playSound('click');
            if (window.openContactModal) window.openContactModal(inquiry);
        }
    });

    // Guestbook Modal Trigger
    const guestbookBtn = document.getElementById('sidebar-guestbook-btn');
    if (guestbookBtn) {
        guestbookBtn.addEventListener('click', () => {
            if (window.playSound) playSound('click');
            if (window.openGuestbookModal) window.openGuestbookModal();
            if (sidebar && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                const menuBtnIcon = document.querySelector('#mobile-menu-toggle i');
                if (menuBtnIcon) menuBtnIcon.className = 'ph ph-list';
            }
        });
    }

    // Delegated Guestbook Triggers
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-guestbook]');
        if (trigger) {
            e.preventDefault();
            if (window.playSound) playSound('click');
            if (window.openGuestbookModal) window.openGuestbookModal();
        }
    });
});
