// Supabase Client & Dynamic Portfolio Features Integration
// Client connects via public anon key with PostgreSQL Row Level Security (RLS)

const SUPABASE_URL = 'https://prxqtwfznexnxohgfbrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeHF0d2Z6bmV4bnhvaGdmYnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NTI0NTgsImV4cCI6MjEwNzIyODQ1OH0.eDYbRRr5VQOsxxwkT7ep-I-fZC8pkqIOaxwYEtjA-kE';

let supabaseClient = null;
let lastFocusedContactTrigger = null;
let lastFocusedGuestbookTrigger = null;

// Helper to trap focus within an active dialog
function handleModalKeydown(e, modalContainer, contentCardSelector, closeFn) {
    if (!modalContainer || !modalContainer.classList.contains('active')) return;
    if (e.key === 'Escape') {
        e.preventDefault();
        closeFn();
        return;
    }
    if (e.key === 'Tab') {
        const card = modalContainer.querySelector(contentCardSelector);
        if (!card) return;
        const focusable = card.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
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
    lastFocusedContactTrigger = document.activeElement;
    let modal = document.getElementById('contact-form-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'contact-form-modal';
        modal.className = 'contact-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'contact-modal-title');
        modal.innerHTML = `
            <div class="contact-modal-card">
                <div class="contact-modal-header">
                    <div class="contact-header-left">
                        <div class="contact-icon-badge">
                            <i class="ph-fill ph-paper-plane-tilt"></i>
                        </div>
                        <div>
                            <h3 id="contact-modal-title">Send a Message</h3>
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

        // Accessible keyboard trapping (Escape + Tab)
        document.addEventListener('keydown', (e) => {
            handleModalKeydown(e, document.getElementById('contact-form-modal'), '.contact-modal-card', closeContactModal);
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
        if (lastFocusedContactTrigger && typeof lastFocusedContactTrigger.focus === 'function') {
            lastFocusedContactTrigger.focus();
            lastFocusedContactTrigger = null;
        }
    }
}

// Site Analytics & Atomic Visitor Counter
async function recordAndGetPageView() {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
        const hasCountedSession = sessionStorage.getItem('visited_session');
        if (!hasCountedSession) {
            const { data, error } = await client.rpc('increment_site_views');
            if (!error && data !== null) {
                sessionStorage.setItem('visited_session', 'true');
                return data;
            }
        }
        
        // Fetch current count without re-incrementing
        const { data, error } = await client
            .from('site_metrics')
            .select('count')
            .eq('metric_key', 'page_views')
            .single();

        if (!error && data) {
            return data.count;
        }
    } catch (err) {
        console.warn('Visitor counter fetch notice:', err);
    }
    return null;
}

let presenceChannel = null;
window.currentLiveViewers = 1;

function updateLivePresenceDOM(activeCount) {
    const count = Math.max(1, Number(activeCount) || 1);
    window.currentLiveViewers = count;

    const viewerCountEl = document.getElementById('live-viewer-count');
    const viewerLabelEl = document.getElementById('live-viewer-label');
    const avatarBadgeEl = document.getElementById('community-avatar-count');
    const loungeCountEl = document.getElementById('lounge-online-count');

    if (viewerCountEl) {
        viewerCountEl.textContent = String(count);
    }
    if (viewerLabelEl) {
        viewerLabelEl.textContent = count === 1 ? 'person viewing now' : 'people viewing now';
    }
    if (avatarBadgeEl && count > 3) {
        avatarBadgeEl.textContent = `+${count - 3}`;
    }
    if (loungeCountEl) {
        loungeCountEl.textContent = `${count} ${count === 1 ? 'Visitor' : 'Visitors'} Live`;
    }
}

let loungeBroadcastCallback = null;

function initLivePresence() {
    const client = getSupabaseClient();
    if (!client || typeof client.channel !== 'function' || presenceChannel) return;

    try {
        let sessionKey = sessionStorage.getItem('rg_presence_key');
        if (!sessionKey) {
            sessionKey = 'v_' + Math.random().toString(36).slice(2, 10);
            sessionStorage.setItem('rg_presence_key', sessionKey);
        }
        window.rgPresenceKey = sessionKey;

        presenceChannel = client.channel('roldan_portfolio_presence', {
            config: {
                presence: { key: sessionKey },
                broadcast: { self: false }
            }
        });

        presenceChannel
            .on('presence', { event: 'sync' }, () => {
                const state = presenceChannel.presenceState();
                const activeKeys = state ? Object.keys(state).length : 1;
                updateLivePresenceDOM(activeKeys);
            })
            .on('broadcast', { event: 'lounge_state' }, (msg) => {
                if (typeof loungeBroadcastCallback === 'function' && msg && msg.payload) {
                    loungeBroadcastCallback(msg.payload);
                }
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await presenceChannel.track({
                        online_at: new Date().toISOString(),
                        route: window.location.hash || '#/'
                    });
                }
            });
    } catch (err) {
        console.warn('Live presence notice:', err);
    }
}

function broadcastLoungeState(payload) {
    if (!presenceChannel || typeof presenceChannel.send !== 'function') return;
    try {
        presenceChannel.send({
            type: 'broadcast',
            event: 'lounge_state',
            payload: Object.assign({ key: window.rgPresenceKey || 'anon' }, payload)
        });
    } catch (e) {
        // Ignore transient realtime broadcast error
    }
}

function subscribeLoungeBroadcast(cb) {
    loungeBroadcastCallback = cb;
}

async function updateVisitorCounterUI() {
    initLivePresence();

    const counterEl = document.getElementById('site-visitor-counter');
    const avatarBadgeEl = document.getElementById('community-avatar-count');

    const count = await recordAndGetPageView();
    if (count !== null && counterEl) {
        counterEl.textContent = Number(count).toLocaleString();
    }

    try {
        const entries = await fetchGuestbookEntries();
        if (avatarBadgeEl && window.currentLiveViewers <= 3 && Array.isArray(entries) && entries.length > 0) {
            avatarBadgeEl.textContent = `+${entries.length}`;
            avatarBadgeEl.title = `${entries.length} signed guestbook notes · ${count || '—'} total site views`;
        }
    } catch (e) {
        // Ignore guestbook badge fallback error
    }
}

// Global Exports
window.getSupabaseClient = getSupabaseClient;
window.submitContactMessage = submitContactMessage;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.recordAndGetPageView = recordAndGetPageView;
window.updateVisitorCounterUI = updateVisitorCounterUI;
window.initLivePresence = initLivePresence;
window.broadcastLoungeState = broadcastLoungeState;
window.subscribeLoungeBroadcast = subscribeLoungeBroadcast;

// ==========================================
// INTERACTIVE DEVELOPER GUESTBOOK
// ==========================================
async function fetchGuestbookEntries() {
    const client = getSupabaseClient();
    if (!client) return [];

    try {
        const { data, error } = await client
            .from('guestbook_entries')
            .select('id, created_at, name, handle_or_role, message')
            .order('created_at', { ascending: false })
            .limit(40);

        if (error) {
            console.error('Failed to fetch guestbook:', error);
            return [];
        }
        return data || [];
    } catch (err) {
        console.error('Error fetching guestbook:', err);
        return [];
    }
}

async function submitGuestbookEntry(payload) {
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Database client not connected.');
    }

    const { data, error } = await client
        .from('guestbook_entries')
        .insert([{
            name: payload.name.trim(),
            handle_or_role: payload.handle_or_role ? payload.handle_or_role.trim() : null,
            message: payload.message.trim(),
            is_approved: true
        }])
        .select('id, created_at, name, handle_or_role, message')
        .single();

    if (error) {
        console.error('Guestbook insert error:', error);
        throw error;
    }
    return data;
}

function openGuestbookModal() {
    lastFocusedGuestbookTrigger = document.activeElement;
    let modal = document.getElementById('guestbook-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'guestbook-modal';
        modal.className = 'contact-modal-overlay guestbook-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'guestbook-modal-title');
        modal.innerHTML = `
            <div class="contact-modal-card guestbook-modal-card">
                <div class="contact-modal-header">
                    <div class="contact-header-left">
                        <div class="contact-icon-badge" style="background: rgba(16, 185, 129, 0.12); color: #10b981;">
                            <i class="ph-fill ph-book-bookmark"></i>
                        </div>
                        <div>
                            <h3 id="guestbook-modal-title">Developer Guestbook</h3>
                            <p>Leave a note, feedback, or greeting for Roldan</p>
                        </div>
                    </div>
                    <button class="contact-close-btn" id="guestbook-modal-close" aria-label="Close guestbook">
                        <i class="ph ph-x"></i>
                    </button>
                </div>

                <div class="guestbook-split-container">
                    <form id="guestbook-form" class="guestbook-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="gb-name">Your Name</label>
                                <input type="text" id="gb-name" required placeholder="Alex Rivera" maxlength="60">
                            </div>
                            <div class="form-group">
                                <label for="gb-handle">Role / Handle (Optional)</label>
                                <input type="text" id="gb-handle" placeholder="@arivera or Frontend Dev" maxlength="60">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="gb-message">Message</label>
                            <textarea id="gb-message" rows="3" required placeholder="Say hi or leave a comment on the portfolio..." maxlength="280"></textarea>
                        </div>
                        <div class="contact-form-footer">
                            <span id="gb-status" class="contact-status-msg"></span>
                            <button type="submit" id="gb-submit-btn" class="btn-primary contact-submit-btn" style="background-color: #10b981;">
                                <span class="btn-text">Sign Guestbook</span>
                                <i class="ph-fill ph-paper-plane-right"></i>
                            </button>
                        </div>
                    </form>

                    <div class="guestbook-feed-section">
                        <div class="feed-header">
                            <span class="feed-kicker">COMMUNITY NOTES</span>
                            <span class="feed-count" id="gb-feed-count">Loading...</span>
                        </div>
                        <div class="guestbook-feed-list" id="gb-feed-list">
                            <!-- Populated with guestbook entries -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Bind events
        const closeBtn = document.getElementById('guestbook-modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeGuestbookModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeGuestbookModal();
        });

        // Accessible keyboard trapping (Escape + Tab)
        document.addEventListener('keydown', (e) => {
            handleModalKeydown(e, document.getElementById('guestbook-modal'), '.guestbook-modal-card', closeGuestbookModal);
        });

        // Form Submit Handler
        const form = document.getElementById('guestbook-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('gb-submit-btn');
            const statusMsg = document.getElementById('gb-status');

            const name = document.getElementById('gb-name').value;
            const handle_or_role = document.getElementById('gb-handle').value;
            const message = document.getElementById('gb-message').value;

            try {
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').textContent = 'Signing...';
                statusMsg.textContent = '';
                statusMsg.className = 'contact-status-msg';

                const newEntry = await submitGuestbookEntry({ name, handle_or_role, message });
                if (window.playSound) window.playSound('open');

                statusMsg.textContent = '✓ Note signed successfully!';
                statusMsg.classList.add('success');
                form.reset();
                submitBtn.querySelector('.btn-text').textContent = 'Signed!';

                // Prepend newly signed entry to live feed
                const feedList = document.getElementById('gb-feed-list');
                if (feedList && newEntry) {
                    const card = createGuestbookCardEl(newEntry);
                    feedList.insertBefore(card, feedList.firstChild);
                    updateGuestbookCount();
                }

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-text').textContent = 'Sign Guestbook';
                    statusMsg.textContent = '';
                }, 2500);

            } catch (err) {
                console.error(err);
                if (window.playSound) window.playSound('close');
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = 'Try Again';
                statusMsg.textContent = 'Failed to submit. Please try again.';
                statusMsg.classList.add('error');
            }
        });
    }

    modal.classList.add('active');
    if (window.playSound) window.playSound('open');
    loadGuestbookFeed();
}

function closeGuestbookModal() {
    const modal = document.getElementById('guestbook-modal');
    if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        if (window.playSound) window.playSound('close');
        if (lastFocusedGuestbookTrigger && typeof lastFocusedGuestbookTrigger.focus === 'function') {
            lastFocusedGuestbookTrigger.focus();
            lastFocusedGuestbookTrigger = null;
        }
    }
}

async function loadGuestbookFeed() {
    const feedList = document.getElementById('gb-feed-list');
    if (!feedList) return;

    feedList.innerHTML = '<div class="gb-loading"><i class="ph ph-spinner-gap"></i> Loading community notes...</div>';
    const entries = await fetchGuestbookEntries();

    if (entries.length === 0) {
        feedList.innerHTML = '<div class="gb-empty">Be the first to sign the guestbook!</div>';
        return;
    }

    feedList.innerHTML = '';
    entries.forEach(entry => {
        feedList.appendChild(createGuestbookCardEl(entry));
    });
    updateGuestbookCount();
}

function createGuestbookCardEl(entry) {
    const card = document.createElement('div');
    card.className = 'guestbook-card fade-in';
    const dateStr = entry.created_at ? new Date(entry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Today';

    const header = document.createElement('div');
    header.className = 'gb-card-top';

    const author = document.createElement('strong');
    author.className = 'gb-author';
    author.textContent = entry.name;
    header.appendChild(author);

    if (entry.handle_or_role) {
        const role = document.createElement('span');
        role.className = 'gb-role-pill';
        role.textContent = entry.handle_or_role;
        header.appendChild(role);
    }

    const date = document.createElement('span');
    date.className = 'gb-date';
    date.textContent = dateStr;
    header.appendChild(date);

    const body = document.createElement('p');
    body.className = 'gb-msg';
    body.textContent = entry.message;

    card.appendChild(header);
    card.appendChild(body);
    return card;
}

function updateGuestbookCount() {
    const countEl = document.getElementById('gb-feed-count');
    const feedList = document.getElementById('gb-feed-list');
    if (countEl && feedList) {
        const count = feedList.querySelectorAll('.guestbook-card').length;
        countEl.textContent = `${count} note${count === 1 ? '' : 's'}`;
    }
}

window.fetchGuestbookEntries = fetchGuestbookEntries;
window.submitGuestbookEntry = submitGuestbookEntry;
window.openGuestbookModal = openGuestbookModal;
window.closeGuestbookModal = closeGuestbookModal;


