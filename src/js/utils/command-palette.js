// Interactive Command Palette (Ctrl + K / Cmd + K) & Audio Soundscape Widget

const commandItems = [
    { title: "Home", type: "Navigation", icon: "ph-house", url: "#/" },
    { title: "Projects Showcase", type: "Navigation", icon: "ph-squares-four", url: "#/projects" },
    { title: "Tarsi – Budget Tracker Case Study", type: "Project", icon: "ph-wallet", url: "#/projects/tarsi-budget-tracker" },
    { title: "Kabi – Gym Companion Case Study", type: "Project", icon: "ph-barbell", url: "#/projects/kabi-fitness" },
    { title: "Travel Buddy Case Study", type: "Project", icon: "ph-airplane-tilt", url: "#/projects/travel-buddy" },
    { title: "Experience & History", type: "Navigation", icon: "ph-briefcase", url: "#/experience" },
    { title: "Tech Stack & Skills", type: "Navigation", icon: "ph-cpu", url: "#/stack" },
    { title: "Certifications & Badges", type: "Navigation", icon: "ph-seal-check", url: "#/certifications" },
    { title: "Recommendations & Endorsements", type: "Navigation", icon: "ph-quotes", url: "#/recommendations" },
    { title: "Developer Resume Template", type: "Shop", icon: "ph-file-text", url: "#/shop/developer-resume-template" },
    { title: "Blog & Engineering Notes", type: "Navigation", icon: "ph-article", url: "#/blog" },
    { title: "Blog: Stop Focusing Only on the AI Model", type: "Blog", icon: "ph-article", url: "#/blog/building-ai-harnesses" },
    { title: "Blog: Boring Guardrails Make AI Features Better", type: "Blog", icon: "ph-shield-check", url: "#/blog/boring-ai-guardrails" },
    { title: "Gear Setup", type: "Navigation", icon: "ph-desktop", url: "#/gear" },
    { title: "Resources & AI Courses", type: "Navigation", icon: "ph-book-open", url: "#/resources" },
    { title: "Consulting Services", type: "Navigation", icon: "ph-handshake", url: "#/consulting" },
    { title: "CyberOps & Network Defense Lab", type: "Navigation", icon: "ph-shield-check", url: "#/cyber-lab" },
    { title: "Toggle Theme (Light / Dark)", type: "Action", icon: "ph-moon", action: "toggleTheme" },
    { title: "Play Ambient Lo-Fi Beats", type: "Audio", icon: "ph-headphones", action: "playLofi" },
    { title: "Play Gentle Rain Soundscape", type: "Audio", icon: "ph-cloud-rain", action: "playRain" },
    { title: "Play 40Hz Deep Focus Binaural Beats", type: "Audio", icon: "ph-brain", action: "playBinaural" },
    { title: "Mute Soundscape", type: "Audio", icon: "ph-speaker-slash", action: "stopAudio" },
    { title: "Sign Developer Guestbook", type: "Action", icon: "ph-book-bookmark", action: "openGuestbook" },
    { title: "Send a Message / Contact Roldan", type: "Action", icon: "ph-paper-plane-tilt", action: "openContact" },
    { title: "View / Print Roldan's Resume", type: "Action", icon: "ph-file-pdf", action: "viewResume" },
    { title: "Launch 2D Dev Lounge Mini-Game", type: "Action", icon: "ph-game-controller", action: "launchGame" }
];

let selectedIdx = 0;

function initCommandPalette() {
    // Add Keyboard listener (Ctrl + K or Cmd + K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            toggleCommandPalette();
        }
        if (e.key === 'Escape') {
            closeCommandPalette();
        }
    });

    // Attach click listeners to "Ask anything Alt + K" buttons in sidebar
    document.querySelectorAll('.sidebar-widgets .widget-btn').forEach((btn, idx) => {
        if (idx === 0) { // Ask anything
            btn.addEventListener('click', () => toggleCommandPalette());
        }
    });

    // Render Modal Markup in DOM if missing
    if (!document.getElementById('cmd-palette-modal')) {
        const modal = document.createElement('div');
        modal.id = 'cmd-palette-modal';
        modal.className = 'cmd-modal-overlay';
        modal.innerHTML = `
            <div class="cmd-palette-container">
                <div class="cmd-header">
                    <i class="ph ph-magnifying-glass search-icon"></i>
                    <input type="text" id="cmd-input" placeholder="Type a command or search..." autocomplete="off">
                    <span class="cmd-kbd-hint">ESC to close</span>
                </div>
                <div id="cmd-results" class="cmd-results-list"></div>
                <div class="cmd-footer">
                    <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
                    <span><kbd>↵</kbd> to select</span>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeCommandPalette();
        });

        const input = document.getElementById('cmd-input');
        input.addEventListener('input', () => renderCmdResults(input.value.trim()));
        input.addEventListener('keydown', handleCmdKeyNav);
    }
}

function toggleCommandPalette() {
    const modal = document.getElementById('cmd-palette-modal');
    if (!modal) return;
    if (modal.classList.contains('active')) {
        closeCommandPalette();
    } else {
        openCommandPalette();
    }
}

function openCommandPalette() {
    const modal = document.getElementById('cmd-palette-modal');
    const input = document.getElementById('cmd-input');
    if (!modal || !input) return;

    modal.classList.add('active');
    input.value = '';
    selectedIdx = 0;
    renderCmdResults('');
    setTimeout(() => input.focus(), 100);
    if (window.playSound) window.playSound('open');
}

function closeCommandPalette() {
    const modal = document.getElementById('cmd-palette-modal');
    if (modal) {
        modal.classList.remove('active');
        if (window.playSound) window.playSound('close');
    }
}

function renderCmdResults(filterQuery) {
    const resultsContainer = document.getElementById('cmd-results');
    if (!resultsContainer) return;

    const query = filterQuery.toLowerCase();
    const filtered = commandItems.filter(item => 
        item.title.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<div class="cmd-empty">No results matching "${filterQuery}"</div>`;
        return;
    }

    selectedIdx = Math.min(selectedIdx, filtered.length - 1);

    resultsContainer.innerHTML = filtered.map((item, idx) => `
        <div class="cmd-item ${idx === selectedIdx ? 'selected' : ''}" data-idx="${idx}">
            <i class="ph ${item.icon}"></i>
            <span class="cmd-title">${item.title}</span>
            <span class="cmd-type-badge">${item.type}</span>
        </div>
    `).join('');

    resultsContainer.querySelectorAll('.cmd-item').forEach((el, idx) => {
        el.addEventListener('click', () => executeCmdItem(filtered[idx]));
        el.addEventListener('mouseenter', () => {
            selectedIdx = idx;
            updateSelectedCmdHighlight(filtered);
        });
    });
}

function updateSelectedCmdHighlight(filtered) {
    const items = document.querySelectorAll('.cmd-results-list .cmd-item');
    items.forEach((item, idx) => {
        if (idx === selectedIdx) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('selected');
        }
    });
}

function handleCmdKeyNav(e) {
    const query = e.target.value.trim().toLowerCase();
    const filtered = commandItems.filter(item => 
        item.title.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)
    );

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filtered.length > 0) {
            selectedIdx = (selectedIdx + 1) % filtered.length;
            updateSelectedCmdHighlight(filtered);
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filtered.length > 0) {
            selectedIdx = (selectedIdx - 1 + filtered.length) % filtered.length;
            updateSelectedCmdHighlight(filtered);
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIdx]) {
            executeCmdItem(filtered[selectedIdx]);
        }
    }
}

function executeCmdItem(item) {
    closeCommandPalette();
    if (window.playSound) window.playSound('click');

    if (item.url) {
        window.location.hash = item.url;
    } else if (item.action === 'toggleTheme') {
        const themeBtn = document.querySelector('.theme-btn:not(.active)');
        if (themeBtn) themeBtn.click();
    } else if (item.action === 'playLofi') {
        if (window.setSoundscape) window.setSoundscape('lofi');
    } else if (item.action === 'playRain') {
        if (window.setSoundscape) window.setSoundscape('rain');
    } else if (item.action === 'playBinaural') {
        if (window.setSoundscape) window.setSoundscape('binaural-flow');
    } else if (item.action === 'stopAudio') {
        if (window.stopSoundscape) window.stopSoundscape();
    } else if (item.action === 'openGuestbook') {
        if (window.openGuestbookModal) window.openGuestbookModal();
    } else if (item.action === 'openContact') {
        if (window.openContactModal) window.openContactModal('Hiring');
    } else if (item.action === 'viewResume') {
        window.open('assets/resume/roldan-gaspar-resume.html', '_blank');
    } else if (item.action === 'launchGame') {
        if (window.openCommunityModal) openCommunityModal();
    }
}

window.addEventListener('DOMContentLoaded', initCommandPalette);
