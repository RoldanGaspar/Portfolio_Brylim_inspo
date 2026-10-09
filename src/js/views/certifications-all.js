function renderCertificationsAll() {
    const credlyBadgeList = [
        ...portfolioData.netacadCertsList,
        ...portfolioData.credlyAdditionalBadgesList
    ];

    const renderCertCard = cert => `
        <div class="cert-card-full tilt-card">
            <div class="cert-card-top">
                <div class="cert-visual">
                    ${cert.badgeUrl
                        ? `<img src="${cert.badgeUrl}" alt="${cert.title} badge" class="cert-badge-large" decoding="async">`
                        : `<div class="cert-logo-fallback-wrap">
                            <img src="${cert.logo}" alt="${cert.issuer}" class="cert-logo-large" loading="lazy" onerror="this.hidden = true; this.nextElementSibling.hidden = false;">
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
                    <a href="${cert.credlyUrl || cert.badgeUrl}" class="cert-badge-link magnetic" target="_blank" rel="noopener noreferrer">
                        <i class="ph ph-medal"></i> View Badge
                    </a>
                ` : ''}
                ${cert.certificateImage ? `
                    <a href="${cert.certificateImage}" class="cert-certificate-link magnetic" target="_blank" rel="noopener noreferrer">
                        <i class="ph ph-file-image"></i> View Certificate
                    </a>
                ` : ((cert.verifyUrl || !cert.badgeUrl) ? `
                    <a href="${cert.verifyUrl || '#'}" class="cert-verify-btn magnetic" ${cert.verifyUrl && cert.verifyUrl !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                        <i class="ph ph-seal-check"></i> Verify Credential
                    </a>
                ` : '')}
            </div>
        </div>
    `;

    return `
        <div class="page-header reveal">
            <h2>certifications</h2>
            <p class="page-desc">Professional certifications, local certificate previews, and verified Credly badges from Google, Oracle, Neo4j, AWS, and Cisco Networking Academy.</p>
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

        <section class="cert-provider-group reveal">
            <div class="cert-provider-heading">
                <div>
                    <span class="cert-provider-kicker">02 &mdash; Credly badge wallet</span>
                    <h3>Verified badges &amp; certificates</h3>
                    <p class="cert-provider-description">Ten public Credly badges across Cisco and AWS, with nine matching Networking Academy certificate previews hosted locally.</p>
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
                            <img src="${achievement.badgeUrl}" alt="${achievement.title} achievement badge" loading="lazy">
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
    `;
}
