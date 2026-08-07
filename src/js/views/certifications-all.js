function renderCertificationsAll() {
    return `
        <div class="page-header reveal">
            <h2>certifications</h2>
            <p class="page-desc">Official certifications & credentials verified by Google, Oracle, Neo4j, and Amazon Web Services.</p>
        </div>

        <div class="certs-full-grid reveal">
            ${portfolioData.certsList.map(cert => `
                <div class="cert-card-full tilt-card">
                    <div class="cert-card-top">
                        <img src="${cert.logo}" alt="${cert.issuer}" class="cert-logo-large">
                        <span class="cert-date-badge">${cert.date}</span>
                    </div>
                    <h3>${cert.title}</h3>
                    <span class="cert-issuer-text">${cert.issuer}</span>
                    
                    <div class="cert-skills-list">
                        ${cert.skills.map(s => `<span class="tech-tag">${s}</span>`).join('')}
                    </div>

                    <a href="${cert.verifyUrl}" class="cert-verify-btn magnetic">
                        <i class="ph ph-seal-check"></i> Verify Credential
                    </a>
                </div>
            `).join('')}
        </div>
    `;
}
