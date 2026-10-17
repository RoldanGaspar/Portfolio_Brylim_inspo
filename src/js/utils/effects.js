function initTiltCards() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

function initMagnetic() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

function initProjectsStack() {
    const deck = document.getElementById('projects-stack-deck');
    if (!deck) return;

    const cards = Array.from(deck.querySelectorAll('.project-stack-card'));

    function rotateDeck(direction) {
        const currentCenter = deck.querySelector('.project-stack-card.pos-center');
        const leftCard = deck.querySelector('.project-stack-card.pos-left');
        const rightCard = deck.querySelector('.project-stack-card.pos-right');
        if (!currentCenter) return;

        if (direction === 'next' || direction === 'left') {
            // Swipe left -> bring right card to front
            if (rightCard) {
                currentCenter.classList.remove('pos-center');
                currentCenter.classList.add('pos-left');

                if (leftCard) {
                    leftCard.classList.remove('pos-left');
                    leftCard.classList.add('pos-right');
                }

                rightCard.classList.remove('pos-right');
                rightCard.classList.add('pos-center');

                if (window.playSound) window.playSound('open');
            }
        } else if (direction === 'prev' || direction === 'right') {
            // Swipe right -> bring left card to front
            if (leftCard) {
                currentCenter.classList.remove('pos-center');
                currentCenter.classList.add('pos-right');

                if (rightCard) {
                    rightCard.classList.remove('pos-right');
                    rightCard.classList.add('pos-left');
                }

                leftCard.classList.remove('pos-left');
                leftCard.classList.add('pos-center');

                if (window.playSound) window.playSound('open');
            }
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (card.classList.contains('pos-center')) {
                // Front active card clicked -> Navigate to detail page
                const targetUrl = card.getAttribute('data-url');
                if (targetUrl) {
                    window.location.hash = targetUrl;
                    if (window.playSound) window.playSound('click');
                }
            } else {
                // Background card clicked -> Swap position with center card!
                const currentCenter = deck.querySelector('.project-stack-card.pos-center');
                const clickedPos = card.classList.contains('pos-left') ? 'pos-left' : 'pos-right';

                if (currentCenter) {
                    currentCenter.classList.remove('pos-center');
                    currentCenter.classList.add(clickedPos);
                }

                card.classList.remove(clickedPos);
                card.classList.add('pos-center');

                if (window.playSound) window.playSound('open');
            }
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                rotateDeck('next');
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                rotateDeck('prev');
            }
        });
    });

    // Touch gesture swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    deck.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });

    deck.addEventListener('touchend', (e) => {
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const timeDiff = Date.now() - touchStartTime;

        // Valid swipe: horizontal travel >= 40px, mostly horizontal, under 600ms
        if (Math.abs(deltaX) >= 40 && Math.abs(deltaX) > Math.abs(deltaY) && timeDiff < 600) {
            if (deltaX < 0) {
                rotateDeck('left');
            } else {
                rotateDeck('right');
            }
        }
    }, { passive: true });
}

function initVerifiedBadgeConfetti() {
    const badge = document.getElementById('hero-verified-badge') || document.querySelector('.verified-badge');
    if (!badge) return;

    badge.style.cursor = 'pointer';

    function triggerVerifiedBadge(e) {
        e.stopPropagation();
        if (window.playSound) window.playSound('open');

        const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reducedMotion) {
            // Spin animation on checkmark
            badge.classList.add('verified-spin');
            setTimeout(() => badge.classList.remove('verified-spin'), 700);

            // Confetti Radial Explosion
            const rect = badge.getBoundingClientRect();
            const originX = rect.left + rect.width / 2;
            const originY = rect.top + rect.height / 2;

            const emojis = ['💙', '✔️', '✨', '⚡', '🌟', '💎', '🎉', '🏅'];
            const colors = ['#1d9bf0', '#00f2fe', '#38bdf8', '#34d399', '#c084fc', '#fbbf24'];

            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.className = 'verified-confetti-particle';
                
                const isEmoji = Math.random() > 0.5;
                if (isEmoji) {
                    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                    particle.style.fontSize = (14 + Math.random() * 12) + 'px';
                } else {
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.width = (6 + Math.random() * 8) + 'px';
                    particle.style.height = (6 + Math.random() * 8) + 'px';
                    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                }

                particle.style.left = originX + 'px';
                particle.style.top = originY + 'px';

                const angle = Math.random() * Math.PI * 2;
                const velocity = 80 + Math.random() * 180;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity - 40;

                document.body.appendChild(particle);

                particle.animate([
                    { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
                    { transform: `translate(${vx}px, ${vy + 120}px) scale(0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
                ], {
                    duration: 900 + Math.random() * 400,
                    easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
                }).onfinish = () => particle.remove();
            }
        }

        // Show Floating Verified Toast
        showVerifiedToast();
    }

    badge.addEventListener('click', triggerVerifiedBadge);
    badge.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerVerifiedBadge(e);
        }
    });
}

function showVerifiedToast() {
    let toast = document.getElementById('verified-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'verified-toast';
        toast.className = 'verified-toast-banner';
        toast.innerHTML = `
            <i class="ph-fill ph-seal-check" style="color: #1d9bf0; font-size: 1.4rem;"></i>
            <div>
                <strong>AUTHENTICATED ENGINEER</strong>
                <p>Roldan Gaspar &bull; Software Engineer | AI | Cybersecurity Enthusiast 📍 Pampanga, Philippines</p>
            </div>
        `;
        document.body.appendChild(toast);
    }

    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 4000);
}
