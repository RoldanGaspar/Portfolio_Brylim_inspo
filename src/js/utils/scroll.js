function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealEls.forEach(el => el.classList.add('revealed'));
        return;
    }
    
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
