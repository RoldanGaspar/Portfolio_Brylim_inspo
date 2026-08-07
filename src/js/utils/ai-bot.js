// Floating AI Chatbot Assistant Engine
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

    closeBtn.addEventListener('click', () => {
        drawer.classList.remove('active');
        if (window.playSound) window.playSound('close');
    });

    // Handle Quick Chip Clicks
    document.querySelectorAll('.ai-chips .chip-btn').forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.getAttribute('data-q');
            if (question) {
                handleUserQuery(question);
            }
        });
    });

    // Handle Send Button & Enter Key
    sendBtn.addEventListener('click', () => {
        const val = input.value.trim();
        if (val) {
            handleUserQuery(val);
            input.value = '';
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            if (val) {
                handleUserQuery(val);
                input.value = '';
            }
        }
    });

    function handleUserQuery(query) {
        // Append User Message
        appendMessage(query, 'user');
        if (window.playSound) window.playSound('key');

        // Thinking Indicator
        const thinkingId = appendThinking();
        messagesEl.scrollTop = messagesEl.scrollHeight;

        setTimeout(() => {
            removeThinking(thinkingId);
            const answer = generateAIAnswer(query);
            appendMessage(answer, 'bot');
            messagesEl.scrollTop = messagesEl.scrollHeight;
            if (window.playSound) window.playSound('open');
        }, 600);
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-msg ${sender} fade-in`;
        msgDiv.innerHTML = text;
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

        if (query.includes('skill') || query.includes('stack') || query.includes('tech')) {
            return `⚡ <strong>Roldan's Core Stack:</strong><br>
                    • <strong>Languages:</strong> TypeScript, Python, Swift, SQL<br>
                    • <strong>AI/ML:</strong> PyTorch, LangChain, OpenAI APIs, Claude, GenAI Ops<br>
                    • <strong>Frontend:</strong> React, Next.js, Vanilla JS, HTML/CSS<br>
                    • <strong>Backend:</strong> Node.js, FastAPI, Laravel, Docker, AWS`;
        }

        if (query.includes('project') || query.includes('built') || query.includes('work')) {
            return `🏆 <strong>Featured Projects by Roldan:</strong><br>
                    • <strong>Tarsi:</strong> #1 Finance App on App Store<br>
                    • <strong>Kabi:</strong> #1 Paid Fitness App<br>
                    • <strong>Travel Buddy:</strong> AI trip planning companion<br>
                    • <strong>Resume Builder:</strong> ATS-optimized template engine`;
        }

        if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
            return `📧 You can reach Roldan directly at:<br>
                    • Email: <a href="mailto:gaspar26roldan@gmail.com" class="ai-link">gaspar26roldan@gmail.com</a><br>
                    • Location: 📍 Pampanga, Philippines`;
        }

        if (query.includes('consult') || query.includes('hire') || query.includes('service')) {
            return `💼 <strong>Consulting Services:</strong><br>
                    Roldan helps founders & teams ship with AI through:<br>
                    1. <strong>GenAI Integration & Engineering</strong><br>
                    2. <strong>Technical Architecture & Leadership</strong><br>
                    3. <strong>Full-Stack Product Builds</strong>`;
        }

        if (query.includes('location') || query.includes('where')) {
            return `📍 Roldan is based in <strong>Pampanga, Philippines</strong>, working with clients and teams worldwide!`;
        }

        if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
            return `Hello! 👋 How can I help you learn more about Roldan Gaspar's work today?`;
        }

        return `I can answer anything about Roldan's software engineering background, generative AI work, featured projects, or consulting services! Try asking about <strong>skills</strong>, <strong>projects</strong>, or <strong>contact info</strong>.`;
    }
}

window.addEventListener('DOMContentLoaded', initAIBot);
