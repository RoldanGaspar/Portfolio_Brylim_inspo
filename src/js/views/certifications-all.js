function renderCertificationsAll() {
    const credlyBadgeList = [
        ...portfolioData.netacadCertsList,
        ...portfolioData.credlyAdditionalBadgesList
    ];

    const getCertCategory = cert => {
        const title = (cert.title || '').toLowerCase();
        const issuer = (cert.issuer || '').toLowerCase();
        const skills = (cert.skills || []).map(s => s.toLowerCase()).join(' ');

        if (issuer.includes('cisco') || title.includes('essentials') || title.includes('networking') || title.includes('cybersecurity')) {
            return 'cisco';
        }
        if (issuer.includes('aws') || title.includes('aws') || skills.includes('aws') || title.includes('cloud')) {
            return 'cloud';
        }
        if (skills.includes('security') || title.includes('cyber') || title.includes('hacker') || title.includes('defense')) {
            return 'security';
        }
        if (skills.includes('javascript') || skills.includes('python') || title.includes('developer') || skills.includes('programming')) {
            return 'dev';
        }
        return 'other';
    };

    const renderCertCard = cert => {
        const cat = getCertCategory(cert);
        const certImg = cert.certificateImage || '';
        const credly = cert.credlyUrl || cert.badgeUrl || '';
        const verify = cert.verifyUrl || '#';

        return `
        <div class="cert-card-full tilt-card cert-item" data-category="${cat}">
            <div class="cert-card-top">
                <div class="cert-visual">
                    ${cert.badgeUrl
                        ? `<img src="${cert.badgeUrl}" alt="${cert.title} badge" class="cert-badge-large" loading="lazy" decoding="async">`
                        : `<div class="cert-logo-fallback-wrap">
                            <img src="${cert.logo}" alt="${cert.issuer}" class="cert-logo-large" loading="lazy" decoding="async" onerror="this.hidden = true; this.nextElementSibling.hidden = false;">
                            <span class="cert-logo-fallback" hidden>${cert.issuer.split(/\s+/).filter(word => word.length > 1).slice(0, 2).map(word => word[0]).join('')}</span>
                        </div>`}
                </div>
                <span class="cert-date-badge">${cert.date}</span>
            </div>
            <h3>${cert.title}</h3>
            <span class="cert-issuer-text">${cert.issuer}</span>

            ${cert.description ? `<p class="cert-description">${cert.description}</p>` : ''}

            ${(cert.hours || cert.academy) ? `
                <div class="cert-meta-row">
                    ${cert.hours ? `<span><i class="ph ph-clock"></i>${cert.hours} hours</span>` : ''}
                    ${cert.academy ? `<span><i class="ph ph-buildings"></i>${cert.academy}</span>` : ''}
                </div>
            ` : ''}

            <div class="cert-skills-list">
                ${cert.skills.map(s => `<span class="tech-tag">${s}</span>`).join('')}
            </div>

            <div class="cert-card-actions">
                ${cert.badgeUrl ? `
                    <a href="${credly}" class="cert-badge-link magnetic" target="_blank" rel="noopener noreferrer">
                        <i class="ph ph-medal"></i> View Badge
                    </a>
                ` : ''}
                ${certImg ? `
                    <button type="button" class="cert-certificate-link magnetic cert-preview-trigger" data-title="${encodeURIComponent(cert.title)}" data-issuer="${encodeURIComponent(cert.issuer)}" data-img="${certImg}" data-credly="${encodeURIComponent(credly)}">
                        <i class="ph ph-file-image"></i> Preview Certificate
                    </button>
                ` : ((cert.verifyUrl || !cert.badgeUrl) ? `
                    <a href="${verify}" class="cert-verify-btn magnetic" ${verify !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                        <i class="ph ph-seal-check"></i> Verify Credential
                    </a>
                ` : '')}
            </div>
        </div>
        `;
    };

    // Attach dynamic filter and lightbox listeners after DOM paint
    setTimeout(() => {
        const filterBtns = document.querySelectorAll('.cert-filter-btn');
        const certCards = document.querySelectorAll('.cert-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                certCards.forEach(card => {
                    const cardCat = card.getAttribute('data-category');
                    if (filter === 'all' || cardCat === filter || (filter === 'cisco' && card.closest('#cisco-credly-group'))) {
                        card.style.display = '';
                        card.style.animation = 'fadeIn 0.3s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Lightbox modal trigger
        const previewBtns = document.querySelectorAll('.cert-preview-trigger');
        const modal = document.getElementById('cert-lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const modalTitle = document.getElementById('lightbox-title');
        const modalIssuer = document.getElementById('lightbox-issuer');
        const modalCredlyLink = document.getElementById('lightbox-credly-link');
        const modalClose = document.getElementById('lightbox-close-btn');

        if (modal && previewBtns.length) {
            previewBtns.forEach(b => {
                b.addEventListener('click', e => {
                    e.preventDefault();
                    modalImg.src = b.getAttribute('data-img');
                    modalTitle.textContent = decodeURIComponent(b.getAttribute('data-title'));
                    modalIssuer.textContent = decodeURIComponent(b.getAttribute('data-issuer'));
                    const credLink = decodeURIComponent(b.getAttribute('data-credly'));
                    if (credLink && credLink !== '#') {
                        modalCredlyLink.href = credLink;
                        modalCredlyLink.style.display = 'inline-flex';
                    } else {
                        modalCredlyLink.style.display = 'none';
                    }
                    modal.classList.add('active');
                });
            });

            if (modalClose) {
                modalClose.addEventListener('click', () => modal.classList.remove('active'));
            }
            modal.addEventListener('click', e => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }
    }, 60);

    return `
        <div class="page-header reveal">
            <h2>certifications</h2>
            <p class="page-desc">Professional certifications, verified Credly badges, and high-resolution certificates from Cisco Networking Academy, DICT-ITU, and AWS Educate.</p>
        </div>

        <!-- Filter Pills Bar -->
        <div class="cert-filters-bar reveal">
            <button class="cert-filter-btn filter-pill active" data-filter="all"><i class="ph ph-squares-four"></i> All Credentials</button>
            <button class="cert-filter-btn filter-pill" data-filter="cisco"><i class="ph ph-shield-check"></i> Cisco NetAcad</button>
            <button class="cert-filter-btn filter-pill" data-filter="security"><i class="ph ph-lock-key"></i> Cybersecurity</button>
            <button class="cert-filter-btn filter-pill" data-filter="dev"><i class="ph ph-code"></i> Programming</button>
            <button class="cert-filter-btn filter-pill" data-filter="cloud"><i class="ph ph-cloud"></i> Cloud &amp; AI</button>
        </div>

        <section class="cert-provider-group reveal">
            <div class="cert-provider-heading">
                <div>
                    <span class="cert-provider-kicker">01 &mdash; professional credentials</span>
                    <h3>Certifications</h3>
                </div>
                <span class="cert-provider-count">${portfolioData.certsList.length} credentials</span>
            </div>
            <div class="certs-full-grid">
                ${portfolioData.certsList.map(renderCertCard).join('')}
            </div>
        </section>

        <section class="cert-provider-group reveal" id="cisco-credly-group">
            <div class="cert-provider-heading">
                <div>
                    <span class="cert-provider-kicker">02 &mdash; Credly badge wallet</span>
                    <h3>Verified badges &amp; certificates</h3>
                    <p class="cert-provider-description">Public Credly badges across Cisco and AWS, with high-resolution certificate previews.</p>
                </div>
                <span class="cert-provider-count">${credlyBadgeList.length} badges &middot; ${portfolioData.netacadCertsList.length} certificates</span>
            </div>
            <div class="certs-full-grid">
                ${credlyBadgeList.map(renderCertCard).join('')}
            </div>

            <div class="learning-achievements">
                <div class="learning-achievements-heading">
                    <div>
                        <span class="cert-provider-kicker">Additional learning achievements</span>
                        <p>Cybersecurity module achievements earned through Networking Academy.</p>
                    </div>
                    <a href="https://www.netacad.com/profile?tab=badges" target="_blank" rel="noopener noreferrer" class="cert-achievements-link magnetic">View on NetAcad <i class="ph ph-arrow-up-right"></i></a>
                </div>
                <div class="achievement-grid">
                    ${portfolioData.netacadAchievementsList.map(achievement => `
                        <a href="https://www.netacad.com/profile?tab=badges" target="_blank" rel="noopener noreferrer" class="achievement-card">
                            <img src="${achievement.badgeUrl}" alt="${achievement.title} achievement badge" loading="lazy" decoding="async">
                            <span>
                                <strong>${achievement.title}</strong>
                                <small>MODULE ACHIEVEMENT &middot; ${achievement.date}</small>
                            </span>
                            <i class="ph ph-arrow-up-right"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Certificate Lightbox Modal -->
        <div id="cert-lightbox-modal" class="cert-lightbox-overlay">
            <div class="cert-lightbox-content">
                <button id="lightbox-close-btn" class="lightbox-close" aria-label="Close Preview">&times;</button>
                <div class="lightbox-header">
                    <h3 id="lightbox-title">Certificate</h3>
                    <span id="lightbox-issuer" class="lightbox-issuer-pill"></span>
                </div>
                <div class="lightbox-image-wrap">
                    <img id="lightbox-img" src="" alt="Certificate Preview" decoding="async">
                </div>
                <div class="lightbox-footer">
                    <a id="lightbox-credly-link" href="https://www.netacad.com/profile?tab=badges" target="_blank" rel="noopener noreferrer" class="lightbox-action-btn credly">
                        <i class="ph ph-medal"></i> Verify on Credly
                    </a>
                </div>
            </div>
        </div>
    `;
}
