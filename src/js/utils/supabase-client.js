// Supabase Client & Dynamic Portfolio Features Integration
// Client connects via public anon key with PostgreSQL Row Level Security (RLS)

const SUPABASE_URL = 'https://prxqtwfznexnxohgfbrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeHF0d2Z6bmV4bnhvaGdmYnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NTI0NTgsImV4cCI6MjEwNzIyODQ1OH0.eDYbRRr5VQOsxxwkT7ep-I-fZC8pkqIOaxwYEtjA-kE';

let supabaseClient = null;

function getSupabaseClient() {
    if (!supabaseClient && window.supabase && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
}

// Submit contact form directly to Supabase
async function submitContactMessage(payload) {
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Database client is not available. Please check network connection.');
    }

    const { data, error } = await client
        .from('contact_messages')
        .insert([{
            name: payload.name.trim(),
            email: payload.email.trim(),
            inquiry_type: payload.inquiry_type || 'General',
            message: payload.message.trim()
        }]);

    if (error) {
        console.error('Supabase contact submission error:', error);
        throw error;
    }

    return data;
}

// Contact Modal Management
function openContactModal(defaultInquiry = 'Hiring') {
    let modal = document.getElementById('contact-form-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'contact-form-modal';
        modal.className = 'contact-modal-overlay';
        modal.innerHTML = `
            <div class="contact-modal-card">
                <div class="contact-modal-header">
                    <div class="contact-header-left">
                        <div class="contact-icon-badge">
                            <i class="ph-fill ph-paper-plane-tilt"></i>
                        </div>
                        <div>
                            <h3>Send a Message</h3>
                            <p>Direct to Roldan's inbox via Supabase</p>
                        </div>
                    </div>
                    <button class="contact-close-btn" id="contact-modal-close" aria-label="Close modal">
                        <i class="ph ph-x"></i>
                    </button>
                </div>

                <form id="contact-form" class="contact-form-body">
                    <div class="inquiry-pills-row">
                        <label class="inquiry-pill active">
                            <input type="radio" name="inquiry_type" value="Hiring" checked>
                            <span>💼 Hiring / Job</span>
                        </label>
                        <label class="inquiry-pill">
                            <input type="radio" name="inquiry_type" value="Consulting">
                            <span>⚡ Consulting</span>
                        </label>
                        <label class="inquiry-pill">
                            <input type="radio" name="inquiry_type" value="Collab">
                            <span>🤝 Collab</span>
                        </label>
                        <label class="inquiry-pill">
                            <input type="radio" name="inquiry_type" value="General">
                            <span>👋 Say Hi</span>
                        </label>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="contact-name">Your Name</label>
                            <input type="text" id="contact-name" name="name" placeholder="John Doe" required maxlength="80">
                        </div>
                        <div class="form-group">
                            <label for="contact-email">Your Email</label>
                            <input type="email" id="contact-email" name="email" placeholder="john@example.com" required maxlength="100">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" name="message" rows="4" placeholder="How can Roldan help you build something great?" required maxlength="1000"></textarea>
                    </div>

                    <div class="contact-form-footer">
                        <span id="contact-form-status" class="contact-status-msg"></span>
                        <button type="submit" id="contact-submit-btn" class="btn-primary contact-submit-btn">
                            <span class="btn-text">Send Message</span>
                            <i class="ph-fill ph-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Bind events
        const closeBtn = document.getElementById('contact-modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeContactModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeContactModal();
        });

        // Pill selector interactivity
        modal.querySelectorAll('.inquiry-pill input').forEach(input => {
            input.addEventListener('change', () => {
                modal.querySelectorAll('.inquiry-pill').forEach(p => p.classList.remove('active'));
                input.closest('.inquiry-pill').classList.add('active');
                if (window.playSound) window.playSound('click');
            });
        });

        // Form Submission Handler
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('contact-submit-btn');
            const statusMsg = document.getElementById('contact-form-status');

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            const inquiryTypeEl = form.querySelector('input[name="inquiry_type"]:checked');
            const inquiry_type = inquiryTypeEl ? inquiryTypeEl.value : 'General';

            try {
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                submitBtn.querySelector('.btn-text').textContent = 'Sending...';
                statusMsg.textContent = '';
                statusMsg.className = 'contact-status-msg';

                await submitContactMessage({ name, email, inquiry_type, message });

                // Success
                if (window.playSound) window.playSound('open');
                submitBtn.querySelector('.btn-text').textContent = 'Sent!';
                statusMsg.textContent = '✓ Message received! Roldan will get back to you soon.';
                statusMsg.classList.add('success');
                form.reset();

                setTimeout(() => {
                    closeContactModal();
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                    statusMsg.textContent = '';
                }, 2200);

            } catch (err) {
                console.error(err);
                if (window.playSound) window.playSound('close');
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                submitBtn.querySelector('.btn-text').textContent = 'Try Again';
                statusMsg.textContent = 'Failed to send. You can also email gaspar26roldan@gmail.com directly.';
                statusMsg.classList.add('error');
            }
        });
    }

    // Set default pill if specified
    if (defaultInquiry) {
        const targetRadio = modal.querySelector(`input[name="inquiry_type"][value="${defaultInquiry}"]`);
        if (targetRadio) {
            targetRadio.checked = true;
            modal.querySelectorAll('.inquiry-pill').forEach(p => p.classList.remove('active'));
            targetRadio.closest('.inquiry-pill').classList.add('active');
        }
    }

    modal.classList.add('active');
    if (window.playSound) window.playSound('open');
    setTimeout(() => {
        const nameInput = document.getElementById('contact-name');
        if (nameInput) nameInput.focus();
    }, 150);
}

function closeContactModal() {
    const modal = document.getElementById('contact-form-modal');
    if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        if (window.playSound) window.playSound('close');
    }
}

// Global Exports
window.getSupabaseClient = getSupabaseClient;
window.submitContactMessage = submitContactMessage;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
