// Floating AI Chatbot Assistant Engine
// Grounded strictly in Roldan Gaspar's verified skills, credentials, and projects

function initAIBot() {
    const triggerBtn = document.getElementById('ai-widget-btn');
    const drawer = document.getElementById('ai-chat-drawer');
    const closeBtn = document.getElementById('ai-drawer-close');
    const messagesEl = document.getElementById('ai-chat-messages');
    const input = document.getElementById('ai-user-input');
    const sendBtn = document.getElementById('ai-send-btn');

    if (!triggerBtn || !drawer) return;

    // Toggle Drawer
    triggerBtn.addEventListener('click', () => {
        drawer.classList.toggle('active');
        if (window.playSound) window.playSound('click');
        if (drawer.classList.contains('active')) {
            setTimeout(() => input.focus(), 200);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            drawer.classList.remove('active');
            if (window.playSound) window.playSound('close');
        });
    }

    // Dismiss drawer when clicking outside
    document.addEventListener('click', (e) => {
        if (!drawer.classList.contains('active')) return;
        if (!drawer.contains(e.target) && !triggerBtn.contains(e.target)) {
            drawer.classList.remove('active');
            if (window.playSound) window.playSound('close');
        }
    });

    // Delegated Quick Chip Clicks
    messagesEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip-btn');
        if (chip) {
            const question = chip.getAttribute('data-q');
            if (question) {
                handleUserQuery(question);
            }
        }
    });

    // Handle Send Button & Enter Key
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const val = input.value.trim();
            if (val) {
                handleUserQuery(val);
                input.value = '';
            }
        });
    }

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = input.value.trim();
                if (val) {
                    handleUserQuery(val);
                    input.value = '';
                }
            }
        });
    }

    function handleUserQuery(query) {
        // Append User Message safely (prevents XSS)
        appendUserMessage(query);
        if (window.playSound) window.playSound('key');

        // Thinking Indicator
        const thinkingId = appendThinking();
        messagesEl.scrollTop = messagesEl.scrollHeight;

        setTimeout(() => {
            removeThinking(thinkingId);
            const answerHtml = generateAIAnswer(query);
            appendBotMessage(answerHtml);
            messagesEl.scrollTop = messagesEl.scrollHeight;
            if (window.playSound) window.playSound('open');
        }, 500);
    }

    function appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'ai-msg user fade-in';
        msgDiv.textContent = text;
        messagesEl.appendChild(msgDiv);
    }

    function appendBotMessage(html) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'ai-msg bot fade-in';
        msgDiv.innerHTML = html;
        messagesEl.appendChild(msgDiv);
    }

    function appendThinking() {
        const id = 'thinking-' + Date.now();
        const thinkingDiv = document.createElement('div');
        thinkingDiv.id = id;
        thinkingDiv.className = 'ai-msg bot thinking fade-in';
        thinkingDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
        messagesEl.appendChild(thinkingDiv);
        return id;
    }

    function removeThinking(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function generateAIAnswer(q) {
        const query = q.toLowerCase();

        // 1. Resume / CV Inquiries
        if (query.includes('resume') || query.includes('cv') || query.includes('curriculum')) {
            const templateUrl = window.portfolioData?.shop?.[0]?.downloadUrl || 'assets/resume/developer-resume-template.docx';
            return `
                📄 <strong>Roldan's Developer Resume &amp; Templates:</strong><br>
                You can view and download Roldan's verified developer CV or get the free ATS resume template:<br><br>
                • <a href="assets/resume/roldan-gaspar-resume.html" target="_blank" rel="noopener noreferrer" class="ai-link">View Roldan's Printable Resume &nearr;</a><br>
                • <a href="${templateUrl}" download class="ai-link">Download ATS Resume Template (.docx) &darr;</a><br><br>
                <button class="ai-action-btn" onclick="window.open('assets/resume/roldan-gaspar-resume.html','_blank')">
                    <i class="ph-fill ph-file-pdf"></i> Open Printable Resume
                </button>
            `;
        }

        // 2. Certifications & Badges
        if (query.includes('cert') || query.includes('badge') || query.includes('credential') || query.includes('cisco') || query.includes('credly')) {
            const netacad = window.portfolioData?.netacadCertsList || [];
            const credly = window.portfolioData?.credlyAdditionalBadgesList || [];
            const topCerts = [...netacad.slice(0, 4), ...credly.slice(0, 1)];
            const certLines = topCerts.length > 0
                ? topCerts.map(c => `• <strong>${c.title}</strong> (${c.issuer})`).join('<br>')
                : `• <strong>CyberOps Associate &amp; Network Defense</strong><br>• <strong>Ethical Hacker &amp; Endpoint Security</strong><br>• <strong>AWS Educate: Cloud 101</strong>`;
            return `
                🎓 <strong>Verified Credentials &amp; Certifications:</strong><br>
                Roldan holds <strong>${netacad.length || 10} Cisco Networking Academy credentials</strong> and ${credly.length || 1} additional Credly badge(s):<br>
                ${certLines}<br><br>
                <button class="ai-action-btn" onclick="window.location.hash='#/certifications'">
                    <i class="ph-fill ph-seal-check"></i> View All Certifications
                </button>
            `;
        }

        // 2b. Cybersecurity & Interactive Cyber Lab
        if (query.includes('cyber') || query.includes('security') || query.includes('network') || query.includes('firewall') || query.includes('lab') || query.includes('simulator')) {
            const netacadCount = (window.portfolioData?.netacadCertsList || []).length || 10;
            const foundations = window.portfolioData?.cyberLab?.verifiedFoundations || ['Cisco CyberOps Associate', 'Cisco Ethical Hacker', 'Cisco Network Defense', 'Cisco Endpoint Security'];
            return `
                🛡️ <strong>CyberOps &amp; Network Defense Lab:</strong><br>
                Roldan built an interactive <strong>SOC Telemetry &amp; Packet Inspection Simulator</strong> grounded in his ${netacadCount} verified Cisco NetAcad credentials (${foundations.join(', ')}).<br><br>
                <button class="ai-action-btn" onclick="window.location.hash='#/cyber-lab'">
                    <i class="ph-fill ph-shield-check"></i> Launch Cyber Lab
                </button>
            `;
        }

        // 3. Technical Skills & Stack
        if (query.includes('skill') || query.includes('stack') || query.includes('tech') || query.includes('language') || query.includes('framework')) {
            return `
                ⚡ <strong>Roldan's Core Technical Stack:</strong><br>
                • <strong>Languages:</strong> TypeScript, JavaScript, Python, C#, Swift, SQL, HTML5/CSS3<br>
                • <strong>Frontend &amp; UI:</strong> React, Next.js, Vanilla JS (custom SPA routing), CSS tokens<br>
                • <strong>AI &amp; LLMs:</strong> OpenAI APIs, Anthropic Claude, LangChain, PyTorch, RAG architectures<br>
                • <strong>Backend &amp; Cloud:</strong> Node.js, FastAPI, Supabase (PostgreSQL with RLS), Docker, AWS, Vercel<br><br>
                <button class="ai-action-btn" onclick="window.location.hash='#/stack'">
                    <i class="ph-fill ph-cpu"></i> Explore Tech Stack
                </button>
            `;
        }

        // 4. Projects & Work
        if (query.includes('project') || query.includes('built') || query.includes('work') || query.includes('portfolio') || query.includes('app')) {
            const projects = window.portfolioData?.projects || [];
            const projectLines = projects.length > 0
                ? projects.map(p => `• <a href="#/projects/${p.id}" class="ai-link"><strong>${p.title}</strong></a>: ${p.tagline || p.subtitle}`).join('<br>')
                : `• <strong>Tarsi:</strong> Offline-first personal budget &amp; expense tracker<br>• <strong>AWarden-A:</strong> Windows AppLocker policy &amp; credential security tooling`;
            return `
                🚀 <strong>Featured Projects by Roldan:</strong><br>
                ${projectLines}<br><br>
                <button class="ai-action-btn" onclick="window.location.hash='#/projects'">
                    <i class="ph-fill ph-squares-four"></i> Browse Projects
                </button>
            `;
        }

        // 4b. Blog & Engineering Notes
        if (query.includes('blog') || query.includes('article') || query.includes('post') || query.includes('write') || query.includes('harness')) {
            const posts = (window.portfolioData?.blog || []).slice(0, 3);
            const postLines = posts.map(b => `• <a href="#/blog/${b.id}" class="ai-link"><strong>${b.title}</strong></a> (${b.readTime})`).join('<br>');
            return `
                ✍️ <strong>Latest Engineering Notes &amp; Blog Posts:</strong><br>
                ${postLines}<br><br>
                <button class="ai-action-btn" onclick="window.location.hash='#/blog'">
                    <i class="ph-fill ph-article"></i> Read All Posts
                </button>
            `;
        }

        // 5. Contact & Hiring
        if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire') || query.includes('message')) {
            return `
                📬 <strong>Reach Roldan Directly:</strong><br>
                • <strong>Email:</strong> <a href="mailto:gaspar26roldan@gmail.com" class="ai-link">gaspar26roldan@gmail.com</a><br>
                • <strong>GitHub:</strong> <a href="https://github.com/RoldanGaspar" target="_blank" rel="noopener noreferrer" class="ai-link">@RoldanGaspar</a><br>
                • <strong>Location:</strong> 📍 Pampanga, Philippines<br><br>
                <button class="ai-action-btn" onclick="if(window.openContactModal)window.openContactModal('Hiring');">
                    <i class="ph-fill ph-paper-plane-tilt"></i> Send Direct Message
                </button>
            `;
        }

        // 5b. Guestbook
        if (query.includes('guestbook') || query.includes('leave a note') || query.includes('greeting') || query.includes('sign')) {
            return `
                ✍️ <strong>Developer Guestbook:</strong><br>
                You can sign Roldan's interactive guestbook and leave a note or greeting for the community!<br><br>
                <button class="ai-action-btn" onclick="if(window.openGuestbookModal)window.openGuestbookModal();">
                    <i class="ph-fill ph-book-bookmark"></i> Open Guestbook &nearr;
                </button>
            `;
        }

        // 6. Consulting Services & Mentoring
        if (query.includes('consult') || query.includes('coach') || query.includes('train') || query.includes('service') || query.includes('rate')) {
            return `
                💼 <strong>Consulting &amp; Advisory Services:</strong><br>
                Roldan helps founders and engineering teams build &amp; ship with AI:<br>
                1. <strong>GenAI Integration &amp; Engineering:</strong> Autonomous agents, RAG, prompt architectures<br>
                2. <strong>Technical Architecture &amp; Full-Stack Builds:</strong> Scalable web &amp; mobile apps<br>
                3. <strong>Private 1:1 Coaching:</strong> Hands-on technical mentoring for engineers<br><br>
                <button class="ai-action-btn" onclick="if(window.openContactModal)window.openContactModal('Consulting');">
                    <i class="ph-fill ph-handshake"></i> Book Consulting
                </button>
            `;
        }

        // 7. GitHub & Open Source
        if (query.includes('github') || query.includes('repo') || query.includes('open source') || query.includes('commit') || query.includes('git')) {
            return `
                🐙 <strong>GitHub &amp; Open Source:</strong><br>
                Roldan maintains <strong>19 public repositories</strong> with live synced contribution activity.<br>
                • Profile: <a href="https://github.com/RoldanGaspar" target="_blank" rel="noopener noreferrer" class="ai-link">github.com/RoldanGaspar</a><br><br>
                <button class="ai-action-btn" onclick="window.open('https://github.com/RoldanGaspar','_blank')">
                    <i class="ph-fill ph-github-logo"></i> Open GitHub Profile
                </button>
            `;
        }

        // 8. Location & Background
        if (query.includes('location') || query.includes('where') || query.includes('who is') || query.includes('about')) {
            return `
                📍 Roldan Gaspar is a <strong>Software Engineer, AI builder, and Cybersecurity enthusiast</strong> based in <strong>Pampanga, Philippines</strong>, building products for clients and teams worldwide!
            `;
        }

        // 9. Greetings
        if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('kamusta') || query.includes('good morning') || query.includes('good evening')) {
            return `
                👋 Hello! I'm Roldan's AI assistant. Ask me about his <strong>skills</strong>, <strong>certifications</strong>, <strong>projects</strong>, or how to <strong>get in touch</strong>!
            `;
        }

        // Default Fallback with Quick Chips
        return `
            I can answer anything about Roldan's background, verified credentials, projects, or consulting services! Try one of these topics:<br><br>
            <div class="ai-chips">
                <button class="chip-btn" data-q="What are Roldan's top skills?">⚡ Skills</button>
                <button class="chip-btn" data-q="Tell me about Roldan's certifications">🎓 Certifications</button>
                <button class="chip-btn" data-q="Where can I see Roldan's resume?">📄 Resume</button>
                <button class="chip-btn" data-q="How can I contact Roldan?">📬 Contact</button>
            </div>
        `;
    }
}

// Global initialization
window.initAIBot = initAIBot;
window.addEventListener('DOMContentLoaded', initAIBot);
