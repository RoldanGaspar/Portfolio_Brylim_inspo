function initModals() {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    modalContainer.className = 'modal-container';
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-modal', 'true');
    modalContainer.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content-area"></div>
    `;
    document.body.appendChild(modalContainer);

    const overlay = modalContainer.querySelector('.modal-overlay');
    const contentArea = modalContainer.querySelector('.modal-content-area');
    let lastFocusedModalTrigger = null;
    let activeModalCleanup = null;

    function openModal(contentHtml, onCleanup) {
        if (typeof activeModalCleanup === 'function') {
            activeModalCleanup();
            activeModalCleanup = null;
        }
        lastFocusedModalTrigger = document.activeElement;
        activeModalCleanup = typeof onCleanup === 'function' ? onCleanup : null;
        contentArea.innerHTML = contentHtml;
        modalContainer.classList.add('active');
        if (window.playSound) window.playSound('open');
    }

    function closeModal() {
        if (!modalContainer.classList.contains('active')) return;
        if (typeof activeModalCleanup === 'function') {
            const fn = activeModalCleanup;
            activeModalCleanup = null;
            fn();
        }
        modalContainer.classList.remove('active');
        if (window.playSound) window.playSound('close');
        setTimeout(() => { contentArea.innerHTML = ''; }, 300);
        if (lastFocusedModalTrigger && typeof lastFocusedModalTrigger.focus === 'function') {
            lastFocusedModalTrigger.focus();
            lastFocusedModalTrigger = null;
        }
    }

    document.addEventListener('keydown', (e) => {
        if (!modalContainer.classList.contains('active')) return;
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'Tab') {
            const focusable = contentArea.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
            if (focusable.length > 0) {
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });

    overlay.addEventListener('click', closeModal);

    document.querySelectorAll('.sidebar-widgets .widget-btn').forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            if (idx === 0) openTerminalModal();
            if (idx === 1) openTypingModal();
        });
    });

    const communityChatBtn = document.getElementById('sidebar-community-chat-btn');
    if (communityChatBtn) {
        communityChatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCommunityModal();
            const sidebar = document.querySelector('.sidebar');
            const menuBtnIcon = document.querySelector('#mobile-menu-toggle i');
            if (sidebar && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                if (menuBtnIcon) menuBtnIcon.className = 'ph ph-list';
            }
        });
    }

    const avatarStack = document.getElementById('sidebar-avatar-stack');
    if (avatarStack) {
        avatarStack.style.cursor = 'pointer';
        avatarStack.addEventListener('click', () => {
            openCommunityModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openTerminalModal();
        }
        if (e.altKey && e.key.toLowerCase() === 'j') {
            e.preventDefault();
            openTypingModal();
        }
    });

    const terminalHistory = [];
    let terminalHistoryIdx = -1;

    function escapeTerminalText(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function openTerminalModal() {
        openModal(`
            <div class="terminal-modal fade-in">
                <h2>roldan@cyberops-shell:~</h2>
                <div class="terminal-input-area">
                    <input type="text" id="terminal-input" class="terminal-input" placeholder="type a command (Tab to autocomplete, ↑/↓ history)..." autocomplete="off" autofocus>
                </div>
                <div class="terminal-output" id="terminal-output">
                    <div class="terminal-line">
                        <span class="t-green">RoldanOS CyberOps Shell v4.0</span> &mdash; Type <code>help</code> or click a command below.
                    </div>
                </div>
                <div class="terminal-hints" id="terminal-quick-chips">
                    <span>Try: <code>help</code>, <code>ls</code>, <code>cat certs.json</code>, <code>nmap</code>, <code>verify-certs</code>, <code>cd cyber-lab</code>, <code>matrix</code></span>
                </div>
            </div>
        `);
        
        const input = document.getElementById('terminal-input');
        const output = document.getElementById('terminal-output');
        const hints = document.getElementById('terminal-quick-chips');

        const autoCompletePool = [
            'help', 'about', 'contact', 'stack', 'projects', 'whoami',
            'ls', 'cat resume.md', 'cat certs.json', 'cat security.log',
            'nmap', 'verify-certs', 'cd projects', 'cd blog', 'cd cyber-lab',
            'cd audio', 'cd certifications', 'matrix', 'game', 'theme', 'sudo', 'clear'
        ];

        if (hints && input) {
            hints.querySelectorAll('code').forEach(codeEl => {
                codeEl.style.cursor = 'pointer';
                codeEl.addEventListener('click', () => {
                    const cmdText = codeEl.textContent.trim();
                    terminalHistory.push(cmdText);
                    terminalHistoryIdx = terminalHistory.length;
                    processTerminalCommand(cmdText, output);
                    if (window.playSound) window.playSound('key');
                    input.focus();
                });
            });
        }
        
        if (input) {
            setTimeout(() => input.focus(), 100);
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const rawCmd = input.value.trim();
                    if (!rawCmd) return;
                    terminalHistory.push(rawCmd);
                    terminalHistoryIdx = terminalHistory.length;
                    input.value = '';
                    processTerminalCommand(rawCmd.toLowerCase(), output);
                    if (window.playSound) window.playSound('key');
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (terminalHistory.length > 0 && terminalHistoryIdx > 0) {
                        terminalHistoryIdx--;
                        input.value = terminalHistory[terminalHistoryIdx];
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (terminalHistoryIdx < terminalHistory.length - 1) {
                        terminalHistoryIdx++;
                        input.value = terminalHistory[terminalHistoryIdx];
                    } else {
                        terminalHistoryIdx = terminalHistory.length;
                        input.value = '';
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    const currentVal = input.value.trim().toLowerCase();
                    if (!currentVal) return;
                    const match = autoCompletePool.find(item => item.startsWith(currentVal));
                    if (match) {
                        input.value = match;
                        if (window.playSound) window.playSound('key');
                    }
                }
            });
        }
    }
    
    function processTerminalCommand(cmd, output) {
        const netacadCount = (window.portfolioData && portfolioData.netacadCertsList) ? portfolioData.netacadCertsList.length : 10;
        const safeEcho = escapeTerminalText(cmd);

        const virtualFiles = {
            'resume.md': `<span class="t-green"># Roldan Gaspar — Software Engineer · AI · Cybersecurity</span><br>Location: Pampanga, Philippines<br>Email: gaspar26roldan@gmail.com<br>Printable CV: <a href="assets/resume/roldan-gaspar-resume.html" target="_blank" style="text-decoration:underline;">Open ATS Resume &nearr;</a>`,
            'certs.json': `<span class="t-green">{ "verifiedProvider": "Cisco Networking Academy & AWS", "count": ${netacadCount + 1} }</span><br>&bull; CyberOps Associate &bull; Ethical Hacker &bull; Network Defense<br>&bull; Endpoint Security &bull; Python Essentials 1 &amp; 2 &bull; JS Essentials 1 &amp; 2`,
            'security.log': `<span class="t-green">[SIEM-OK]</span> Perimeter ASA Firewall ACL #104 active<br><span class="t-green">[RLS-OK]</span> Supabase PostgreSQL Row-Level Security enforced<br><span class="t-green">[XSS-OK]</span> Strict textContent sanitization verified`
        };

        const commands = {
            help: `<span class="t-green">CyberOps Shell Commands:</span><br>
                   <code>ls</code> / <code>cat &lt;file&gt;</code> — Browse virtual filesystem (<code>resume.md</code>, <code>certs.json</code>, <code>security.log</code>)<br>
                   <code>cd &lt;route&gt;</code> — Navigate SPA (<code>projects</code>, <code>blog</code>, <code>cyber-lab</code>, <code>audio</code>, <code>certifications</code>)<br>
                   <code>nmap</code> — Run perimeter port &amp; service posture scan<br>
                   <code>verify-certs</code> — List verified Cisco NetAcad &amp; AWS credentials<br>
                   <code>about</code> · <code>contact</code> · <code>stack</code> · <code>projects</code> · <code>whoami</code><br>
                   <code>matrix</code> · <code>game</code> · <code>theme</code> · <code>clear</code>`,
            ls: `<span class="t-green">drwxr-xr-x</span>  projects/   blog/   cyber-lab/   audio/<br><span class="t-green">-rw-r--r--</span>  resume.md   certs.json   security.log`,
            nmap: `<span class="t-green">Starting Nmap 7.95 scan on roldangaspar.vercel.app...</span><br>
                   PORT      STATE     SERVICE       REASON<br>
                   443/tcp   <span class="t-green">open</span>      https         Vercel Edge TLS 1.3 (Strict-Transport)<br>
                   5432/tcp  <span class="t-green">filtered</span>  postgresql    Supabase RLS Policy Enforced<br>
                   8021/tcp  <span class="t-green">open</span>      cyber-lab     Snort IPS &amp; Stateful ACL #104 Active<br>
                   <span class="t-muted">0 unmitigated vulnerabilities detected.</span>`,
            'verify-certs': `<span class="t-green">✔ Verified Cisco NetAcad &amp; Cloud Credentials (${netacadCount + 1} total):</span><br>` +
                ((window.portfolioData && portfolioData.netacadCertsList)
                    ? portfolioData.netacadCertsList.slice(0, 6).map(c => `&bull; <strong>${c.title}</strong> (${c.date})`).join('<br>') + `<br><span class="t-muted">Type <code>cd certifications</code> to inspect all ${netacadCount} certificates.</span>`
                    : `&bull; CyberOps Associate &bull; Ethical Hacker &bull; Network Defense`),
            about: `<span class="t-green">Roldan Gaspar</span> — Software Engineer, AI builder, and Cybersecurity enthusiast based in Pampanga, Philippines.`,
            contact: `<span class="t-green">📧</span> gaspar26roldan@gmail.com<br>
                      <span class="t-green">🐙</span> github.com/RoldanGaspar<br>
                      <span class="t-green">💼</span> linkedin.com/in/roldangaspar`,
            stack: `<span class="t-green">Languages:</span> TypeScript, JavaScript, Python, Swift, SQL<br>
                    <span class="t-green">Frontend:</span> React, Next.js, Vanilla JS SPA, CSS Tokens<br>
                    <span class="t-green">Security &amp; Cloud:</span> Cisco CyberOps, Supabase RLS, AWS, Vercel`,
            projects: `<span class="t-green">Tarsi</span> — Offline-First Budget Tracker<br>
                       <span class="t-green">AWarden-A</span> — Windows AppLocker Defense &amp; Credential Security<br>
                       <span class="t-green">POS &amp; Inventory System</span> — Full-Stack Retail Suite`,
            whoami: `<span class="t-green">User:</span> operator@roldangaspar.dev<br>
                     <span class="t-green">Location:</span> Pampanga, Philippines 📍<br>
                     <span class="t-green">Clearance:</span> Zero-Trust Verified`,
            matrix: `<span class="t-green">🟢 Matrix telemetry stream initialized:</span><br><code style="letter-spacing:2px;color:var(--status-ok);">01000011 01011001 01000010 01000101 01010010 01001111 01010000 01010011</code>`,
            game: `<span class="t-green">🎮 Launching 2D Dev Lounge...</span>`,
            theme: `<span class="t-green">🌗 Theme toggled!</span>`,
            sudo: `<span class="t-red">sudo:</span> incident logged to SIEM telemetry. Nice try! 🛡️`,
            clear: 'CLEAR'
        };
        
        const thinkingEl = document.createElement('div');
        thinkingEl.className = 'terminal-line';
        thinkingEl.innerHTML = `<span class="t-muted">&gt; ${safeEcho}</span><br><span class="t-thinking">executing...</span>`;
        output.appendChild(thinkingEl);
        output.scrollTop = output.scrollHeight;
        
        setTimeout(() => {
            if (cmd === 'clear') {
                output.innerHTML = '';
                return;
            }

            if (cmd === 'game') {
                closeModal();
                setTimeout(() => openCommunityModal(), 300);
                return;
            }

            if (cmd === 'theme') {
                const themeBtn = document.querySelector('.theme-btn:not(.active)');
                if (themeBtn) themeBtn.click();
            }

            if (cmd.startsWith('cat ')) {
                const fileName = cmd.replace('cat ', '').trim();
                const fileContent = virtualFiles[fileName] || `<span class="t-red">cat:</span> ${escapeTerminalText(fileName)}: No such file. Try <code>ls</code>.`;
                thinkingEl.innerHTML = `<span class="t-muted">&gt; ${safeEcho}</span><br>${fileContent}`;
                output.scrollTop = output.scrollHeight;
                return;
            }

            if (cmd.startsWith('cd ')) {
                const target = cmd.replace('cd ', '').replace(/^\/+/, '').trim();
                const validRoutes = ['projects', 'blog', 'cyber-lab', 'audio', 'certifications', 'stack', 'experience', 'shop', 'gear', 'resources'];
                if (target === '' || target === '~' || target === 'home') {
                    closeModal();
                    window.location.hash = '#/';
                    return;
                }
                if (validRoutes.includes(target)) {
                    closeModal();
                    window.location.hash = '#/' + target;
                    return;
                }
                thinkingEl.innerHTML = `<span class="t-muted">&gt; ${safeEcho}</span><br><span class="t-red">cd:</span> no such route "${escapeTerminalText(target)}".`;
                output.scrollTop = output.scrollHeight;
                return;
            }

            const response = commands[cmd] || `<span class="t-red">Unknown command:</span> "${safeEcho}". Type <code>help</code> for available commands.`;
            thinkingEl.innerHTML = `<span class="t-muted">&gt; ${safeEcho}</span><br>${response}`;
            output.scrollTop = output.scrollHeight;
        }, 280);
    }

    function openTypingModal() {
        const words = ['become', 'school', 'call', 'consider', 'feel', 'both', 'well', 'program', 'just', 'much', 'own', 'system', 'state', 'should', 'between', 'each', 'life', 'people', 'under', 'work', 'build', 'think', 'great', 'code', 'design', 'create', 'learn', 'focus', 'ship', 'craft'];
        const shuffled = words.sort(() => Math.random() - 0.5).slice(0, 20);
        const wordSpans = shuffled.map((w, i) => `<span class="typing-word" data-idx="${i}">${w}</span>`).join(' ');
        let timerInterval = null;
        
        openModal(`
            <div class="typing-modal fade-in">
                <div class="typing-stats">
                    <div><span id="wpm-val">0</span> WPM</div>
                    <div><span id="acc-val">100</span>% ACC</div>
                    <div><span id="time-val">0</span>s TIME</div>
                </div>
                <div class="typing-text" id="typing-display">${wordSpans}</div>
                <input type="text" id="typing-input" class="typing-hidden-input" autofocus>
                <p class="typing-hint">Start typing to begin the test...</p>
            </div>
        `, () => {
            if (timerInterval) clearInterval(timerInterval);
        });
        
        const input = document.getElementById('typing-input');
        const display = document.getElementById('typing-display');
        const wpmEl = document.getElementById('wpm-val');
        const accEl = document.getElementById('acc-val');
        const timeEl = document.getElementById('time-val');
        
        if (!input) return;
        setTimeout(() => input.focus(), 100);
        
        const typingModal = contentArea.querySelector('.typing-modal');
        if (typingModal) {
            typingModal.addEventListener('click', () => input.focus());
        }
        
        let wordIndex = 0;
        let startTime = null;
        let correctWords = 0;
        let totalAttempted = 0;
        
        const wordEls = display.querySelectorAll('.typing-word');
        if (wordEls[0]) wordEls[0].classList.add('current');
        
        input.addEventListener('input', () => {
            if (!startTime) {
                startTime = Date.now();
                timerInterval = setInterval(() => {
                    const elapsed = Math.floor((Date.now() - startTime) / 1000);
                    timeEl.textContent = elapsed;
                }, 100);
            }
            if (window.playSound) window.playSound('key');
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                const typed = input.value.trim();
                input.value = '';
                
                if (wordIndex >= shuffled.length) return;
                
                totalAttempted++;
                const currentWordEl = wordEls[wordIndex];
                
                if (typed === shuffled[wordIndex]) {
                    correctWords++;
                    currentWordEl.classList.add('correct');
                } else {
                    currentWordEl.classList.add('incorrect');
                }
                currentWordEl.classList.remove('current');
                
                wordIndex++;
                
                const elapsed = (Date.now() - startTime) / 1000 / 60;
                const wpm = Math.round(correctWords / Math.max(elapsed, 0.01));
                const acc = totalAttempted > 0 ? Math.round((correctWords / totalAttempted) * 100) : 100;
                wpmEl.textContent = wpm;
                accEl.textContent = acc;
                
                if (wordIndex < shuffled.length) {
                    wordEls[wordIndex].classList.add('current');
                } else {
                    clearInterval(timerInterval);
                    input.disabled = true;
                    const hint = contentArea.querySelector('.typing-hint');
                    if (hint) hint.textContent = `Done! ${wpm} WPM at ${acc}% accuracy. Press Escape to close.`;
                }
            }
        });
    }

    function openCommunityModal() {
        const liveCount = Math.max(1, Number(window.currentLiveViewers) || 1);
        const liveText = `${liveCount} ${liveCount === 1 ? 'Visitor' : 'Visitors'} Live`;
        const savedName = (localStorage.getItem('rg_lounge_name') || 'Roldan (You)').slice(0, 18);
        const savedColor = localStorage.getItem('rg_lounge_color') || '#22d3ee';
        const suitColors = ['#22d3ee', '#a855f7', '#10b981', '#f59e0b', '#ec4899'];

        openModal(`
            <div class="community-modal fade-in">
                <div class="game-header">
                    <div class="game-title">
                        <i class="ph-fill ph-cube-transparent"></i> 
                        <span>3D Cyber-Loft Lounge</span>
                        <span class="game-badge-3d">ISO-3D v2.0</span>
                    </div>
                    <div class="game-online" style="display:flex; align-items:center; gap:10px;">
                        <button type="button" id="lounge-open-guestbook-btn" title="Open Developer Guestbook">
                            <i class="ph ph-book-bookmark"></i> Guestbook
                        </button>
                        <span style="display:inline-flex; align-items:center; gap:6px;">
                            <span style="background:var(--status-ok); width:8px; height:8px; border-radius:50%; display:inline-block;"></span>
                            <span id="lounge-online-count">${liveText}</span>
                        </span>
                    </div>
                </div>

                <div class="lounge-hud-bar">
                    <div class="lounge-hud-group">
                        <button type="button" class="lounge-hud-btn" id="lounge-cam-left" title="Rotate 3D Camera Left (Q)">
                            <i class="ph ph-arrow-counter-clockwise"></i> Rotate Q
                        </button>
                        <button type="button" class="lounge-hud-btn" id="lounge-cam-right" title="Rotate 3D Camera Right (E)">
                            <i class="ph ph-arrow-clockwise"></i> Rotate E
                        </button>
                        <button type="button" class="lounge-hud-btn" id="lounge-jump-btn" title="Jump (Space)">
                            <i class="ph ph-arrow-fat-lines-up"></i> Jump
                        </button>
                        <div class="lounge-identity-group" title="Customize your 3D Visitor Name & Suit Color">
                            <i class="ph ph-user-circle" style="color:var(--accent-cyan);"></i>
                            <input type="text" id="lounge-player-name" class="lounge-name-input" value="${escapeTerminalText(savedName)}" maxlength="18" placeholder="Your nickname">
                            ${suitColors.map(c => `<button type="button" class="lounge-color-dot ${c === savedColor ? 'active' : ''}" data-color="${c}" style="background:${c};" aria-label="Suit color ${c}"></button>`).join('')}
                        </div>
                    </div>
                    <div class="lounge-hud-group">
                        <button type="button" class="lounge-hud-btn lounge-emote-btn" data-emote="👋 Yo!">👋</button>
                        <button type="button" class="lounge-hud-btn lounge-emote-btn" data-emote="🚀 Shipping!">🚀</button>
                        <button type="button" class="lounge-hud-btn lounge-emote-btn" data-emote="☕ Espresso!">☕</button>
                        <button type="button" class="lounge-hud-btn lounge-emote-btn" data-emote="🛡️ Secured!">🛡️</button>
                        <button type="button" class="lounge-hud-btn" id="lounge-chat-drawer-toggle" title="Toggle Live Chat Feed">
                            <i class="ph ph-chat-centered-text"></i> Chat <span class="lounge-chat-badge" id="lounge-chat-badge">0</span>
                        </button>
                    </div>
                </div>
                
                <div class="game-viewport">
                    <div class="lounge-station-banner" id="lounge-station-banner">
                        <div class="lounge-station-meta">
                            <span id="lounge-station-icon">💻</span>
                            <div>
                                <strong id="lounge-station-name">AI & Dev Rig</strong>
                                <span id="lounge-station-desc" style="color:#94a3b8; margin-left:6px;">Press [F] or click to interact</span>
                            </div>
                        </div>
                        <button type="button" class="lounge-station-action-btn" id="lounge-station-action-btn">Interact [F]</button>
                    </div>
                    <canvas id="game-canvas" width="680" height="382"></canvas>
                    <div class="lounge-chat-drawer" id="lounge-chat-drawer" aria-hidden="true">
                        <div class="lounge-drawer-header">
                            <span class="lounge-drawer-title"><i class="ph ph-chat-centered-dots" style="color:var(--accent-cyan);"></i> Cyber-Loft Live Feed</span>
                            <button type="button" class="lounge-drawer-close" id="lounge-chat-drawer-close" aria-label="Close Chat Feed">✕</button>
                        </div>
                        <div class="lounge-drawer-feed" id="lounge-chat-drawer-feed">
                            <div class="lounge-drawer-empty">No broadcasts yet.<br>Chat below or tap an emote!</div>
                        </div>
                    </div>
                    <div class="lounge-station-bar">
                        <button type="button" class="lounge-station-chip" data-station="dev-rig">💻 AI Rig</button>
                        <button type="button" class="lounge-station-chip" data-station="soc-rack">🛡️ SOC Rack</button>
                        <button type="button" class="lounge-station-chip" data-station="espresso-bar">☕ Lo-Fi Bar</button>
                        <button type="button" class="lounge-station-chip" data-station="arcade-guestbook">🕹️ Arcade</button>
                    </div>
                    <div class="game-mobile-controls">
                        <button class="dpad-btn up" data-dir="up">▲</button>
                        <div class="dpad-middle">
                            <button class="dpad-btn left" data-dir="left">◀</button>
                            <button class="dpad-btn right" data-dir="right">▶</button>
                        </div>
                        <button class="dpad-btn down" data-dir="down">▼</button>
                    </div>
                </div>
                
                <div class="game-chat-bar">
                    <input type="text" id="game-chat-input" placeholder="Say something in 3D space (broadcasts live to online visitors)..." maxlength="60">
                    <button id="game-send-btn">Send <i class="ph-fill ph-paper-plane-right"></i></button>
                </div>
                
                <p class="game-hint"><strong>WASD / Arrows</strong> or <strong>Click Floor/Stations</strong> to walk &bull; <strong>Space</strong> Jump &bull; <strong>Q / E</strong> Rotate 3D Diorama &bull; Press <strong>F</strong> near stations!</p>
            </div>
        `);

        const canvas = document.getElementById('game-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const chatInput = document.getElementById('game-chat-input');
        const nameInput = document.getElementById('lounge-player-name');
        const sendBtn = document.getElementById('game-send-btn');
        const stationBanner = document.getElementById('lounge-station-banner');
        const stationIconEl = document.getElementById('lounge-station-icon');
        const stationNameEl = document.getElementById('lounge-station-name');
        const stationDescEl = document.getElementById('lounge-station-desc');
        const stationActionBtn = document.getElementById('lounge-station-action-btn');
        const chatDrawer = document.getElementById('lounge-chat-drawer');
        const chatDrawerToggle = document.getElementById('lounge-chat-drawer-toggle');
        const chatDrawerClose = document.getElementById('lounge-chat-drawer-close');
        const chatDrawerFeed = document.getElementById('lounge-chat-drawer-feed');
        const chatBadge = document.getElementById('lounge-chat-badge');
        let unreadChatCount = 0;
        let isChatDrawerOpen = false;

        function toggleChatDrawer(forceOpen) {
            isChatDrawerOpen = typeof forceOpen === 'boolean' ? forceOpen : !isChatDrawerOpen;
            if (chatDrawer) {
                chatDrawer.classList.toggle('active', isChatDrawerOpen);
                chatDrawer.setAttribute('aria-hidden', String(!isChatDrawerOpen));
            }
            if (isChatDrawerOpen) {
                unreadChatCount = 0;
                if (chatBadge) {
                    chatBadge.textContent = '0';
                    chatBadge.classList.remove('unread');
                }
            }
        }

        if (chatDrawerToggle) {
            chatDrawerToggle.addEventListener('click', () => toggleChatDrawer());
        }
        if (chatDrawerClose) {
            chatDrawerClose.addEventListener('click', () => toggleChatDrawer(false));
        }

        function appendChatDrawerMessage(author, color, text, isAi = false) {
            if (!chatDrawerFeed || !text) return;
            const emptyNotice = chatDrawerFeed.querySelector('.lounge-drawer-empty');
            if (emptyNotice) emptyNotice.remove();

            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const row = document.createElement('div');
            row.className = 'lounge-msg-row';
            row.innerHTML = `
                <div class="lounge-msg-meta">
                    <span class="lounge-msg-author" style="color:${color || 'var(--accent-cyan)'}">
                        <span class="lounge-msg-dot" style="background:${color || 'var(--accent-cyan)'}"></span>
                        ${escapeTerminalText(author)}
                    </span>
                    <span class="lounge-msg-time">${timeStr}</span>
                </div>
                <div class="lounge-msg-body">${escapeTerminalText(text)}</div>
            `;
            chatDrawerFeed.appendChild(row);
            chatDrawerFeed.scrollTop = chatDrawerFeed.scrollHeight;

            if (!isChatDrawerOpen) {
                unreadChatCount++;
                if (chatBadge) {
                    chatBadge.textContent = unreadChatCount > 99 ? '99+' : String(unreadChatCount);
                    chatBadge.classList.add('unread');
                }
            }
        }

        // High-DPI Retina Canvas Scaling
        const modalArea = canvas.closest('.modal-content-area');
        const maxAvailWidth = modalArea ? (modalArea.clientWidth - 4) : (window.innerWidth - 48);
        const cssWidth = Math.min(696, Math.max(300, maxAvailWidth));
        const cssHeight = Math.round(cssWidth * (9 / 16));
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);
        ctx.scale(dpr, dpr);

        let animationFrameId = null;
        let isDisposed = false;

        // 3D Isometric Camera & World Config
        const WORLD_LIMIT = 144;
        const FLOOR_SIZE = 160;
        let camAngle = Math.PI * 0.25;
        let targetCamAngle = camAngle;
        const isoScale = Math.min(cssWidth, cssHeight) / 365;
        const zScale = isoScale * 0.88;
        const centerX = cssWidth * 0.5;
        const centerY = cssHeight * 0.58;

        function project3D(wx, wy, wz = 0) {
            const cosA = Math.cos(camAngle);
            const sinA = Math.sin(camAngle);
            const rx = wx * cosA - wy * sinA;
            const ry = wx * sinA + wy * cosA;
            return {
                x: centerX + (rx - ry) * isoScale,
                y: centerY + (rx + ry) * isoScale * 0.52 - wz * zScale,
                depth: rx + ry + wz * 0.05
            };
        }

        function unprojectFloor(sx, sy) {
            const cosA = Math.cos(camAngle);
            const sinA = Math.sin(camAngle);
            const dx = (sx - centerX) / isoScale;
            const dy = (sy - centerY) / (isoScale * 0.52);
            const rx = 0.5 * (dx + dy);
            const ry = 0.5 * (dy - dx);
            return {
                wx: rx * cosA + ry * sinA,
                wy: -rx * sinA + ry * cosA
            };
        }

        // Draw an extruded 3D axis-aligned prism in world space
        function drawIsoBox(cx, cy, z0, w, d, h, palette) {
            const hw = w / 2;
            const hd = d / 2;
            const corners = [
                { x: cx - hw, y: cy - hd },
                { x: cx + hw, y: cy - hd },
                { x: cx + hw, y: cy + hd },
                { x: cx - hw, y: cy + hd }
            ];
            const topPts = corners.map(c => project3D(c.x, c.y, z0 + h));
            const botPts = corners.map(c => project3D(c.x, c.y, z0));

            for (let i = 0; i < 4; i++) {
                const next = (i + 1) % 4;
                if (topPts[next].x < topPts[i].x) {
                    ctx.beginPath();
                    ctx.moveTo(topPts[i].x, topPts[i].y);
                    ctx.lineTo(topPts[next].x, topPts[next].y);
                    ctx.lineTo(botPts[next].x, botPts[next].y);
                    ctx.lineTo(botPts[i].x, botPts[i].y);
                    ctx.closePath();
                    ctx.fillStyle = (i % 2 === 0) ? palette.sideA : palette.sideB;
                    ctx.fill();
                    if (palette.stroke) {
                        ctx.strokeStyle = palette.stroke;
                        ctx.lineWidth = 0.9;
                        ctx.stroke();
                    }
                }
            }

            ctx.beginPath();
            ctx.moveTo(topPts[0].x, topPts[0].y);
            for (let i = 1; i < 4; i++) ctx.lineTo(topPts[i].x, topPts[i].y);
            ctx.closePath();
            ctx.fillStyle = palette.top;
            ctx.fill();
            if (palette.stroke) {
                ctx.strokeStyle = palette.stroke;
                ctx.lineWidth = 0.9;
                ctx.stroke();
            }
        }

        // 4 Interactive 3D Stations in the Cyber-Loft
        const stations = [
            {
                id: 'dev-rig',
                icon: '💻',
                name: 'AI & Full-Stack Rig',
                desc: 'Inspect Roldan\'s Tech Stack & AI Harness tools',
                btnLabel: 'Open Stack [F]',
                wx: -104,
                wy: -104,
                interactWx: -66,
                interactWy: -66,
                w: 54,
                d: 40,
                h: 22,
                accent: '#38bdf8',
                triggerAction: () => {
                    cleanupAndClose();
                    window.location.hash = '#/stack';
                }
            },
            {
                id: 'soc-rack',
                icon: '🛡️',
                name: 'SOC & NetAcad Defense Rack',
                desc: 'Launch live interactive firewall & packet simulator',
                btnLabel: 'Launch Cyber Lab [F]',
                wx: 104,
                wy: -104,
                interactWx: 66,
                interactWy: -66,
                w: 48,
                d: 44,
                h: 50,
                accent: '#10b981',
                triggerAction: () => {
                    cleanupAndClose();
                    window.location.hash = '#/cyber-lab';
                }
            },
            {
                id: 'espresso-bar',
                icon: '☕',
                name: 'Lo-Fi & Espresso Bar',
                desc: 'Grab virtual espresso & toggle ambient Lo-Fi soundscape',
                btnLabel: 'Brew & Play Lo-Fi [F]',
                wx: -104,
                wy: 104,
                interactWx: -66,
                interactWy: 66,
                w: 54,
                d: 42,
                h: 24,
                accent: '#f59e0b',
                triggerAction: () => {
                    if (window.setSoundscape) window.setSoundscape('lofi');
                    player.message = '☕ Brewed fresh espresso + Lo-Fi beats!';
                    player.msgTime = Date.now() + 4200;
                    player.vz = 5.8;
                    broadcastMyState(true);
                }
            },
            {
                id: 'arcade-guestbook',
                icon: '🕹️',
                name: 'Guestbook Arcade Kiosk',
                desc: 'Read community notes or sign Roldan\'s Supabase Guestbook',
                btnLabel: 'Open Guestbook [F]',
                wx: 104,
                wy: 104,
                interactWx: 66,
                interactWy: 66,
                w: 44,
                d: 44,
                h: 46,
                accent: '#a855f7',
                triggerAction: () => {
                    cleanupAndClose();
                    setTimeout(() => {
                        if (window.openGuestbookModal) window.openGuestbookModal();
                    }, 180);
                }
            }
        ];

        let activeNearStation = null;

        const player = {
            id: 'local',
            name: savedName,
            wx: 0,
            wy: 64,
            wz: 0,
            vz: 0,
            facing: -Math.PI * 0.5,
            stride: 0,
            color: savedColor,
            speed: 2.4,
            targetWx: null,
            targetWy: null,
            message: 'Welcome to the 3D Cyber-Loft v2! 🚀',
            msgTime: Date.now() + 4200,
            isPlayer: true
        };

        // Each AI engineer has a home quadrant so they don't pile up in the center
        const aiAvatars = [
            { id: 'ai-1', name: 'Alex · AI Eng', homeWx: -64, homeWy: -58, wx: -64, wy: -58, wz: 0, vz: 0, facing: 0.4, stride: 0, color: '#a855f7', targetWx: -72, targetWy: -52, message: 'Triple-monitor AI harness setup 💻', msgTime: Date.now() + 3400 },
            { id: 'ai-2', name: 'Sophia · SecOps', homeWx: 64, homeWy: -58, wx: 64, wy: -58, wz: 0, vz: 0, facing: 2.1, stride: 1.5, color: '#10b981', targetWx: 72, targetWy: -54, message: 'SOC telemetry racks all green 🛡️', msgTime: Date.now() + 5200 },
            { id: 'ai-3', name: 'Kenji · Creative', homeWx: -64, homeWy: 62, wx: -64, wy: 62, wz: 0, vz: 0, facing: -1.2, stride: 3.1, color: '#f59e0b', targetWx: -70, targetWy: 54, message: 'Fresh espresso at the SW bar ☕', msgTime: Date.now() + 2600 },
            { id: 'ai-4', name: 'Elena · Indie', homeWx: 64, homeWy: 62, wx: 64, wy: 62, wz: 0, vz: 0, facing: -2.4, stride: 4.2, color: '#ec4899', targetWx: 70, targetWy: 54, message: 'Check out the Guestbook Arcade! 🕹️', msgTime: Date.now() + 4600 }
        ];

        // Real-time remote visitors map (from Supabase Broadcast)
        const remotePeers = new Map();
        let lastBroadcastAt = 0;

        function broadcastMyState(force = false) {
            const now = Date.now();
            if (!force && now - lastBroadcastAt < 120) return;
            lastBroadcastAt = now;
            if (window.broadcastLoungeState) {
                window.broadcastLoungeState({
                    name: player.name,
                    color: player.color,
                    wx: Math.round(player.wx),
                    wy: Math.round(player.wy),
                    wz: Math.round(player.wz),
                    facing: Number(player.facing.toFixed(2)),
                    message: Date.now() < player.msgTime ? player.message : '',
                    ts: now
                });
            }
        }

        if (window.subscribeLoungeBroadcast) {
            window.subscribeLoungeBroadcast((payload) => {
                if (!payload || !payload.key || payload.key === window.rgPresenceKey) return;
                const peerId = payload.key;
                const shortTag = peerId.slice(-4).toUpperCase();
                const existing = remotePeers.get(peerId) || {
                    id: peerId,
                    name: `Visitor #${shortTag}`,
                    wx: 0,
                    wy: 45,
                    wz: 0,
                    facing: 0,
                    stride: 0,
                    color: '#38bdf8',
                    message: '',
                    msgTime: 0
                };
                if (payload.name && typeof payload.name === 'string') {
                    existing.name = payload.name.trim().slice(0, 18) || existing.name;
                }
                if (payload.color && suitColors.includes(payload.color)) {
                    existing.color = payload.color;
                }
                existing.wx = Number(payload.wx) || 0;
                existing.wy = Number(payload.wy) || 0;
                existing.wz = Number(payload.wz) || 0;
                existing.facing = Number(payload.facing) || 0;
                existing.stride += 0.35;
                if (payload.message) {
                    const msg = String(payload.message).slice(0, 60);
                    existing.message = msg;
                    existing.msgTime = Date.now() + 4500;
                    appendChatDrawerMessage(existing.name, existing.color, msg, false);
                }
                existing.lastSeen = Date.now();
                remotePeers.set(peerId, existing);
            });
        }

        // Bind Visitor Identity Customizer
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                const val = nameInput.value.trim().slice(0, 18);
                player.name = val || 'Roldan (You)';
                localStorage.setItem('rg_lounge_name', player.name);
                broadcastMyState(true);
            });
        }

        document.querySelectorAll('.lounge-color-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const c = dot.getAttribute('data-color');
                if (c) {
                    player.color = c;
                    localStorage.setItem('rg_lounge_color', c);
                    document.querySelectorAll('.lounge-color-dot').forEach(d => d.classList.remove('active'));
                    dot.classList.add('active');
                    if (window.playSound) window.playSound('click');
                    broadcastMyState(true);
                }
            });
        });

        // Station Quick-Jump Chips
        let clickRing = null;
        document.querySelectorAll('.lounge-station-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const stId = chip.getAttribute('data-station');
                const st = stations.find(s => s.id === stId);
                if (!st) return;
                if (activeNearStation === st) {
                    st.triggerAction();
                    return;
                }
                player.targetWx = st.interactWx;
                player.targetWy = st.interactWy;
                clickRing = { wx: st.interactWx, wy: st.interactWy, alpha: 1, color: st.accent };
                if (window.playSound) window.playSound('click');
            });
        });

        // Ambient floating 3D particles (holo dust & coffee steam)
        const particles = Array.from({ length: 20 }, (_, i) => ({
            wx: (Math.random() - 0.5) * 250,
            wy: (Math.random() - 0.5) * 250,
            wz: Math.random() * 58 + 6,
            speedZ: 0.22 + Math.random() * 0.24,
            color: i % 3 === 0 ? '#22d3ee' : (i % 3 === 1 ? '#a855f7' : '#34d399')
        }));

        const randomQuotes = [
            'Cutaway 3D walls auto-switch on Q/E rotate!',
            'Click any station chip to walk right to it ⚡',
            'Walk near any corner station & press F!',
            'Customize your nickname & suit color above 🎨',
            'Supabase Realtime syncs across live tabs 🌐',
            'Check out the 3-bay SOC Server Rack 🛡️',
            'Try jumping over the holo-table with Space!'
        ];

        const quoteInterval = setInterval(() => {
            const randomAi = aiAvatars[Math.floor(Math.random() * aiAvatars.length)];
            const quote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
            randomAi.message = quote;
            randomAi.msgTime = Date.now() + 4000;
            appendChatDrawerMessage(randomAi.name, randomAi.color, quote, true);
            // Patrol within their home quadrant + occasional visit near center ring
            const roamRadius = 26;
            randomAi.targetWx = randomAi.homeWx + (Math.random() - 0.5) * roamRadius * 2;
            randomAi.targetWy = randomAi.homeWy + (Math.random() - 0.5) * roamRadius * 2;
            if (Math.random() < 0.3 && randomAi.wz === 0) {
                randomAi.vz = 4.5;
            }
        }, 4200);

        const keys = {};

        function triggerJump() {
            if (player.wz <= 0.1) {
                player.vz = 6.2;
                if (window.playSound) window.playSound('click');
                broadcastMyState(true);
            }
        }

        function handleKeyDown(e) {
            if (document.activeElement === chatInput || document.activeElement === nameInput) return;
            keys[e.code] = true;
            if (e.code === 'Space') {
                e.preventDefault();
                triggerJump();
            } else if (e.code === 'KeyQ') {
                targetCamAngle -= Math.PI * 0.25;
                if (window.playSound) window.playSound('click');
            } else if (e.code === 'KeyE') {
                targetCamAngle += Math.PI * 0.25;
                if (window.playSound) window.playSound('click');
            } else if (e.code === 'KeyF' && activeNearStation) {
                e.preventDefault();
                if (window.playSound) window.playSound('open');
                activeNearStation.triggerAction();
            }
        }

        function handleKeyUp(e) {
            keys[e.code] = false;
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const camLeftBtn = document.getElementById('lounge-cam-left');
        const camRightBtn = document.getElementById('lounge-cam-right');
        const jumpBtn = document.getElementById('lounge-jump-btn');

        if (camLeftBtn) {
            camLeftBtn.addEventListener('click', () => {
                targetCamAngle -= Math.PI * 0.25;
                if (window.playSound) window.playSound('click');
            });
        }
        if (camRightBtn) {
            camRightBtn.addEventListener('click', () => {
                targetCamAngle += Math.PI * 0.25;
                if (window.playSound) window.playSound('click');
            });
        }
        if (jumpBtn) {
            jumpBtn.addEventListener('click', triggerJump);
        }

        document.querySelectorAll('.lounge-emote-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const emote = btn.getAttribute('data-emote') || '👋';
                player.message = emote;
                player.msgTime = Date.now() + 4000;
                appendChatDrawerMessage(player.name, player.color, emote, false);
                triggerJump();
                broadcastMyState(true);
            });
        });

        if (stationActionBtn) {
            stationActionBtn.addEventListener('click', () => {
                if (activeNearStation) {
                    if (window.playSound) window.playSound('open');
                    activeNearStation.triggerAction();
                }
            });
        }

        // Click / Tap on 3D Floor or Station to Walk / Interact
        canvas.addEventListener('pointerdown', (e) => {
            const rect = canvas.getBoundingClientRect();
            const sx = (e.clientX - rect.left) * (cssWidth / rect.width);
            const sy = (e.clientY - rect.top) * (cssHeight / rect.height);
            const pt = unprojectFloor(sx, sy);

            // Check if user clicked directly on one of the 4 stations
            for (let i = 0; i < stations.length; i++) {
                const st = stations[i];
                if (Math.hypot(pt.wx - st.wx, pt.wy - st.wy) < 42) {
                    if (activeNearStation === st) {
                        if (window.playSound) window.playSound('open');
                        st.triggerAction();
                    } else {
                        player.targetWx = st.interactWx;
                        player.targetWy = st.interactWy;
                        clickRing = { wx: st.interactWx, wy: st.interactWy, alpha: 1, color: st.accent };
                        if (window.playSound) window.playSound('click');
                    }
                    return;
                }
            }

            const clampedX = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, pt.wx));
            const clampedY = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, pt.wy));
            player.targetWx = clampedX;
            player.targetWy = clampedY;
            clickRing = { wx: clampedX, wy: clampedY, alpha: 1, color: '#22d3ee' };
            if (window.playSound) window.playSound('key');
        });

        document.querySelectorAll('.dpad-btn').forEach(btn => {
            const setDir = (active) => {
                const dir = btn.getAttribute('data-dir');
                if (dir === 'up') keys['KeyW'] = active;
                if (dir === 'left') keys['KeyA'] = active;
                if (dir === 'down') keys['KeyS'] = active;
                if (dir === 'right') keys['KeyD'] = active;
            };
            btn.addEventListener('mousedown', () => setDir(true));
            btn.addEventListener('mouseup', () => setDir(false));
            btn.addEventListener('touchstart', (e) => { e.preventDefault(); setDir(true); }, { passive: false });
            btn.addEventListener('touchend', (e) => { e.preventDefault(); setDir(false); }, { passive: false });
            btn.addEventListener('touchcancel', (e) => { e.preventDefault(); setDir(false); }, { passive: false });
        });

        function sendMessage() {
            const val = chatInput.value.trim();
            if (val) {
                player.message = val;
                player.msgTime = Date.now() + 5000;
                chatInput.value = '';
                appendChatDrawerMessage(player.name, player.color, val, false);
                if (window.playSound) window.playSound('click');
                broadcastMyState(true);
            }
        }

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        const loungeGbBtn = document.getElementById('lounge-open-guestbook-btn');
        if (loungeGbBtn) {
            loungeGbBtn.addEventListener('click', () => {
                cleanupAndClose();
                setTimeout(() => {
                    if (window.openGuestbookModal) window.openGuestbookModal();
                }, 180);
            });
        }

        // Draw Dynamic Cutaway 3D Back Walls (automatically selects the 2 farthest walls for any camera angle)
        function drawCutawayWalls(now) {
            const wallH = 66;
            const wallThick = 8;
            const candidateWalls = [
                { id: 'N', cx: 0, cy: -FLOOR_SIZE - wallThick / 2, w: FLOOR_SIZE * 2 + wallThick * 2, d: wallThick, midX: 0, midY: -FLOOR_SIZE },
                { id: 'S', cx: 0, cy: FLOOR_SIZE + wallThick / 2, w: FLOOR_SIZE * 2 + wallThick * 2, d: wallThick, midX: 0, midY: FLOOR_SIZE },
                { id: 'W', cx: -FLOOR_SIZE - wallThick / 2, cy: 0, w: wallThick, d: FLOOR_SIZE * 2 + wallThick * 2, midX: -FLOOR_SIZE, midY: 0 },
                { id: 'E', cx: FLOOR_SIZE + wallThick / 2, cy: 0, w: wallThick, d: FLOOR_SIZE * 2 + wallThick * 2, midX: FLOOR_SIZE, midY: 0 }
            ];

            candidateWalls.forEach(w => {
                w.depth = project3D(w.midX, w.midY, 0).depth;
            });
            candidateWalls.sort((a, b) => a.depth - b.depth);

            // Render the 2 back-most walls
            const backWalls = candidateWalls.slice(0, 2);
            backWalls.forEach((bw, idx) => {
                drawIsoBox(bw.cx, bw.cy, 0, bw.w, bw.d, wallH, {
                    top: '#1e293b',
                    sideA: '#0f172a',
                    sideB: '#111827',
                    stroke: 'rgba(56, 189, 248, 0.24)'
                });

                // Glowing neon cornice strip along top of cutaway wall
                drawIsoBox(bw.cx, bw.cy, wallH - 3, bw.w * 0.92, bw.d, 2.5, {
                    top: idx === 0 ? '#22d3ee' : '#a855f7',
                    sideA: idx === 0 ? '#0284c7' : '#7e22ce',
                    sideB: idx === 0 ? '#0369a1' : '#6b21a8'
                });

                // Architectural wall feature: Cyber Window on wall 0, LED Command Sign on wall 1
                if (idx === 0) {
                    const isHoriz = bw.w > bw.d;
                    drawIsoBox(
                        bw.cx,
                        bw.cy,
                        20,
                        isHoriz ? 86 : wallThick + 2,
                        isHoriz ? wallThick + 2 : 86,
                        32,
                        {
                            top: '#38bdf8',
                            sideA: 'rgba(14, 165, 233, 0.32)',
                            sideB: 'rgba(56, 189, 248, 0.25)',
                            stroke: 'rgba(56, 189, 248, 0.65)'
                        }
                    );
                } else {
                    const signPos = project3D(bw.midX * 0.94, bw.midY * 0.94, 42);
                    const pulse = (Math.sin(now * 0.005) + 1) * 0.5;
                    ctx.font = 'bold 9px monospace';
                    ctx.fillStyle = `rgba(167, 139, 250, ${0.65 + pulse * 0.35})`;
                    ctx.textAlign = 'center';
                    ctx.fillText('ROLDAN.OS // CYBER-LOFT', signPos.x, signPos.y);
                }
            });
        }

        // Draw 3D Floor Platform & Glowing Grid
        function drawIsoFloor(now) {
            drawIsoBox(0, 0, -16, FLOOR_SIZE * 2, FLOOR_SIZE * 2, 16, {
                top: '#0b1120',
                sideA: '#070b14',
                sideB: '#05080f',
                stroke: 'rgba(56, 189, 248, 0.32)'
            });

            // Subtle floor specular ambient pools under the 4 corner stations
            stations.forEach(st => {
                const sp = project3D(st.wx, st.wy, 0.2);
                const rad = ctx.createRadialGradient(sp.x, sp.y, 4, sp.x, sp.y, 48);
                rad.addColorStop(0, st.accent + '33');
                rad.addColorStop(1, 'transparent');
                ctx.fillStyle = rad;
                ctx.beginPath();
                ctx.ellipse(sp.x, sp.y, 48, 26, 0, 0, Math.PI * 2);
                ctx.fill();
            });

            // Isometric floor grid lines on z = 0
            ctx.lineWidth = 1;
            const step = 32;
            for (let g = -FLOOR_SIZE; g <= FLOOR_SIZE; g += step) {
                const p1 = project3D(g, -FLOOR_SIZE, 0);
                const p2 = project3D(g, FLOOR_SIZE, 0);
                ctx.strokeStyle = g === 0 ? 'rgba(34, 211, 238, 0.18)' : 'rgba(148, 163, 184, 0.07)';
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();

                const q1 = project3D(-FLOOR_SIZE, g, 0);
                const q2 = project3D(FLOOR_SIZE, g, 0);
                ctx.beginPath();
                ctx.moveTo(q1.x, q1.y);
                ctx.lineTo(q2.x, q2.y);
                ctx.stroke();
            }

            // Glowing floor circuit ring around center
            const ringPts = 28;
            const ringR = 42;
            ctx.beginPath();
            for (let i = 0; i <= ringPts; i++) {
                const a = (i / ringPts) * Math.PI * 2;
                const p = project3D(Math.cos(a) * ringR, Math.sin(a) * ringR, 0.5);
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            }
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.24 + 0.1 * Math.sin(now * 0.003)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Click-to-move target pulse
            if (clickRing && clickRing.alpha > 0.02) {
                const cp = project3D(clickRing.wx, clickRing.wy, 0.6);
                ctx.beginPath();
                ctx.ellipse(cp.x, cp.y, 13 * (1.2 - clickRing.alpha * 0.4), 6.5 * (1.2 - clickRing.alpha * 0.4), 0, 0, Math.PI * 2);
                ctx.strokeStyle = clickRing.color || '#22d3ee';
                ctx.globalAlpha = clickRing.alpha;
                ctx.lineWidth = 1.8;
                ctx.stroke();
                ctx.globalAlpha = 1;
                clickRing.alpha *= 0.92;
            }
        }

        // Draw Multi-Part 3D Station & Hologram Label
        function drawStation3D(st, now, isNear) {
            // Base glowing rug/pad on floor
            drawIsoBox(st.wx, st.wy, 0, st.w + 18, st.d + 18, 2, {
                top: isNear ? 'rgba(34, 211, 238, 0.25)' : 'rgba(15, 23, 42, 0.85)',
                sideA: '#0f172a',
                sideB: '#090d16',
                stroke: isNear ? st.accent : 'rgba(148, 163, 184, 0.24)'
            });

            if (st.id === 'dev-rig') {
                // Desk legs & main surface
                drawIsoBox(st.wx, st.wy - 4, 2, 50, 26, 16, {
                    top: '#1e293b',
                    sideA: '#0f172a',
                    sideB: '#111827',
                    stroke: isNear ? st.accent : 'rgba(255,255,255,0.15)'
                });
                // L-desk side wing
                drawIsoBox(st.wx - 16, st.wy + 12, 2, 18, 20, 16, {
                    top: '#1e293b',
                    sideA: '#0f172a',
                    sideB: '#111827'
                });
                // Left & Center ultrawide monitors
                drawIsoBox(st.wx - 10, st.wy - 8, 18, 16, 4, 13, {
                    top: '#38bdf8',
                    sideA: '#0284c7',
                    sideB: '#0c4a6e',
                    stroke: '#7dd3fc'
                });
                drawIsoBox(st.wx + 6, st.wy - 8, 18, 14, 4, 13, {
                    top: '#22d3ee',
                    sideA: '#0891b2',
                    sideB: '#164e63',
                    stroke: '#67e8f9'
                });
                // Glass RGB PC Tower
                drawIsoBox(st.wx + 18, st.wy + 2, 18, 9, 14, 17, {
                    top: '#312e81',
                    sideA: '#4c1d95',
                    sideB: '#1e1b4b',
                    stroke: '#a855f7'
                });
                // Ergonomic 3D Chair in front
                drawIsoBox(st.wx + 4, st.wy + 16, 2, 12, 12, 11, {
                    top: '#334155',
                    sideA: '#1e293b',
                    sideB: '#0f172a',
                    stroke: '#64748b'
                });
            } else if (st.id === 'soc-rack') {
                // 3 Server Rack Towers side-by-side
                [-14, 0, 14].forEach((offset, idx) => {
                    drawIsoBox(st.wx + offset, st.wy - 4, 2, 11, 24, 44, {
                        top: '#1e293b',
                        sideA: '#0f172a',
                        sideB: '#090d16',
                        stroke: isNear ? '#34d399' : 'rgba(52, 211, 153, 0.32)'
                    });
                    // Blinking telemetry blade strip
                    const pulse = (Math.sin(now * 0.009 + idx * 1.7) + 1) * 0.5;
                    drawIsoBox(st.wx + offset, st.wy - 3, 14 + idx * 8, 11.5, 24.5, 4, {
                        top: pulse > 0.45 ? '#10b981' : '#0284c7',
                        sideA: pulse > 0.45 ? '#059669' : '#0369a1',
                        sideB: '#064e3b'
                    });
                });
                // Angled Security Console in front
                drawIsoBox(st.wx, st.wy + 16, 2, 28, 12, 15, {
                    top: '#065f46',
                    sideA: '#064e3b',
                    sideB: '#022c22',
                    stroke: '#10b981'
                });
            } else if (st.id === 'espresso-bar') {
                // L-shaped Espresso Bar Counter
                drawIsoBox(st.wx, st.wy - 2, 2, 50, 22, 20, {
                    top: '#78350f',
                    sideA: '#451a03',
                    sideB: '#271206',
                    stroke: '#d97706'
                });
                // Dual-group Copper Espresso Machine
                drawIsoBox(st.wx - 10, st.wy - 4, 22, 20, 14, 13, {
                    top: '#f59e0b',
                    sideA: '#d97706',
                    sideB: '#92400e',
                    stroke: '#fde68a'
                });
                // Audio-reactive Lo-Fi Speaker Tower
                const beat = 1 + Math.sin(now * 0.012) * 2.5;
                drawIsoBox(st.wx + 16, st.wy - 4, 22, 11, 11, 18 + beat, {
                    top: '#1e293b',
                    sideA: '#0f172a',
                    sideB: '#334155',
                    stroke: '#38bdf8'
                });
                // 2 Barstools in front
                [-12, 6].forEach(bx => {
                    drawIsoBox(st.wx + bx, st.wy + 16, 2, 9, 9, 12, {
                        top: '#b45309',
                        sideA: '#78350f',
                        sideB: '#451a03'
                    });
                });
            } else if (st.id === 'arcade-guestbook') {
                // Upright Retro-Cyber Arcade Cabinet Base
                drawIsoBox(st.wx - 6, st.wy - 2, 2, 24, 24, 24, {
                    top: '#3b0764',
                    sideA: '#2e1065',
                    sideB: '#1e1b4b',
                    stroke: '#a855f7'
                });
                // Glowing CRT Screen & Upper Cabinet
                drawIsoBox(st.wx - 6, st.wy - 4, 26, 22, 18, 16, {
                    top: '#a855f7',
                    sideA: '#22d3ee',
                    sideB: '#4c1d95',
                    stroke: '#e879f9'
                });
                // Top Neon Marquee
                drawIsoBox(st.wx - 6, st.wy - 3, 42, 24, 20, 6, {
                    top: '#ec4899',
                    sideA: '#db2777',
                    sideB: '#9d174d',
                    stroke: '#fbcfe8'
                });
                // Lounge Sofa beside Arcade
                drawIsoBox(st.wx + 16, st.wy + 8, 2, 16, 26, 12, {
                    top: '#334155',
                    sideA: '#1e293b',
                    sideB: '#0f172a',
                    stroke: '#64748b'
                });
            }

            // Floating 3D Hologram Banner above station
            const hoverZ = st.h + 24 + Math.sin(now * 0.004 + st.wx) * 2.5;
            const topPos = project3D(st.wx, st.wy, hoverZ);
            const label = `${st.icon} ${st.name}`;
            ctx.font = 'bold 10px monospace';
            const tw = ctx.measureText(label).width + 14;
            const th = 20;

            ctx.fillStyle = isNear ? 'rgba(8, 20, 38, 0.95)' : 'rgba(11, 15, 25, 0.84)';
            ctx.beginPath();
            ctx.roundRect(topPos.x - tw / 2, topPos.y - th / 2, tw, th, 6);
            ctx.fill();
            ctx.strokeStyle = isNear ? st.accent : 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = isNear ? 1.6 : 1;
            ctx.stroke();

            ctx.fillStyle = isNear ? '#ffffff' : '#cbd5e1';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, topPos.x, topPos.y);
        }

        // Draw Central 3D Holographic Command Core
        function drawCenterHoloCore(now) {
            drawIsoBox(0, 0, 0, 38, 38, 15, {
                top: '#162032',
                sideA: '#0f172a',
                sideB: '#090d16',
                stroke: 'rgba(34, 211, 238, 0.42)'
            });

            const floatZ = 27 + Math.sin(now * 0.004) * 3.5;
            const pTop = project3D(0, 0, floatZ + 11);
            const pBot = project3D(0, 0, floatZ - 7);
            const r = 10.5;
            const rot = now * 0.0025;
            const corners = [0, 1, 2, 3].map(i => {
                const a = rot + i * Math.PI * 0.5;
                return project3D(Math.cos(a) * r, Math.sin(a) * r, floatZ);
            });

            ctx.strokeStyle = 'rgba(34, 211, 238, 0.85)';
            ctx.fillStyle = 'rgba(34, 211, 238, 0.14)';
            ctx.lineWidth = 1.2;

            for (let i = 0; i < 4; i++) {
                const next = (i + 1) % 4;
                ctx.beginPath();
                ctx.moveTo(pTop.x, pTop.y);
                ctx.lineTo(corners[i].x, corners[i].y);
                ctx.lineTo(corners[next].x, corners[next].y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(pBot.x, pBot.y);
                ctx.lineTo(corners[i].x, corners[i].y);
                ctx.stroke();
            }
        }

        // Queue of active speech bubbles for post-scene anti-overlap rendering
        const activeBubbles = [];

        // Draw 3D Articulated Voxel/Character Avatar
        function drawAvatar3D(ent) {
            const groundPos = project3D(ent.wx, ent.wy, 0);
            const shadowScale = Math.max(0.45, 1 - ent.wz / 60);

            ctx.beginPath();
            ctx.ellipse(groundPos.x, groundPos.y, 10.5 * shadowScale, 5.2 * shadowScale, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
            ctx.fill();

            if (ent.isPlayer) {
                ctx.beginPath();
                ctx.ellipse(groundPos.x, groundPos.y, 14 * shadowScale, 7 * shadowScale, 0, 0, Math.PI * 2);
                ctx.strokeStyle = ent.color || '#22d3ee';
                ctx.lineWidth = 1.6;
                ctx.stroke();
            }

            const bob = ent.wz > 0 ? 0 : Math.abs(Math.sin(ent.stride)) * 2.1;
            const baseZ = ent.wz + bob;

            const legOffset = Math.sin(ent.stride) * 2.4;
            const leftFoot = project3D(ent.wx - 3, ent.wy + legOffset, ent.wz);
            const rightFoot = project3D(ent.wx + 3, ent.wy - legOffset, ent.wz);
            const hipLeft = project3D(ent.wx - 3, ent.wy, baseZ + 7);
            const hipRight = project3D(ent.wx + 3, ent.wy, baseZ + 7);

            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 3.2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(hipLeft.x, hipLeft.y);
            ctx.lineTo(leftFoot.x, leftFoot.y);
            ctx.moveTo(hipRight.x, hipRight.y);
            ctx.lineTo(rightFoot.x, rightFoot.y);
            ctx.stroke();

            drawIsoBox(ent.wx, ent.wy, baseZ + 6, 12, 10, 13, {
                top: ent.color,
                sideA: ent.color,
                sideB: '#1e293b',
                stroke: ent.isPlayer ? '#ffffff' : 'rgba(255,255,255,0.38)'
            });

            const headPos = project3D(ent.wx, ent.wy, baseZ + 25);
            ctx.beginPath();
            ctx.arc(headPos.x, headPos.y, 7.2, 0, Math.PI * 2);
            ctx.fillStyle = '#f8fafc';
            ctx.fill();
            ctx.lineWidth = 1.6;
            ctx.strokeStyle = '#0f172a';
            ctx.stroke();

            const viewAngle = ent.facing - camAngle;
            const vx = Math.cos(viewAngle) * 3.2;
            const vy = Math.sin(viewAngle) * 1.8;
            ctx.fillStyle = ent.isPlayer ? ent.color : '#0f172a';
            ctx.beginPath();
            ctx.roundRect(headPos.x + vx - 4.2, headPos.y + vy - 2, 8.4, 3.6, 1.8);
            ctx.fill();

            ctx.font = ent.isPlayer ? 'bold 10px monospace' : '10px monospace';
            ctx.fillStyle = ent.isPlayer ? ent.color : '#cbd5e1';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(ent.name, groundPos.x, groundPos.y + 7);

            if (ent.message && Date.now() < ent.msgTime) {
                activeBubbles.push({
                    x: headPos.x,
                    y: headPos.y - 12,
                    text: ent.message,
                    speaker: ent.name.split('·')[0].trim(),
                    color: ent.color || '#22d3ee',
                    isPlayer: Boolean(ent.isPlayer)
                });
            }
        }

        // Render glassmorphic speech bubbles with vertical collision avoidance
        function renderSpeechBubblesPass() {
            if (activeBubbles.length === 0) return;
            const placedRects = [];

            // Sort so player bubble gets priority placement near head
            activeBubbles.sort((a, b) => (b.isPlayer ? 1 : 0) - (a.isPlayer ? 1 : 0));

            activeBubbles.forEach(b => {
                ctx.font = '10.5px monospace';
                const fullLabel = `${b.speaker}: ${b.text}`;
                const w = Math.min(cssWidth - 20, ctx.measureText(fullLabel).width + 18);
                const h = 22;
                let bx = Math.max(8, Math.min(cssWidth - w - 8, b.x - w / 2));
                let by = Math.max(8, b.y - h - 6);

                // Shift upward if overlapping an already-placed speech bubble
                for (let iter = 0; iter < 4; iter++) {
                    const hit = placedRects.find(r =>
                        bx < r.x + r.w + 4 &&
                        bx + w + 4 > r.x &&
                        by < r.y + r.h + 4 &&
                        by + h + 4 > r.y
                    );
                    if (hit) {
                        by = Math.max(6, hit.y - h - 5);
                    } else {
                        break;
                    }
                }

                placedRects.push({ x: bx, y: by, w, h });

                // Dark cyber-glass pill
                ctx.fillStyle = 'rgba(10, 15, 28, 0.92)';
                ctx.beginPath();
                ctx.roundRect(bx, by, w, h, 7);
                ctx.fill();
                ctx.strokeStyle = b.color;
                ctx.lineWidth = b.isPlayer ? 1.6 : 1.1;
                ctx.stroke();

                // Pointer triangle
                const ptrX = Math.max(bx + 8, Math.min(bx + w - 8, b.x));
                ctx.beginPath();
                ctx.moveTo(ptrX - 4, by + h);
                ctx.lineTo(ptrX + 4, by + h);
                ctx.lineTo(ptrX, by + h + 4);
                ctx.fillStyle = b.color;
                ctx.fill();

                ctx.fillStyle = '#f8fafc';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(fullLabel, bx + w / 2, by + h / 2);
            });
            activeBubbles.length = 0;
        }

        function collidesWithFurniture(wx, wy) {
            if (Math.hypot(wx, wy) < 26) return true;
            for (let i = 0; i < stations.length; i++) {
                const st = stations[i];
                if (Math.abs(wx - st.wx) < st.w * 0.56 && Math.abs(wy - st.wy) < st.d * 0.56) {
                    return true;
                }
            }
            return false;
        }

        function updatePhysicsAndAI() {
            camAngle += (targetCamAngle - camAngle) * 0.14;

            let inX = 0;
            let inY = 0;
            if (keys['KeyW'] || keys['ArrowUp']) inY -= 1;
            if (keys['KeyS'] || keys['ArrowDown']) inY += 1;
            if (keys['KeyA'] || keys['ArrowLeft']) inX -= 1;
            if (keys['KeyD'] || keys['ArrowRight']) inX += 1;

            if (inX !== 0 || inY !== 0) {
                player.targetWx = null;
                player.targetWy = null;
                const cosA = Math.cos(camAngle);
                const sinA = Math.sin(camAngle);
                const rx = inX + inY;
                const ry = inY - inX;
                const len = Math.hypot(rx, ry) || 1;
                const vx = ((rx / len) * cosA + (ry / len) * sinA) * player.speed;
                const vy = (-(rx / len) * sinA + (ry / len) * cosA) * player.speed;

                const nextX = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, player.wx + vx));
                const nextY = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, player.wy + vy));
                if (!collidesWithFurniture(nextX, player.wy)) player.wx = nextX;
                if (!collidesWithFurniture(player.wx, nextY)) player.wy = nextY;

                player.facing = Math.atan2(vy, vx);
                player.stride += 0.28;
                broadcastMyState(false);
            } else if (player.targetWx !== null && player.targetWy !== null) {
                const dx = player.targetWx - player.wx;
                const dy = player.targetWy - player.wy;
                const dist = Math.hypot(dx, dy);
                if (dist > 3) {
                    const vx = (dx / dist) * player.speed;
                    const vy = (dy / dist) * player.speed;
                    const nextX = player.wx + vx;
                    const nextY = player.wy + vy;
                    if (!collidesWithFurniture(nextX, nextY)) {
                        player.wx = nextX;
                        player.wy = nextY;
                        player.facing = Math.atan2(vy, vx);
                        player.stride += 0.28;
                        broadcastMyState(false);
                    } else {
                        player.targetWx = null;
                        player.targetWy = null;
                    }
                } else {
                    player.targetWx = null;
                    player.targetWy = null;
                }
            }

            if (player.wz > 0 || player.vz !== 0) {
                player.wz += player.vz;
                player.vz -= 0.45;
                if (player.wz <= 0) {
                    player.wz = 0;
                    player.vz = 0;
                }
            }

            // Proximity check to 4 interactive stations
            let foundStation = null;
            let bestDist = 68;
            for (let i = 0; i < stations.length; i++) {
                const d = Math.hypot(player.wx - stations[i].wx, player.wy - stations[i].wy);
                if (d < bestDist) {
                    bestDist = d;
                    foundStation = stations[i];
                }
            }
            if (foundStation !== activeNearStation) {
                activeNearStation = foundStation;
                if (stationBanner) {
                    if (activeNearStation) {
                        stationIconEl.textContent = activeNearStation.icon;
                        stationNameEl.textContent = activeNearStation.name;
                        stationDescEl.textContent = activeNearStation.desc;
                        stationActionBtn.textContent = activeNearStation.btnLabel;
                        stationBanner.classList.add('active');
                    } else {
                        stationBanner.classList.remove('active');
                    }
                }
            }

            // Update AI waypoint roaming + Boids social separation so they never crowd
            aiAvatars.forEach((ai, idx) => {
                let vx = 0;
                let vy = 0;
                const dx = ai.targetWx - ai.wx;
                const dy = ai.targetWy - ai.wy;
                const dist = Math.hypot(dx, dy);
                if (dist > 4) {
                    vx += (dx / dist) * 0.78;
                    vy += (dy / dist) * 0.78;
                }

                // Social repulsion from other AI avatars & player
                const others = [player, ...aiAvatars];
                others.forEach(other => {
                    if (other === ai) return;
                    const odx = ai.wx - other.wx;
                    const ody = ai.wy - other.wy;
                    const od = Math.hypot(odx, ody);
                    if (od > 0.1 && od < 38) {
                        const push = ((38 - od) / 38) * 0.9;
                        vx += (odx / od) * push;
                        vy += (ody / od) * push;
                    }
                });

                if (Math.hypot(vx, vy) > 0.08) {
                    const nx = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, ai.wx + vx));
                    const ny = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, ai.wy + vy));
                    if (!collidesWithFurniture(nx, ny)) {
                        ai.wx = nx;
                        ai.wy = ny;
                        ai.facing = Math.atan2(vy, vx);
                        ai.stride += 0.15;
                    }
                }

                if (ai.wz > 0 || ai.vz !== 0) {
                    ai.wz += ai.vz;
                    ai.vz -= 0.42;
                    if (ai.wz <= 0) {
                        ai.wz = 0;
                        ai.vz = 0;
                    }
                }
            });
        }

        function gameLoop(now = performance.now()) {
            if (isDisposed) return;

            updatePhysicsAndAI();

            const bgGrad = ctx.createRadialGradient(centerX, centerY * 0.85, 20, centerX, centerY, cssWidth * 0.75);
            bgGrad.addColorStop(0, '#0f172a');
            bgGrad.addColorStop(1, '#050811');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, cssWidth, cssHeight);

            // 1. Render 3D Floor Slab & Specular Light Pools
            drawIsoFloor(now);

            // 2. Render Dynamic Cutaway 3D Back Walls (behind all furniture & avatars)
            drawCutawayWalls(now);

            // 3. Build depth-sorted render queue (Painter's Algorithm in 3D camera space)
            const renderables = [];

            renderables.push({
                depth: project3D(0, 0, 8).depth,
                draw: () => drawCenterHoloCore(now)
            });

            stations.forEach(st => {
                renderables.push({
                    depth: project3D(st.wx, st.wy, st.h * 0.5).depth,
                    draw: () => drawStation3D(st, now, activeNearStation === st)
                });
            });

            aiAvatars.forEach(ai => {
                renderables.push({
                    depth: project3D(ai.wx, ai.wy, ai.wz + 10).depth,
                    draw: () => drawAvatar3D(ai)
                });
            });

            remotePeers.forEach((peer, key) => {
                if (Date.now() - peer.lastSeen > 25000) {
                    remotePeers.delete(key);
                    return;
                }
                renderables.push({
                    depth: project3D(peer.wx, peer.wy, peer.wz + 10).depth,
                    draw: () => drawAvatar3D(peer)
                });
            });

            renderables.push({
                depth: project3D(player.wx, player.wy, player.wz + 10).depth,
                draw: () => drawAvatar3D(player)
            });

            renderables.sort((a, b) => a.depth - b.depth);
            renderables.forEach(item => item.draw());

            // 4. Render rising 3D ambient holo particles
            particles.forEach(pt => {
                pt.wz += pt.speedZ;
                if (pt.wz > 68) pt.wz = 4;
                const sp = project3D(pt.wx, pt.wy, pt.wz);
                ctx.fillStyle = pt.color;
                ctx.globalAlpha = Math.max(0.15, 1 - pt.wz / 70);
                ctx.beginPath();
                ctx.arc(sp.x, sp.y, 1.6, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // 5. Render anti-overlap glassmorphic speech bubbles on top
            renderSpeechBubblesPass();

            animationFrameId = requestAnimationFrame(gameLoop);
        }

        function disposeLounge() {
            if (isDisposed) return;
            isDisposed = true;
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(quoteInterval);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (window.subscribeLoungeBroadcast) window.subscribeLoungeBroadcast(null);
        }

        function cleanupAndClose() {
            disposeLounge();
            closeModal();
        }

        activeModalCleanup = disposeLounge;
        animationFrameId = requestAnimationFrame(gameLoop);
        broadcastMyState(true);
        appendChatDrawerMessage('Alex · AI Eng', '#a855f7', 'Welcome to the 3D Cyber-Loft v2.0! 🚀', true);
    }

    window.openCommunityModal = openCommunityModal;
    window.openTerminalModal = openTerminalModal;
    window.openTypingModal = openTypingModal;
}
