function renderExperienceAll() {
    const items = (portfolioData.experienceList || []).filter(exp => !exp.homeOnly);

    return `
        <div class="experience-page-container reveal">
            <div class="page-header">
                <h2 class="page-title-clean">experience</h2>
                <p class="page-desc-clean">Software engineering, AI systems, and cybersecurity &mdash; focused on dependable full-stack applications, network defense, and practical AI tooling.</p>
            </div>

            <div class="exp-timeline-list">
                ${items.map(exp => `
                    <div class="exp-timeline-item">
                        <div class="exp-avatar-square">${exp.initials || 'EX'}</div>
                        <div class="exp-timeline-content">
                            <div class="exp-company-header">
                                <h3>${exp.company}</h3>
                                <span class="exp-employment-type">${exp.employmentType || 'Full-time'}</span>
                            </div>
                            ${exp.location ? `<span class="exp-location-tag">${exp.location}</span>` : ''}
                            <div class="exp-role-block">
                                <h4 class="exp-role-title">${exp.title}</h4>
                                <span class="exp-date-duration">${exp.year}</span>
                                <p class="exp-summary-text">${exp.desc}</p>
                                ${(exp.highlights && exp.highlights.length > 0) ? `
                                    <ul class="exp-detail-bullets">
                                        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                                    </ul>
                                ` : ''}
                                ${(exp.tech && exp.tech.length > 0) ? `
                                    <div class="exp-dashed-skills">
                                        ${exp.tech.map(t => `<span class="dashed-skill">${t}</span>`).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
