let pomodoroSeconds = 25 * 60;
let pomodoroTimerId = null;
let isPomodoroRunning = false;

function renderAudioLounge() {
    const playlist = window.audioPlaylist || [];
    const currentTrack = playlist.find(t => t.id === window.activeTrackId) || playlist[0];
    const isPlaying = window.isPlayingTrack;
    const currentVisMode = window.visualizerMode || 'spectrum';
    const volPercent = Math.round((window.ambientVolume !== undefined ? window.ambientVolume : 0.5) * 100);

    return `
        <div class="audio-lounge-page reveal">
            <!-- Page Header -->
            <div class="page-header-clean">
                <span class="section-number">07 &mdash; audio studio</span>
                <h2 class="page-title-clean">Beats to Code & Ship To</h2>
                <p class="page-desc-clean">
                    An interactive cybernetic sound studio engineered with lo-fi acoustics, ambient layer mixing, and developer focus tools.
                </p>
            </div>

            <!-- Top Hero Deck: Glassmorphic Hi-Fi Cassette Tape Deck -->
            <div class="cassette-deck-card ${isPlaying ? 'playing' : ''}" id="cassette-deck" style="--track-accent: ${currentTrack.accent}">
                <div class="cassette-screw top-left"></div>
                <div class="cassette-screw top-right"></div>
                <div class="cassette-screw bottom-left"></div>
                <div class="cassette-screw bottom-right"></div>

                <div class="cassette-header">
                    <div class="cassette-label">
                        <span class="cassette-brand">ROLDAN HI-FI STUDIO &bull; TYPE II</span>
                        <span class="cassette-type">NEON GLASSMORPHIC DECK</span>
                    </div>
                    <div class="deck-led-container">
                        <span class="led-live-text">${isPlaying ? '● ANALOG PLAYBACK' : '○ STANDBY'}</span>
                        <div class="deck-led-indicator ${isPlaying ? 'active' : ''}"></div>
                    </div>
                </div>

                <!-- Dark Studio Cassette Tape Window & Visualizer Canvas -->
                <div class="cassette-window dark-chassis">
                    <div class="tape-reel left ${isPlaying ? 'spinning' : ''}">
                        <div class="reel-spoke"></div>
                    </div>
                    
                    <div class="tape-bridge">
                        <div class="tape-ribbon ${isPlaying ? 'active' : ''}"></div>
                        <canvas id="audio-visualizer-canvas" width="340" height="60"></canvas>
                    </div>

                    <div class="tape-reel right ${isPlaying ? 'spinning' : ''}">
                        <div class="reel-spoke"></div>
                    </div>
                </div>

                <!-- Visualizer Mode Selector Pills -->
                <div class="vis-mode-selector">
                    <span class="vis-label">VISUALIZER:</span>
                    <button class="vis-mode-btn ${currentVisMode === 'spectrum' ? 'active' : ''}" data-mode="spectrum">
                        <i class="ph-fill ph-chart-bar"></i> Spectrum
                    </button>
                    <button class="vis-mode-btn ${currentVisMode === 'waveform' ? 'active' : ''}" data-mode="waveform">
                        <i class="ph-fill ph-wave-sine"></i> Waveform
                    </button>
                    <button class="vis-mode-btn ${currentVisMode === 'particles' ? 'active' : ''}" data-mode="particles">
                        <i class="ph-fill ph-sparkle"></i> Cosmic Aura
                    </button>
                </div>

                <!-- Track Artwork & Metadata Display -->
                <div class="cassette-info-panel">
                    <div class="track-artwork-banner" style="background: linear-gradient(135deg, ${currentTrack.accent}25 0%, var(--hover-bg) 100%); border-color: ${currentTrack.accent}44;">
                        <div class="artwork-icon-badge" style="background-color: ${currentTrack.accent};">
                            <i class="ph-fill ${currentTrack.icon}"></i>
                        </div>
                        <div class="artwork-meta">
                            <span class="artwork-tag-pill" style="color: ${currentTrack.accent}; border-color: ${currentTrack.accent}66;">${currentTrack.tag}</span>
                            <h3 class="track-title-heading" id="now-playing-title">${currentTrack.title}</h3>
                            <p class="track-desc-sub" id="now-playing-desc">${currentTrack.desc}</p>
                        </div>
                    </div>

                    <div class="track-meta-pills">
                        <span class="meta-pill" id="now-playing-genre"><i class="ph-fill ph-music-notes"></i> ${currentTrack.genre}</span>
                        <span class="meta-pill" id="now-playing-bpm"><i class="ph-fill ph-metronome"></i> ${currentTrack.bpm}</span>
                        <span class="meta-pill" id="now-playing-duration"><i class="ph-fill ph-repeat"></i> ${currentTrack.duration}</span>
                    </div>
                </div>

                <!-- Cassette Controls Bar with Modern Volume Widget -->
                <div class="cassette-controls-bar">
                    <div class="transport-buttons">
                        <button class="deck-btn magnetic" id="deck-prev-btn" title="Previous Track (⏮)">
                            <i class="ph-fill ph-skip-back"></i>
                        </button>

                        <button class="deck-btn main-play-btn magnetic ${isPlaying ? 'active' : ''}" id="deck-play-btn" title="${isPlaying ? 'Pause' : 'Play'}" style="background-color: ${isPlaying ? currentTrack.accent : 'var(--text-color)'}">
                            <i class="ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'}"></i>
                        </button>

                        <button class="deck-btn magnetic" id="deck-next-btn" title="Next Track (⏭)">
                            <i class="ph-fill ph-skip-forward"></i>
                        </button>
                    </div>

                    <!-- Modernized Volume Control Widget -->
                    <div class="deck-volume-widget">
                        <button class="vol-mute-btn" id="deck-mute-btn" title="Toggle Mute">
                            <i class="ph-fill ${volPercent === 0 ? 'ph-speaker-slash' : 'ph-speaker-high'}"></i>
                        </button>
                        <div class="vol-slider-wrap">
                            <input type="range" id="deck-volume-slider" min="0" max="1" step="0.05" value="${(window.ambientVolume !== undefined ? window.ambientVolume : 0.3)}">
                        </div>
                        <span class="vol-percent-badge" id="deck-vol-label">${volPercent}%</span>
                    </div>
                </div>
            </div>

            <!-- Bottom Studio 2-Column Grid -->
            <div class="audio-studio-bottom-grid">
                <!-- Left Column (Wide 1.6fr): CURATED SOUNDSCAPE PLAYLIST CARDS -->
                <div class="playlist-cards-column">
                    <div class="playlist-section-header">
                        <h3 class="playlist-heading-clean">
                            <i class="ph-fill ph-playlist" style="color: #38bdf8;"></i> CURATED SOUNDSCAPE PLAYLIST
                        </h3>
                        <span class="playlist-count-badge">5 TRACKS</span>
                    </div>

                    <div class="playlist-cards-list" id="playlist-table-container">
                        ${playlist.map((track, idx) => {
                            const isThisActive = window.activeTrackId === track.id;
                            return `
                                <div class="playlist-card-item ${isThisActive ? 'active-track' : ''}" data-id="${track.id}" style="--track-row-accent: ${track.accent}">
                                    <!-- Card Header Row -->
                                    <div class="playlist-card-top">
                                        <div class="track-left-meta">
                                            <span class="track-num-badge">${String(idx + 1).padStart(2, '0')}</span>
                                            <div class="track-icon-mini" style="background-color: ${track.accent}22; color: ${track.accent};">
                                                <i class="ph-fill ${track.icon}"></i>
                                            </div>
                                            <div class="track-title-block">
                                                <strong class="track-name-clean">${track.title}</strong>
                                                <span class="genre-pill-clean" style="color: ${track.accent}; border-color: ${track.accent}44;">${track.tag}</span>
                                            </div>
                                        </div>

                                        <button class="track-play-circle-btn" data-id="${track.id}" style="background-color: ${isThisActive && window.isPlayingTrack ? track.accent : 'var(--hover-bg)'}; color: ${isThisActive && window.isPlayingTrack ? 'white' : 'var(--text-color)'}">
                                            <i class="ph-fill ${isThisActive && window.isPlayingTrack ? 'ph-pause' : 'ph-play'}"></i>
                                        </button>
                                    </div>

                                    <!-- Card Description & Footer Meta -->
                                    <div class="playlist-card-bottom">
                                        <p class="track-desc-clean">${track.desc}</p>
                                        <div class="track-footer-pills">
                                            <span class="track-foot-pill"><i class="ph-fill ph-metronome"></i> ${track.bpm}</span>
                                            <span class="track-foot-pill"><i class="ph-fill ph-repeat"></i> ${track.duration}</span>
                                            ${isThisActive && window.isPlayingTrack ? `
                                                <div class="bouncing-eq-icon">
                                                    <span class="eq-b1" style="background-color: ${track.accent}"></span>
                                                    <span class="eq-b2" style="background-color: ${track.accent}"></span>
                                                    <span class="eq-b3" style="background-color: ${track.accent}"></span>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Right Column (Sidebar 1fr): AMBIENT LAYER MIXER & FOCUS TIMER -->
                <div class="studio-side-column">
                    <!-- Ambient Sound Layer Mixer Card -->
                    <div class="ambient-mixer-card">
                        <h4 class="card-heading-sm"><i class="ph-fill ph-sliders" style="color: #c084fc;"></i> AMBIENT SOUND LAYER MIXER</h4>
                        <div class="mixer-sliders-list">
                            <div class="mixer-slider-item">
                                <div class="slider-info">
                                    <span><i class="ph-fill ph-disc" style="color: #fbbf24;"></i> Vinyl Record Crackle</span>
                                    <span class="slider-val" id="crackle-val-label">0%</span>
                                </div>
                                <input type="range" id="crackle-layer-slider" min="0" max="1" step="0.05" value="0">
                            </div>

                            <div class="mixer-slider-item">
                                <div class="slider-info">
                                    <span><i class="ph-fill ph-cloud-rain" style="color: #60a5fa;"></i> Gentle Rain Overlay</span>
                                    <span class="slider-val" id="rain-val-label">0%</span>
                                </div>
                                <input type="range" id="rain-layer-slider" min="0" max="1" step="0.05" value="0">
                            </div>
                        </div>
                    </div>

                    <!-- Developer Focus Pomodoro Timer Deck -->
                    <div class="pomodoro-timer-card">
                        <div class="pomo-card-header">
                            <div class="card-header-mini">
                                <i class="ph-fill ph-timer" style="color: #38bdf8;"></i>
                                <span>DEVELOPER FOCUS TIMER</span>
                            </div>
                            <span class="pomo-session-badge ${isPomodoroRunning ? 'active' : ''}" id="pomo-status-badge">
                                <i class="ph-fill ph-brain"></i> ${isPomodoroRunning ? 'FOCUSING' : 'READY'}
                            </span>
                        </div>

                        <div class="pomo-clock-frame">
                            <div class="pomo-display" id="pomo-timer-display">25:00</div>
                        </div>

                        <div class="pomo-presets-row">
                            <button class="pomo-preset-chip active" id="pomo-25m-btn"><i class="ph-fill ph-lightning"></i> 25 MIN FOCUS</button>
                            <button class="pomo-preset-chip" id="pomo-50m-btn"><i class="ph-fill ph-fire"></i> 50 MIN SPRINT</button>
                        </div>

                        <div class="pomo-actions-row">
                            <button class="pomo-btn main" id="pomo-start-btn">
                                <i class="ph-fill ${isPomodoroRunning ? 'ph-pause' : 'ph-play'}"></i>
                                <span>${isPomodoroRunning ? 'PAUSE' : 'START FOCUS'}</span>
                            </button>
                            <button class="pomo-btn secondary" id="pomo-reset-btn">
                                <i class="ph-fill ph-arrow-counter-clockwise"></i>
                                <span>RESET</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initAudioLoungeEvents() {
    // Deck Main Play Button
    const mainPlayBtn = document.getElementById('deck-play-btn');
    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.isPlayingTrack) {
                if (window.setSoundscape) window.setSoundscape('off');
            } else {
                const trackId = window.activeTrackId || 'lofi-chords';
                if (window.setSoundscape) window.setSoundscape(trackId);
            }
        });
    }

    // Prev / Next Track Buttons
    const prevBtn = document.getElementById('deck-prev-btn');
    const nextBtn = document.getElementById('deck-next-btn');
    const playlist = window.audioPlaylist || [];

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentIdx = playlist.findIndex(t => t.id === window.activeTrackId);
            const prevIdx = (currentIdx - 1 + playlist.length) % playlist.length;
            if (window.setSoundscape) window.setSoundscape(playlist[prevIdx].id);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentIdx = playlist.findIndex(t => t.id === window.activeTrackId);
            const nextIdx = (currentIdx + 1) % playlist.length;
            if (window.setSoundscape) window.setSoundscape(playlist[nextIdx].id);
        });
    }

    // Volume Sliders Listener
    const volSlider = document.getElementById('deck-volume-slider');
    const volLabel = document.getElementById('deck-vol-label');
    const muteBtn = document.getElementById('deck-mute-btn');

    if (volSlider) {
        volSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (volLabel) volLabel.textContent = Math.round(val * 100) + '%';
            if (muteBtn) {
                const icon = muteBtn.querySelector('i');
                if (icon) icon.className = `ph-fill ${val === 0 ? 'ph-speaker-slash' : 'ph-speaker-high'}`;
            }
            if (window.setAmbientVolume) window.setAmbientVolume(val);
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            if (volSlider) {
                const isCurrentlyMuted = parseFloat(volSlider.value) === 0;
                const newVol = isCurrentlyMuted ? 0.3 : 0;
                volSlider.value = newVol;
                if (volLabel) volLabel.textContent = Math.round(newVol * 100) + '%';
                const icon = muteBtn.querySelector('i');
                if (icon) icon.className = `ph-fill ${newVol === 0 ? 'ph-speaker-slash' : 'ph-speaker-high'}`;
                if (window.setAmbientVolume) window.setAmbientVolume(newVol);
            }
        });
    }

    const crackleSlider = document.getElementById('crackle-layer-slider');
    if (crackleSlider) {
        crackleSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            document.getElementById('crackle-val-label').textContent = Math.round(val * 100) + '%';
            if (window.setCrackleVolume) window.setCrackleVolume(val);
        });
    }

    const rainSlider = document.getElementById('rain-layer-slider');
    if (rainSlider) {
        rainSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            document.getElementById('rain-val-label').textContent = Math.round(val * 100) + '%';
            if (window.setRainOverlayVolume) window.setRainOverlayVolume(val);
        });
    }

    // Visualizer Mode Switchers
    document.querySelectorAll('.vis-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.vis-mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            window.visualizerMode = btn.getAttribute('data-mode');
        });
    });

    // Track Playlist Cards Click
    document.querySelectorAll('.playlist-card-item').forEach(card => {
        card.addEventListener('click', (e) => {
            const trackId = card.getAttribute('data-id');
            if (!trackId) return;

            if (window.activeTrackId === trackId && window.isPlayingTrack) {
                if (window.setSoundscape) window.setSoundscape('off');
            } else {
                if (window.setSoundscape) window.setSoundscape(trackId);
            }
        });
    });

    // Pomodoro Timer Buttons
    initPomodoroEvents();

    // Start Canvas Visualizer Loop
    initCanvasVisualizer();
}

function initPomodoroEvents() {
    const startBtn = document.getElementById('pomo-start-btn');
    const b25 = document.getElementById('pomo-25m-btn');
    const b50 = document.getElementById('pomo-50m-btn');
    const resetBtn = document.getElementById('pomo-reset-btn');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (isPomodoroRunning) {
                pausePomodoro();
            } else {
                startPomodoro();
            }
        });
    }

    if (b25) {
        b25.addEventListener('click', () => {
            setActivePresetChip(b25);
            setPomodoroTime(25 * 60);
        });
    }
    if (b50) {
        b50.addEventListener('click', () => {
            setActivePresetChip(b50);
            setPomodoroTime(50 * 60);
        });
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (b25) setActivePresetChip(b25);
            setPomodoroTime(25 * 60);
        });
    }
}

function setActivePresetChip(activeBtn) {
    document.querySelectorAll('.pomo-preset-chip').forEach(b => b.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');
}

function setPomodoroTime(seconds) {
    pausePomodoro();
    pomodoroSeconds = seconds;
    updatePomodoroDisplay();
}

function startPomodoro() {
    if (isPomodoroRunning) return;
    isPomodoroRunning = true;
    updatePomodoroStateUI();

    pomodoroTimerId = setInterval(() => {
        pomodoroSeconds--;
        updatePomodoroDisplay();

        if (pomodoroSeconds <= 0) {
            pausePomodoro();
            if (window.playSound) window.playSound('open');
            alert('🎉 Focus Session Completed! Take a quick break.');
        }
    }, 1000);
}

function pausePomodoro() {
    isPomodoroRunning = false;
    if (pomodoroTimerId) {
        clearInterval(pomodoroTimerId);
        pomodoroTimerId = null;
    }
    updatePomodoroStateUI();
}

function updatePomodoroStateUI() {
    const startBtn = document.getElementById('pomo-start-btn');
    const badge = document.getElementById('pomo-status-badge');

    if (startBtn) {
        startBtn.innerHTML = `
            <i class="ph-fill ${isPomodoroRunning ? 'ph-pause' : 'ph-play'}"></i>
            <span>${isPomodoroRunning ? 'PAUSE' : 'START FOCUS'}</span>
        `;
    }

    if (badge) {
        if (isPomodoroRunning) {
            badge.classList.add('active');
            badge.innerHTML = `<i class="ph-fill ph-brain"></i> FOCUSING`;
        } else {
            badge.classList.remove('active');
            badge.innerHTML = `<i class="ph-fill ph-brain"></i> READY`;
        }
    }
}

function updatePomodoroDisplay() {
    const display = document.getElementById('pomo-timer-display');
    if (!display) return;
    const m = Math.floor(pomodoroSeconds / 60);
    const s = pomodoroSeconds % 60;
    display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function initCanvasVisualizer() {
    const canvas = document.getElementById('audio-visualizer-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function syncCanvasWidth() {
        if (!canvas || !canvas.parentElement) return;
        const availableWidth = canvas.parentElement.clientWidth;
        if (availableWidth > 0) {
            canvas.width = Math.min(340, Math.max(120, availableWidth));
        }
    }
    syncCanvasWidth();

    let particleArray = [];
    for (let p = 0; p < 24; p++) {
        particleArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 2 + Math.random() * 3.5,
            vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8
        });
    }

    const resizeHandler = () => {
        if (document.getElementById('audio-visualizer-canvas')) {
            syncCanvasWidth();
        } else {
            window.removeEventListener('resize', resizeHandler);
        }
    };
    window.addEventListener('resize', resizeHandler, { passive: true });

    function renderFrame() {
        if (!document.getElementById('audio-visualizer-canvas')) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const mode = window.visualizerMode || 'spectrum';
        const isPlaying = window.isPlayingTrack;
        const playlist = window.audioPlaylist || [];
        const currentTrack = playlist.find(t => t.id === window.activeTrackId) || playlist[0];
        const accent = currentTrack.accent || '#38bdf8';

        if (mode === 'spectrum') {
            const bars = 24;
            for (let i = 0; i < bars; i++) {
                let barH = isPlaying ? (8 + Math.random() * (canvas.height - 14)) : 6;

                const x = i * (canvas.width / bars);
                const y = (canvas.height - barH) / 2;
                const grad = ctx.createLinearGradient(0, y, 0, y + barH);
                grad.addColorStop(0, accent);
                grad.addColorStop(1, '#c084fc');

                ctx.fillStyle = isPlaying ? grad : 'rgba(255, 255, 255, 0.4)';
                ctx.fillRect(x + 2, y, (canvas.width / bars) - 4, barH);
            }
        } else if (mode === 'waveform') {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = isPlaying ? accent : 'rgba(255, 255, 255, 0.45)';
            const time = Date.now() * 0.006;

            for (let x = 0; x < canvas.width; x += 4) {
                const amp = isPlaying ? 20 : 4;
                const y = (canvas.height / 2) + Math.sin(x * 0.05 + time) * amp;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        } else if (mode === 'particles') {
            particleArray.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, isPlaying ? p.r * 1.8 : p.r, 0, Math.PI * 2);
                ctx.fillStyle = isPlaying ? accent : 'rgba(255, 255, 255, 0.4)';
                ctx.fill();

                p.x += isPlaying ? p.vx : p.vx * 0.3;
                p.y += isPlaying ? p.vy : p.vy * 0.3;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });
        }

        requestAnimationFrame(renderFrame);
    }

    renderFrame();
}

window.updateAudioDeckUI = function() {
    const deckCard = document.getElementById('cassette-deck');
    if (!deckCard) return;

    const isPlaying = window.isPlayingTrack;
    const playlist = window.audioPlaylist || [];
    const currentTrack = playlist.find(t => t.id === window.activeTrackId) || playlist[0];

    deckCard.style.setProperty('--track-accent', currentTrack.accent);

    // Toggle Deck playing class
    if (isPlaying) {
        deckCard.classList.add('playing');
    } else {
        deckCard.classList.remove('playing');
    }

    // Toggle Tape Reel spinning class
    document.querySelectorAll('.tape-reel').forEach(reel => {
        if (isPlaying) reel.classList.add('spinning');
        else reel.classList.remove('spinning');
    });

    // Update LED text
    const ledText = deckCard.querySelector('.led-live-text');
    const ledDot = deckCard.querySelector('.deck-led-indicator');
    if (ledText) ledText.textContent = isPlaying ? '● ANALOG PLAYBACK' : '○ STANDBY';
    if (ledDot) {
        if (isPlaying) ledDot.classList.add('active');
        else ledDot.classList.remove('active');
    }

    // Update Now Playing Info
    const statusEl = document.getElementById('now-playing-status');
    const titleEl = document.getElementById('now-playing-title');
    const descEl = document.getElementById('now-playing-desc');
    const playBtn = document.getElementById('deck-play-btn');

    if (statusEl) statusEl.textContent = isPlaying ? 'NOW PLAYING' : 'READY TO PLAY';
    if (titleEl) titleEl.textContent = currentTrack.title;
    if (descEl) descEl.textContent = currentTrack.desc;

    if (playBtn) {
        playBtn.style.backgroundColor = isPlaying ? currentTrack.accent : 'var(--text-color)';
        const icon = playBtn.querySelector('i');
        if (icon) icon.className = `ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'}`;
    }

    // Update Playlist Cards
    document.querySelectorAll('.playlist-card-item').forEach((card) => {
        const cardId = card.getAttribute('data-id');
        const isThisActive = window.activeTrackId === cardId;
        const btn = card.querySelector('.track-play-circle-btn');
        const footPills = card.querySelector('.track-footer-pills');

        if (isThisActive) {
            card.classList.add('active-track');
            if (btn) {
                btn.style.backgroundColor = isPlaying ? currentTrack.accent : 'var(--hover-bg)';
                btn.style.color = isPlaying ? 'white' : 'var(--text-color)';
                const btnIcon = btn.querySelector('i');
                if (btnIcon) btnIcon.className = `ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'}`;
            }
            if (footPills) {
                let eq = footPills.querySelector('.bouncing-eq-icon');
                if (isPlaying && !eq) {
                    eq = document.createElement('div');
                    eq.className = 'bouncing-eq-icon';
                    eq.innerHTML = `
                        <span class="eq-b1" style="background-color: ${currentTrack.accent}"></span>
                        <span class="eq-b2" style="background-color: ${currentTrack.accent}"></span>
                        <span class="eq-b3" style="background-color: ${currentTrack.accent}"></span>
                    `;
                    footPills.appendChild(eq);
                } else if (!isPlaying && eq) {
                    eq.remove();
                }
            }
        } else {
            card.classList.remove('active-track');
            if (btn) {
                btn.style.backgroundColor = 'var(--hover-bg)';
                btn.style.color = 'var(--text-color)';
                const btnIcon = btn.querySelector('i');
                if (btnIcon) btnIcon.className = 'ph-fill ph-play';
            }
            if (footPills) {
                const eq = footPills.querySelector('.bouncing-eq-icon');
                if (eq) eq.remove();
            }
        }
    });
};
