function initModals() {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content-area"></div>
    `;
    document.body.appendChild(modalContainer);

    const overlay = modalContainer.querySelector('.modal-overlay');
    const contentArea = modalContainer.querySelector('.modal-content-area');

    function openModal(contentHtml) {
        contentArea.innerHTML = contentHtml;
        modalContainer.classList.add('active');
        if (window.playSound) window.playSound('open');
    }

    function closeModal() {
        modalContainer.classList.remove('active');
        if (window.playSound) window.playSound('close');
        setTimeout(() => { contentArea.innerHTML = ''; }, 300);
    }

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
        if (e.key === 'Escape') {
            closeModal();
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
            projects: `<span class="t-green">Tarsi</span> — #1 Finance App on App Store 🏆<br>
                       <span class="t-green">Kabi</span> — #1 Paid Fitness App<br>
                       <span class="t-green">Travel Buddy</span> — Trip planning companion`,
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
        `);
        
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
        let timerInterval = null;
        
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

        openModal(`
            <div class="community-modal fade-in">
                <div class="game-header">
                    <div class="game-title">
                        <i class="ph-fill ph-cube-transparent"></i> 
                        <span>3D Cyber-Loft Lounge</span>
                        <span class="game-badge-3d">ISO-3D ENGINE</span>
                    </div>
                    <div class="game-online" style="display:flex; align-items:center; gap:10px;">
                        <button type="button" id="lounge-open-guestbook-btn" class="terminal-chip" title="Open Developer Guestbook">
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
                    </div>
                    <div class="lounge-hud-group">
                        <button type="button" class="lounge-hud-btn lounge-emote-btn" data-emote="👋 Yo!">👋 Wave</button>
                        <button type="button" class="lounge-hud-btn lounge-emote-btn" data-emote="🚀 Shipping!">🚀 Ship</button>
                        <button type="button" class="lounge-hud-btn lounge-emote-btn" data-emote="☕ Espresso!">☕ Coffee</button>
                        <button type="button" class="lounge-hud-btn lounge-emote-btn" data-emote="🛡️ Secured!">🛡️ SOC</button>
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
                
                <p class="game-hint"><strong>WASD / Arrows</strong> or <strong>Click Floor</strong> to walk &bull; <strong>Space</strong> Jump &bull; <strong>Q / E</strong> Rotate 3D Cam &bull; Walk near stations & press <strong>F</strong>!</p>
            </div>
        `);

        const canvas = document.getElementById('game-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const chatInput = document.getElementById('game-chat-input');
        const sendBtn = document.getElementById('game-send-btn');
        const stationBanner = document.getElementById('lounge-station-banner');
        const stationIconEl = document.getElementById('lounge-station-icon');
        const stationNameEl = document.getElementById('lounge-station-name');
        const stationDescEl = document.getElementById('lounge-station-desc');
        const stationActionBtn = document.getElementById('lounge-station-action-btn');

        // High-DPI Retina Canvas Scaling
        const modalArea = canvas.closest('.modal-content-area');
        const maxAvailWidth = modalArea ? (modalArea.clientWidth - 4) : (window.innerWidth - 48);
        const cssWidth = Math.min(692, Math.max(300, maxAvailWidth));
        const cssHeight = Math.round(cssWidth * (9 / 16));
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);
        ctx.scale(dpr, dpr);

        let animationFrameId = null;
        let isDisposed = false;

        // 3D Isometric Camera & World Config
        const WORLD_LIMIT = 148;
        const FLOOR_SIZE = 160;
        let camAngle = Math.PI * 0.25; // 45 deg classic isometric
        let targetCamAngle = camAngle;
        const isoScale = Math.min(cssWidth, cssHeight) / 355;
        const zScale = isoScale * 0.88;
        const centerX = cssWidth * 0.5;
        const centerY = cssHeight * 0.55;

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

            // Draw front-facing vertical faces (where top edge goes right-to-left or by camera normal)
            for (let i = 0; i < 4; i++) {
                const next = (i + 1) % 4;
                // In screen space, a clockwise top polygon has front-facing sides when topPts[next].x < topPts[i].x
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
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Top face
            ctx.beginPath();
            ctx.moveTo(topPts[0].x, topPts[0].y);
            for (let i = 1; i < 4; i++) ctx.lineTo(topPts[i].x, topPts[i].y);
            ctx.closePath();
            ctx.fillStyle = palette.top;
            ctx.fill();
            if (palette.stroke) {
                ctx.strokeStyle = palette.stroke;
                ctx.lineWidth = 1;
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
                wx: -102,
                wy: -102,
                w: 52,
                d: 36,
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
                wx: 102,
                wy: -102,
                w: 44,
                d: 44,
                h: 48,
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
                wx: -102,
                wy: 102,
                w: 54,
                d: 38,
                h: 24,
                accent: '#f59e0b',
                triggerAction: () => {
                    if (window.setSoundscape) window.setSoundscape('lofi');
                    player.message = '☕ Brewed fresh espresso + Lo-Fi beats!';
                    player.msgTime = Date.now() + 4200;
                    player.vz = 5.5;
                    broadcastMyState();
                }
            },
            {
                id: 'arcade-guestbook',
                icon: '🕹️',
                name: 'Guestbook Arcade Kiosk',
                desc: 'Read community notes or sign Roldan\'s Supabase Guestbook',
                btnLabel: 'Open Guestbook [F]',
                wx: 102,
                wy: 102,
                w: 42,
                d: 42,
                h: 44,
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
            name: 'Roldan (You)',
            wx: 0,
            wy: 58,
            wz: 0,
            vz: 0,
            facing: -Math.PI * 0.5,
            stride: 0,
            color: '#22d3ee',
            speed: 2.35,
            targetWx: null,
            targetWy: null,
            message: 'Welcome to the 3D Cyber-Loft! 🚀',
            msgTime: Date.now() + 4000,
            isPlayer: true
        };

        const aiAvatars = [
            { id: 'ai-1', name: 'Alex · AI Eng', wx: -65, wy: -55, wz: 0, vz: 0, facing: 0.4, stride: 0, color: '#a855f7', targetWx: -75, targetWy: -68, message: 'Testing agent harnesses on the rig 💻', msgTime: Date.now() + 3400 },
            { id: 'ai-2', name: 'Sophia · SecOps', wx: 68, wy: -52, wz: 0, vz: 0, facing: 2.1, stride: 1.5, color: '#10b981', targetWx: 74, targetWy: -68, message: 'Zero packet drops on the SOC rack 🛡️', msgTime: Date.now() + 5200 },
            { id: 'ai-3', name: 'Kenji · Creative', wx: -62, wy: 68, wz: 0, vz: 0, facing: -1.2, stride: 3.1, color: '#f59e0b', targetWx: -75, targetWy: 74, message: 'Espresso + 40Hz focus hits different ☕', msgTime: Date.now() + 2500 },
            { id: 'ai-4', name: 'Elena · Indie', wx: 64, wy: 65, wz: 0, vz: 0, facing: -2.4, stride: 4.2, color: '#ec4899', targetWx: 72, targetWy: 72, message: 'Signed the guestbook kiosk! 🕹️', msgTime: Date.now() + 4500 }
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
                    wy: 0,
                    wz: 0,
                    facing: 0,
                    stride: 0,
                    color: '#38bdf8',
                    message: '',
                    msgTime: 0
                };
                existing.wx = Number(payload.wx) || 0;
                existing.wy = Number(payload.wy) || 0;
                existing.wz = Number(payload.wz) || 0;
                existing.facing = Number(payload.facing) || 0;
                existing.stride += 0.35;
                if (payload.message) {
                    existing.message = String(payload.message).slice(0, 60);
                    existing.msgTime = Date.now() + 4500;
                }
                existing.lastSeen = Date.now();
                remotePeers.set(peerId, existing);
            });
        }

        // Ambient floating 3D particles (holo dust & coffee steam)
        const particles = Array.from({ length: 18 }, (_, i) => ({
            wx: (Math.random() - 0.5) * 240,
            wy: (Math.random() - 0.5) * 240,
            wz: Math.random() * 55 + 6,
            speedZ: 0.22 + Math.random() * 0.25,
            color: i % 3 === 0 ? '#22d3ee' : (i % 3 === 1 ? '#a855f7' : '#34d399')
        }));

        const randomQuotes = [
            'Isometric 3D engine running at 60 FPS ⚡',
            'Press Q or E to rotate the 3D camera!',
            'Walk near any corner station & press F!',
            'Try jumping over the holo-table with Space!',
            'Supabase Realtime syncs across live tabs 🌐',
            'Check out the CyberOps Lab on the NE rack 🛡️',
            'Click anywhere on the 3D floor to pathfind!'
        ];

        const waypointTargets = [
            { wx: -72, wy: -68 },
            { wx: 72, wy: -68 },
            { wx: -72, wy: 72 },
            { wx: 72, wy: 72 },
            { wx: 0, wy: -52 },
            { wx: 0, wy: 56 }
        ];

        const quoteInterval = setInterval(() => {
            const randomAi = aiAvatars[Math.floor(Math.random() * aiAvatars.length)];
            randomAi.message = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
            randomAi.msgTime = Date.now() + 4200;
            const wp = waypointTargets[Math.floor(Math.random() * waypointTargets.length)];
            randomAi.targetWx = wp.wx + (Math.random() - 0.5) * 24;
            randomAi.targetWy = wp.wy + (Math.random() - 0.5) * 24;
            if (Math.random() < 0.35 && randomAi.wz === 0) {
                randomAi.vz = 4.6;
            }
        }, 3800);

        const keys = {};

        function triggerJump() {
            if (player.wz <= 0.1) {
                player.vz = 6.2;
                if (window.playSound) window.playSound('click');
                broadcastMyState(true);
            }
        }

        function handleKeyDown(e) {
            if (document.activeElement === chatInput) return;
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

        // Camera & Jump HUD Buttons
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

        // Click / Tap on 3D Floor to Walk
        let clickRing = null;
        canvas.addEventListener('pointerdown', (e) => {
            const rect = canvas.getBoundingClientRect();
            const sx = (e.clientX - rect.left) * (cssWidth / rect.width);
            const sy = (e.clientY - rect.top) * (cssHeight / rect.height);
            const pt = unprojectFloor(sx, sy);
            const clampedX = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, pt.wx));
            const clampedY = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, pt.wy));
            player.targetWx = clampedX;
            player.targetWy = clampedY;
            clickRing = { wx: clampedX, wy: clampedY, alpha: 1 };
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

        // Draw 3D Floor Platform & Glowing Grid
        function drawIsoFloor(now) {
            // Thick 3D base slab (z from -16 to 0)
            drawIsoBox(0, 0, -16, FLOOR_SIZE * 2, FLOOR_SIZE * 2, 16, {
                top: '#0c1322',
                sideA: '#070b14',
                sideB: '#05080f',
                stroke: 'rgba(56, 189, 248, 0.28)'
            });

            // Isometric floor grid lines on z = 0
            ctx.lineWidth = 1;
            const step = 32;
            for (let g = -FLOOR_SIZE; g <= FLOOR_SIZE; g += step) {
                const p1 = project3D(g, -FLOOR_SIZE, 0);
                const p2 = project3D(g, FLOOR_SIZE, 0);
                ctx.strokeStyle = g === 0 ? 'rgba(34, 211, 238, 0.16)' : 'rgba(148, 163, 184, 0.07)';
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
            const ringR = 44;
            ctx.beginPath();
            for (let i = 0; i <= ringPts; i++) {
                const a = (i / ringPts) * Math.PI * 2;
                const p = project3D(Math.cos(a) * ringR, Math.sin(a) * ringR, 0.5);
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            }
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.22 + 0.1 * Math.sin(now * 0.003)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Click-to-move target pulse
            if (clickRing && clickRing.alpha > 0.02) {
                const cp = project3D(clickRing.wx, clickRing.wy, 0.6);
                ctx.beginPath();
                ctx.ellipse(cp.x, cp.y, 12 * (1.2 - clickRing.alpha * 0.4), 6 * (1.2 - clickRing.alpha * 0.4), 0, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(34, 211, 238, ${clickRing.alpha})`;
                ctx.lineWidth = 1.8;
                ctx.stroke();
                clickRing.alpha *= 0.92;
            }
        }

        // Draw 3D Station & Hologram Label
        function drawStation3D(st, now, isNear) {
            // Base glowing pad on floor
            drawIsoBox(st.wx, st.wy, 0, st.w + 14, st.d + 14, 2, {
                top: isNear ? 'rgba(34, 211, 238, 0.25)' : 'rgba(30, 41, 59, 0.65)',
                sideA: '#0f172a',
                sideB: '#090d16',
                stroke: isNear ? st.accent : 'rgba(148, 163, 184, 0.2)'
            });

            // Main station 3D structure
            drawIsoBox(st.wx, st.wy, 2, st.w, st.d, st.h, {
                top: '#1e293b',
                sideA: '#131c2e',
                sideB: '#0f172a',
                stroke: isNear ? st.accent : 'rgba(255, 255, 255, 0.14)'
            });

            // Station-specific 3D details on top
            if (st.id === 'dev-rig') {
                // Dual 3D monitors on desk
                drawIsoBox(st.wx - 8, st.wy - 4, 2 + st.h, 18, 5, 14, {
                    top: '#38bdf8',
                    sideA: '#0284c7',
                    sideB: '#0369a1',
                    stroke: '#7dd3fc'
                });
                drawIsoBox(st.wx + 12, st.wy + 2, 2 + st.h, 10, 12, 16, {
                    top: '#1e1b4b',
                    sideA: '#312e81',
                    sideB: '#1e1b4b',
                    stroke: '#a855f7'
                });
            } else if (st.id === 'soc-rack') {
                // Glowing server blade strips
                const ledPulse = (Math.sin(now * 0.008) + 1) * 0.5;
                drawIsoBox(st.wx, st.wy, 2 + st.h, st.w - 10, st.d - 10, 5, {
                    top: ledPulse > 0.5 ? '#10b981' : '#059669',
                    sideA: '#065f46',
                    sideB: '#047857',
                    stroke: '#34d399'
                });
            } else if (st.id === 'espresso-bar') {
                // Espresso machine block
                drawIsoBox(st.wx - 6, st.wy, 2 + st.h, 20, 18, 14, {
                    top: '#d97706',
                    sideA: '#b45309',
                    sideB: '#78350f',
                    stroke: '#fbbf24'
                });
            } else if (st.id === 'arcade-guestbook') {
                // Arcade glowing top marquee
                drawIsoBox(st.wx, st.wy, 2 + st.h, st.w - 6, st.d - 6, 8, {
                    top: '#a855f7',
                    sideA: '#7e22ce',
                    sideB: '#581c87',
                    stroke: '#d8b4fe'
                });
            }

            // Floating 3D Hologram Banner above station
            const hoverZ = st.h + 24 + Math.sin(now * 0.004 + st.wx) * 3;
            const topPos = project3D(st.wx, st.wy, hoverZ);
            const label = `${st.icon} ${st.name}`;
            ctx.font = 'bold 10px monospace';
            const tw = ctx.measureText(label).width + 14;
            const th = 20;

            ctx.fillStyle = isNear ? 'rgba(8, 20, 38, 0.94)' : 'rgba(11, 15, 25, 0.82)';
            ctx.beginPath();
            ctx.roundRect(topPos.x - tw / 2, topPos.y - th / 2, tw, th, 6);
            ctx.fill();
            ctx.strokeStyle = isNear ? st.accent : 'rgba(255, 255, 255, 0.18)';
            ctx.lineWidth = isNear ? 1.5 : 1;
            ctx.stroke();

            ctx.fillStyle = isNear ? '#ffffff' : '#cbd5e1';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, topPos.x, topPos.y);
        }

        // Draw Central 3D Holographic Command Core
        function drawCenterHoloCore(now) {
            drawIsoBox(0, 0, 0, 42, 42, 16, {
                top: '#162032',
                sideA: '#0f172a',
                sideB: '#090d16',
                stroke: 'rgba(34, 211, 238, 0.4)'
            });

            // Floating rotating 3D holo-crystal above table
            const floatZ = 28 + Math.sin(now * 0.004) * 4;
            const pTop = project3D(0, 0, floatZ + 12);
            const pBot = project3D(0, 0, floatZ - 8);
            const r = 11;
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

        // Draw 3D Articulated Voxel/Character Avatar
        function drawAvatar3D(ent) {
            const groundPos = project3D(ent.wx, ent.wy, 0);
            const shadowScale = Math.max(0.45, 1 - ent.wz / 60);

            // Ground shadow on z = 0
            ctx.beginPath();
            ctx.ellipse(groundPos.x, groundPos.y, 11 * shadowScale, 5.5 * shadowScale, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
            ctx.fill();

            if (ent.isPlayer) {
                // Glowing player selection ring on floor
                ctx.beginPath();
                ctx.ellipse(groundPos.x, groundPos.y, 14 * shadowScale, 7 * shadowScale, 0, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(34, 211, 238, 0.65)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            // Walking bob & 3D body prism
            const bob = ent.wz > 0 ? 0 : Math.abs(Math.sin(ent.stride)) * 2.2;
            const baseZ = ent.wz + bob;

            // 3D Legs
            const legOffset = Math.sin(ent.stride) * 2.5;
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

            // 3D Extruded Torso Box
            drawIsoBox(ent.wx, ent.wy, baseZ + 6, 12, 10, 13, {
                top: ent.color,
                sideA: ent.color,
                sideB: '#1e293b',
                stroke: ent.isPlayer ? '#ffffff' : 'rgba(255,255,255,0.35)'
            });

            // 3D Head Cube / Sphere
            const headPos = project3D(ent.wx, ent.wy, baseZ + 25);
            ctx.beginPath();
            ctx.arc(headPos.x, headPos.y, 7.2, 0, Math.PI * 2);
            ctx.fillStyle = '#f8fafc';
            ctx.fill();
            ctx.lineWidth = 1.6;
            ctx.strokeStyle = '#0f172a';
            ctx.stroke();

            // Directional Cyber-Visor
            const viewAngle = ent.facing - camAngle;
            const vx = Math.cos(viewAngle) * 3.2;
            const vy = Math.sin(viewAngle) * 1.8;
            ctx.fillStyle = ent.isPlayer ? '#0284c7' : '#0f172a';
            ctx.beginPath();
            ctx.roundRect(headPos.x + vx - 4.2, headPos.y + vy - 2, 8.4, 3.6, 1.8);
            ctx.fill();

            // Nameplate below feet
            ctx.font = ent.isPlayer ? 'bold 10px monospace' : '10px monospace';
            ctx.fillStyle = ent.isPlayer ? '#22d3ee' : '#cbd5e1';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(ent.name, groundPos.x, groundPos.y + 7);

            // 3D Floating Speech Bubble
            if (ent.message && Date.now() < ent.msgTime) {
                drawSpeechBubble(headPos.x, headPos.y - 12, ent.message, ent.isPlayer);
            }
        }

        function drawSpeechBubble(x, y, text, isPlayer = false) {
            ctx.font = '11px monospace';
            const padding = 8;
            const metrics = ctx.measureText(text);
            const w = metrics.width + padding * 2;
            const h = 22;
            const bx = Math.max(8, Math.min(cssWidth - w - 8, x - w / 2));
            const by = Math.max(8, y - h - 6);

            ctx.fillStyle = isPlayer ? '#22d3ee' : '#ffffff';
            ctx.beginPath();
            ctx.roundRect(bx, by, w, h, 6);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x - 4, by + h);
            ctx.lineTo(x + 4, by + h);
            ctx.lineTo(x, by + h + 4);
            ctx.fillStyle = isPlayer ? '#22d3ee' : '#ffffff';
            ctx.fill();

            ctx.fillStyle = '#090d16';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, bx + w / 2, by + h / 2);
        }

        function collidesWithFurniture(wx, wy) {
            // Central holo-core collision radius
            if (Math.hypot(wx, wy) < 28) return true;
            for (let i = 0; i < stations.length; i++) {
                const st = stations[i];
                if (Math.abs(wx - st.wx) < st.w * 0.58 && Math.abs(wy - st.wy) < st.d * 0.58) {
                    return true;
                }
            }
            return false;
        }

        function updatePhysicsAndAI() {
            // Smooth camera orbit interpolation
            camAngle += (targetCamAngle - camAngle) * 0.14;

            // Player directional input in screen space -> rotated world space
            let inX = 0;
            let inY = 0;
            if (keys['KeyW'] || keys['ArrowUp']) inY -= 1;
            if (keys['KeyS'] || keys['ArrowDown']) inY += 1;
            if (keys['KeyA'] || keys['ArrowLeft']) inX -= 1;
            if (keys['KeyD'] || keys['ArrowRight']) inX += 1;

            if (inX !== 0 || inY !== 0) {
                player.targetWx = null;
                player.targetWy = null;
                // Convert screen-aligned input into isometric world vector
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

            // Jump gravity physics for player
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
            let bestDist = 66;
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

            // Update AI waypoint roaming & jump physics
            aiAvatars.forEach(ai => {
                const dx = ai.targetWx - ai.wx;
                const dy = ai.targetWy - ai.wy;
                const dist = Math.hypot(dx, dy);
                if (dist > 4) {
                    const step = 0.85;
                    const nx = ai.wx + (dx / dist) * step;
                    const ny = ai.wy + (dy / dist) * step;
                    if (!collidesWithFurniture(nx, ny)) {
                        ai.wx = nx;
                        ai.wy = ny;
                        ai.facing = Math.atan2(dy, dx);
                        ai.stride += 0.16;
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

            // Deep cyber-loft background gradient
            const bgGrad = ctx.createRadialGradient(centerX, centerY * 0.85, 20, centerX, centerY, cssWidth * 0.75);
            bgGrad.addColorStop(0, '#0f172a');
            bgGrad.addColorStop(1, '#050811');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, cssWidth, cssHeight);

            // Render 3D Floor Slab & Circuit Grid
            drawIsoFloor(now);

            // Build depth-sorted render queue (Painter's Algorithm in 3D camera space)
            const renderables = [];

            // 1. Central Holo-Core
            renderables.push({
                depth: project3D(0, 0, 8).depth,
                draw: () => drawCenterHoloCore(now)
            });

            // 2. 4 Corner 3D Stations
            stations.forEach(st => {
                renderables.push({
                    depth: project3D(st.wx, st.wy, st.h * 0.5).depth,
                    draw: () => drawStation3D(st, now, activeNearStation === st)
                });
            });

            // 3. Resident AI Engineers
            aiAvatars.forEach(ai => {
                renderables.push({
                    depth: project3D(ai.wx, ai.wy, ai.wz + 10).depth,
                    draw: () => drawAvatar3D(ai)
                });
            });

            // 4. Live Remote Visitors (prune stale > 25s)
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

            // 5. Local Player
            renderables.push({
                depth: project3D(player.wx, player.wy, player.wz + 10).depth,
                draw: () => drawAvatar3D(player)
            });

            // Sort back-to-front by isometric depth
            renderables.sort((a, b) => a.depth - b.depth);
            renderables.forEach(item => item.draw());

            // Render rising 3D ambient holo particles
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

            animationFrameId = requestAnimationFrame(gameLoop);
        }

        function cleanupAndClose() {
            isDisposed = true;
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(quoteInterval);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (window.subscribeLoungeBroadcast) window.subscribeLoungeBroadcast(null);
            closeModal();
        }

        animationFrameId = requestAnimationFrame(gameLoop);
        broadcastMyState(true);

        overlay.addEventListener('click', () => {
            isDisposed = true;
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(quoteInterval);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (window.subscribeLoungeBroadcast) window.subscribeLoungeBroadcast(null);
        }, { once: true });
    }

    window.openCommunityModal = openCommunityModal;
    window.openTerminalModal = openTerminalModal;
    window.openTypingModal = openTypingModal;
}
