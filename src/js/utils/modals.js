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

    function openTerminalModal() {
        openModal(`
            <div class="terminal-modal fade-in">
                <h2>what do you want to ask?</h2>
                <div class="terminal-input-area">
                    <input type="text" id="terminal-input" class="terminal-input" placeholder="type a command..." autofocus>
                </div>
                <div class="terminal-output" id="terminal-output"></div>
                <div class="terminal-hints">
                    <span>Try: <code>help</code>, <code>about</code>, <code>contact</code>, <code>stack</code>, <code>sudo</code></span>
                </div>
            </div>
        `);
        
        const input = document.getElementById('terminal-input');
        const output = document.getElementById('terminal-output');
        
        if (input) {
            setTimeout(() => input.focus(), 100);
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const cmd = input.value.trim().toLowerCase();
                    input.value = '';
                    processTerminalCommand(cmd, output);
                    if (window.playSound) window.playSound('key');
                }
            });
        }
    }
    
    function processTerminalCommand(cmd, output) {
        const commands = {
            help: `<span class="t-green">Available commands:</span><br>
                   <code>about</code> — Who am I<br>
                   <code>contact</code> — How to reach me<br>
                   <code>stack</code> — My tech stack<br>
                   <code>projects</code> — Featured projects<br>
                   <code>whoami</code> — Current session & user info<br>
                   <code>matrix</code> — 🟢 Launch Matrix rain<br>
                   <code>game</code> — 🎮 Launch 2D Dev Lounge<br>
                   <code>theme</code> — Toggle light/dark theme<br>
                   <code>sudo</code> — 🤫<br>
                   <code>clear</code> — Clear output`,
            about: `<span class="t-green">Roldan Gaspar</span> — Full-stack engineer focused on generative AI.<br>Building modern web & mobile apps, turning rough ideas into things people actually use.`,
            contact: `<span class="t-green">📧</span> gaspar26roldan@gmail.com<br>
                      <span class="t-green">🐙</span> github.com/bryllim<br>
                      <span class="t-green">💼</span> linkedin.com/in/bryllim`,
            stack: `<span class="t-green">Languages:</span> TypeScript, Python, Swift<br>
                    <span class="t-green">Frontend:</span> React, Next.js, SwiftUI<br>
                    <span class="t-green">Backend:</span> Node.js, Laravel, FastAPI<br>
                    <span class="t-green">AI/ML:</span> PyTorch, LangChain, Claude<br>
                    <span class="t-green">Infra:</span> AWS, Docker, Kubernetes`,
            projects: `<span class="t-green">Tarsi</span> — #1 Finance App on App Store 🏆<br>
                       <span class="t-green">Kabi</span> — #1 Paid Fitness App<br>
                       <span class="t-green">Travel Buddy</span> — Trip planning companion`,
            whoami: `<span class="t-green">User:</span> guest@roldangaspar.dev<br>
                     <span class="t-green">Location:</span> Pampanga, Philippines 📍<br>
                     <span class="t-green">Role:</span> Software Engineer \\ AI \\ Cybersecurity Enthusiast`,
            matrix: `<span class="t-green">🟢 Entering Matrix stream...</span>`,
            game: `<span class="t-green">🎮 Launching 2D Dev Lounge...</span>`,
            theme: `<span class="t-green">🌗 Theme toggled!</span>`,
            sudo: `<span class="t-red">Permission denied:</span> Nice try. You're not the admin here. 😎`,
            clear: 'CLEAR'
        };
        
        const thinkingEl = document.createElement('div');
        thinkingEl.className = 'terminal-line';
        thinkingEl.innerHTML = `<span class="t-muted">> ${cmd}</span><br><span class="t-thinking">thinking...</span>`;
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

            const response = commands[cmd] || `<span class="t-red">Unknown command:</span> "${cmd}". Type <code>help</code> for available commands.`;
            thinkingEl.innerHTML = `<span class="t-muted">> ${cmd}</span><br>${response}`;
            output.scrollTop = output.scrollHeight;
        }, 600);
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

        let animationFrameId = null;

        const player = {
            name: "Roldan (You)",
            x: 280,
            y: 160,
            radius: 12,
            color: "#00f2fe",
            speed: 3.2,
            message: "",
            msgTime: 0
        };

        const keys = {};

        const aiAvatars = [
            { name: "Alex", x: 100, y: 80, color: "#a855f7", dx: 0.8, dy: 0.5, message: "GenAI is crazy! 🚀", msgTime: Date.now() + 3000 },
            { name: "Sophia", x: 450, y: 120, color: "#ec4899", dx: -0.6, dy: 0.4, message: "Deploying to prod... 🤞", msgTime: Date.now() + 5000 },
            { name: "Kenji", x: 180, y: 240, color: "#10b981", dx: 0.5, dy: -0.7, message: "Love this 2D mini-game!", msgTime: Date.now() + 2000 },
            { name: "Elena", x: 400, y: 220, color: "#f59e0b", dx: -0.4, dy: -0.5, message: "Coffee breaks make code faster ☕", msgTime: Date.now() + 4000 }
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
            btn.addEventListener('touchstart', (e) => { e.preventDefault(); setDir(true); });
            btn.addEventListener('touchend', (e) => { e.preventDefault(); setDir(false); });
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

            drawProp(120, 60, "💻 Workspace", "#1e293b");
            drawProp(480, 60, "🛋️ Lounge", "#334155");
            drawProp(80, 260, "☕ Coffee Bar", "#1e293b");
            drawProp(480, 260, "🕹️ Arcade", "#334155");

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
