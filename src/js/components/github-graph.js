// GitHub Real Activity & Contributions Component
// Fetches real GitHub contributions and repositories for user RoldanGaspar

const GITHUB_USERNAME = 'RoldanGaspar';

// Verified fallback repository list if GitHub API rate limit is reached
const FALLBACK_REPOS = [
    {
        name: 'Portfolio_Brylim_inspo',
        description: 'Personal portfolio SPA inspired by minimalist developer aesthetics, powered by Supabase & Vercel.',
        language: 'JavaScript',
        stargazers_count: 0,
        forks_count: 0,
        html_url: 'https://github.com/RoldanGaspar/Portfolio_Brylim_inspo',
        updated_at: '2026-10-14T13:26:57Z'
    },
    {
        name: 'AWarden-A-applocker_credentials',
        description: 'AppLocker policy automation and credential security tooling for Windows administration.',
        language: 'TypeScript',
        stargazers_count: 0,
        forks_count: 0,
        html_url: 'https://github.com/RoldanGaspar/AWarden-A-applocker_credentials',
        updated_at: '2026-10-10T07:23:54Z'
    },
    {
        name: 'pos_with_inventory_system',
        description: 'Point of Sale & Inventory management desktop suite with transactional reporting.',
        language: 'Python',
        stargazers_count: 0,
        forks_count: 0,
        html_url: 'https://github.com/RoldanGaspar/pos_with_inventory_system',
        updated_at: '2026-10-10T07:22:57Z'
    },
    {
        name: 'pet-hub-payroll',
        description: 'Modern payroll calculation and veterinary clinic employee management system.',
        language: 'TypeScript',
        stargazers_count: 0,
        forks_count: 0,
        html_url: 'https://github.com/RoldanGaspar/pet-hub-payroll',
        updated_at: '2026-10-10T07:23:11Z'
    }
];

const LANG_COLORS = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'C#': '#178600',
    'HTML': '#e34c26',
    'CSS': '#563d7c'
};

function renderReposMarkup(repos) {
    if (!Array.isArray(repos) || repos.length === 0) return '';
    return repos.map(repo => {
        const lang = repo.language || 'Code';
        const langColor = LANG_COLORS[lang] || 'var(--accent-blue)';
        const dateStr = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
        const desc = repo.description || 'Public open-source software project by Roldan Gaspar.';
        return `
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-repo-card">
                <div class="repo-card-top">
                    <span class="repo-icon"><i class="ph ph-git-branch"></i></span>
                    <h4 class="repo-name">${repo.name}</h4>
                    <i class="ph ph-arrow-up-right repo-external"></i>
                </div>
                <p class="repo-desc">${desc}</p>
                <div class="repo-card-meta">
                    <span class="repo-lang">
                        <span class="lang-dot" style="background-color: ${langColor};"></span>
                        ${lang}
                    </span>
                    <span class="repo-stars" title="Stars"><i class="ph-fill ph-star"></i> ${repo.stargazers_count || 0}</span>
                    <span class="repo-forks" title="Forks"><i class="ph-fill ph-git-fork"></i> ${repo.forks_count || 0}</span>
                    ${dateStr ? `<span class="repo-date">${dateStr}</span>` : ''}
                </div>
            </a>
        `;
    }).join('');
}

function generateGithubGraph() {
    let dots = '';
    const totalDays = 52 * 7;
    for (let i = 0; i < totalDays; i++) {
        dots += `<div class="github-dot" data-level="0"></div>`;
    }

    return `
        <div class="github-graph-container">
            <div class="github-grid" id="github-calendar-grid">
                ${dots}
            </div>
            <div class="github-footer-row">
                <p class="github-footer" id="github-footer-status">
                    <strong id="github-contributions-count">&mdash;</strong> CONTRIBUTIONS IN THE LAST YEAR
                </p>
                <span class="github-live-badge" id="github-sync-badge"><i class="ph ph-arrows-clockwise"></i> syncing...</span>
            </div>
            <div class="github-scroll-hint">
                <i class="ph-bold ph-arrows-horizontal"></i>
                <span>Swipe horizontally to view full activity</span>
            </div>
        </div>

        <div class="github-repos-section">
            <div class="github-repos-header">
                <span class="repos-kicker">FEATURED OPEN SOURCE REPOSITORIES</span>
                <a href="https://github.com/RoldanGaspar?tab=repositories" target="_blank" rel="noopener noreferrer" class="repos-view-all magnetic">VIEW ALL ON GITHUB &rarr;</a>
            </div>
            <div class="github-repos-grid" id="github-repos-grid">
                ${renderReposMarkup(FALLBACK_REPOS)}
            </div>
        </div>
    `;
}

// Asynchronously hydrate with live contributions & GitHub repos
async function initGithubGraph() {
    // 1. Fetch real contributions
    try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);
        if (res.ok) {
            const data = await res.json();
            const grid = document.getElementById('github-calendar-grid');
            const countEl = document.getElementById('github-contributions-count');
            const badgeEl = document.getElementById('github-sync-badge');

            if (grid && Array.isArray(data.contributions) && data.contributions.length > 0) {
                let html = '';
                data.contributions.forEach(c => {
                    const countText = `${c.count} contribution${c.count === 1 ? '' : 's'}`;
                    const title = `${c.date}: ${countText}`;
                    html += `<div class="github-dot" data-level="${c.level}" title="${title}"></div>`;
                });
                grid.innerHTML = html;
            }

            if (countEl && data.total && data.total.lastYear !== undefined) {
                countEl.textContent = Number(data.total.lastYear).toLocaleString();
            }

            if (badgeEl) {
                badgeEl.innerHTML = '<i class="ph-fill ph-circle"></i> live synced';
                badgeEl.classList.remove('offline');
            }
        } else {
            throw new Error(`GitHub contributions HTTP ${res.status}`);
        }
    } catch (e) {
        console.warn('Live GitHub contribution fetch notice:', e);
        const countEl = document.getElementById('github-contributions-count');
        const badgeEl = document.getElementById('github-sync-badge');
        if (countEl && (countEl.textContent === '—' || countEl.textContent === '--')) {
            countEl.textContent = '100+';
        }
        if (badgeEl) {
            badgeEl.innerHTML = '<i class="ph ph-cloud-slash"></i> cached estimate';
            badgeEl.classList.add('offline');
        }
    }

    // 2. Fetch real live repositories
    try {
        const repoRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=4`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        if (repoRes.ok) {
            const repos = await repoRes.json();
            const reposGrid = document.getElementById('github-repos-grid');
            if (reposGrid && Array.isArray(repos) && repos.length > 0) {
                reposGrid.innerHTML = renderReposMarkup(repos);
            }
        }
    } catch (e) {
        console.warn('Live GitHub repos fetch notice:', e);
    }
}

// Global Exports
window.generateGithubGraph = generateGithubGraph;
window.initGithubGraph = initGithubGraph;
