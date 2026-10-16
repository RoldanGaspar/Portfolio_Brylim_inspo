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

    document.querySelectorAll('.community-chat-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openCommunityModal();
        });
    });

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
        openModal(`
            <div class="community-modal fade-in">
                <div class="game-header">
                    <div class="game-title">
                        <i class="ph-fill ph-game-controller"></i> 
                        <span>2D Dev Lounge</span>
                    </div>
                    <div class="game-online">
                        <span style="background:#22c55e; width:8px; height:8px; border-radius:50%; display:inline-block;"></span>
                        <span>16 Devs Online</span>
                    </div>
                </div>
                
                <div class="game-viewport">
                    <canvas id="game-canvas" width="600" height="320"></canvas>
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
                    <input type="text" id="game-chat-input" placeholder="Type a message & press Enter to speak..." maxlength="50">
                    <button id="game-send-btn">Send <i class="ph-fill ph-paper-plane-right"></i></button>
                </div>
                
                <p class="game-hint">Move with <strong>W / A / S / D</strong> or <strong>Arrow Keys</strong>. Touch controls for mobile!</p>
            </div>
        `);

        const canvas = document.getElementById('game-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const chatInput = document.getElementById('game-chat-input');
        const sendBtn = document.getElementById('game-send-btn');

        // Dynamic responsive canvas sizing
        const modalArea = canvas.closest('.modal-content-area');
        const maxAvailWidth = modalArea ? (modalArea.clientWidth - 4) : (window.innerWidth - 48);
        const targetWidth = Math.min(600, Math.max(280, maxAvailWidth));
        const targetHeight = Math.round(targetWidth * (320 / 600));

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        let animationFrameId = null;

        const player = {
            name: "Roldan (You)",
            x: Math.round(targetWidth / 2),
            y: Math.round(targetHeight / 2),
            radius: 12,
            color: "#00f2fe",
            speed: 3.2,
            message: "",
            msgTime: 0
        };

        const keys = {};

        const aiAvatars = [
            { name: "Alex", x: Math.round(targetWidth * 0.2), y: Math.round(targetHeight * 0.25), color: "#a855f7", dx: 0.8, dy: 0.5, message: "GenAI is crazy! 🚀", msgTime: Date.now() + 3000 },
            { name: "Sophia", x: Math.round(targetWidth * 0.75), y: Math.round(targetHeight * 0.35), color: "#ec4899", dx: -0.6, dy: 0.4, message: "Deploying to prod... 🤞", msgTime: Date.now() + 5000 },
            { name: "Kenji", x: Math.round(targetWidth * 0.3), y: Math.round(targetHeight * 0.75), color: "#10b981", dx: 0.5, dy: -0.7, message: "Love this 2D mini-game!", msgTime: Date.now() + 2000 },
            { name: "Elena", x: Math.round(targetWidth * 0.65), y: Math.round(targetHeight * 0.7), color: "#f59e0b", dx: -0.4, dy: -0.5, message: "Coffee breaks make code faster ☕", msgTime: Date.now() + 4000 }
        ];

        const randomQuotes = [
            "Building awesome software daily!",
            "Typescript + Vite is so fast⚡",
            "Anybody testing local LLMs?",
            "Awesome portfolio design!",
            "Shift + Alt + F formatted my brain",
            "GG WP 🎮",
            "CSS grid is pure magic"
        ];

        const quoteInterval = setInterval(() => {
            const randomAi = aiAvatars[Math.floor(Math.random() * aiAvatars.length)];
            randomAi.message = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
            randomAi.msgTime = Date.now() + 4000;
        }, 4500);

        function handleKeyDown(e) {
            if (document.activeElement === chatInput) return;
            keys[e.code] = true;
        }

        function handleKeyUp(e) {
            keys[e.code] = false;
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

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
                player.msgTime = Date.now() + 4500;
                chatInput.value = '';
                if (window.playSound) window.playSound('click');
            }
        }

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        function drawAvatar(x, y, name, color, isPlayer = false) {
            ctx.beginPath();
            ctx.ellipse(x, y + 10, 10, 4, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, isPlayer ? 14 : 12, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = isPlayer ? 3 : 2;
            ctx.strokeStyle = isPlayer ? "#ffffff" : "rgba(255,255,255,0.4)";
            ctx.stroke();

            ctx.font = "bold 10px monospace";
            ctx.fillStyle = isPlayer ? "#00f2fe" : "#e2e8f0";
            ctx.textAlign = "center";
            ctx.fillText(name, x, y + 24);
        }

        function drawSpeechBubble(x, y, text, isPlayer = false) {
            ctx.font = "11px monospace";
            const padding = 8;
            const metrics = ctx.measureText(text);
            const w = metrics.width + padding * 2;
            const h = 22;
            const bx = x - w / 2;
            const by = y - h - 6;

            ctx.fillStyle = isPlayer ? "#00f2fe" : "#ffffff";
            ctx.beginPath();
            ctx.roundRect(bx, by, w, h, 6);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x - 4, by + h);
            ctx.lineTo(x + 4, by + h);
            ctx.lineTo(x, by + h + 4);
            ctx.fillStyle = isPlayer ? "#00f2fe" : "#ffffff";
            ctx.fill();

            ctx.fillStyle = isPlayer ? "#030712" : "#0f172a";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, x, by + h / 2);
        }

        function drawProp(x, y, label, color) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.roundRect(x - 40, y - 18, 80, 36, 8);
            ctx.fill();
            ctx.strokeStyle = "rgba(255,255,255,0.12)";
            ctx.stroke();

            ctx.font = "11px monospace";
            ctx.fillStyle = "#94a3b8";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(label, x, y);
        }

        function gameLoop() {
            if (keys['KeyW'] || keys['ArrowUp']) player.y = Math.max(20, player.y - player.speed);
            if (keys['KeyS'] || keys['ArrowDown']) player.y = Math.min(canvas.height - 20, player.y + player.speed);
            if (keys['KeyA'] || keys['ArrowLeft']) player.x = Math.max(20, player.x - player.speed);
            if (keys['KeyD'] || keys['ArrowRight']) player.x = Math.min(canvas.width - 20, player.x + player.speed);

            ctx.fillStyle = "#0d1117";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 24) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 24) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }

            drawProp(Math.round(canvas.width * 0.2), Math.round(canvas.height * 0.2), "💻 Workspace", "#1e293b");
            drawProp(Math.round(canvas.width * 0.8), Math.round(canvas.height * 0.2), "🛋️ Lounge", "#334155");
            drawProp(Math.round(canvas.width * 0.2), Math.round(canvas.height * 0.8), "☕ Coffee Bar", "#1e293b");
            drawProp(Math.round(canvas.width * 0.8), Math.round(canvas.height * 0.8), "🕹️ Arcade", "#334155");

            aiAvatars.forEach(ai => {
                ai.x += ai.dx;
                ai.y += ai.dy;
                if (ai.x < 30 || ai.x > canvas.width - 30) ai.dx *= -1;
                if (ai.y < 30 || ai.y > canvas.height - 30) ai.dy *= -1;

                drawAvatar(ai.x, ai.y, ai.name, ai.color);
                if (ai.message && Date.now() < ai.msgTime) {
                    drawSpeechBubble(ai.x, ai.y - 20, ai.message);
                }
            });

            drawAvatar(player.x, player.y, player.name, player.color, true);
            if (player.message && Date.now() < player.msgTime) {
                drawSpeechBubble(player.x, player.y - 20, player.message, true);
            }

            animationFrameId = requestAnimationFrame(gameLoop);
        }

        animationFrameId = requestAnimationFrame(gameLoop);

        overlay.addEventListener('click', () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(quoteInterval);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        });
    }
}
