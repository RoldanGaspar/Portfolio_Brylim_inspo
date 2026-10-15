let soundEnabled = false;
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

let ambientSource = null;
let ambientGain = null;
let crackleSource = null;
let crackleGain = null;
let rainOverlaySource = null;
let rainOverlayGain = null;

let currentSoundscape = 'off'; // 'off', 'lofi', 'rain', 'synthwave', 'piano', 'keyboard'
let ambientVolume = 0.5; // Default master volume set to 50%
let crackleVolume = 0;
let rainOverlayVolume = 0;

let analyserNode = null;
let activeTrackId = null;
let isPlayingTrack = false;
let soundscapeTimer = null;
let activeOscillators = [];
let visualizerMode = 'spectrum'; // 'spectrum', 'waveform', 'particles'

window.audioPlaylist = [
    { id: "lofi-chords", title: "Midnight Lo-Fi Chords", genre: "Chillhop / Lo-Fi", bpm: "80 BPM", duration: "∞ Loop", desc: "Soothing 7th chord progressions for deep focus coding.", icon: "ph-moon-stars", accent: "#38bdf8", tag: "CYBER LO-FI" },
    { id: "rain-coffee", title: "Late Night Rain & Coffee", genre: "Ambient Soundscape", bpm: "65 BPM", duration: "∞ Loop", desc: "Cozy white noise rain filtered through warm coffee shop ambience.", icon: "ph-cloud-rain", accent: "#60a5fa", tag: "AMBIENT RAIN" },
    { id: "synthwave", title: "Cyberpunk Synthwave Pulse", genre: "Electronic / Synth", bpm: "120 BPM", duration: "∞ Loop", desc: "Energetic synth basslines for hackathons and fast shipping.", icon: "ph-lightning", accent: "#c084fc", tag: "SYNTHWAVE" },
    { id: "piano-pads", title: "Space Echo Piano", genre: "Ambient / Classical", bpm: "72 BPM", duration: "∞ Loop", desc: "Minimalist ambient piano with space echo delay.", icon: "ph-sparkle", accent: "#f472b6", tag: "SPACE PIANO" },
    { id: "keyboard-asmr", title: "Cherry MX Blue Keyboard ASMR", genre: "Foley / ASMR", bpm: "100 BPM", duration: "∞ Loop", desc: "Satisfying mechanical typing cadence.", icon: "ph-keyboard", accent: "#34d399", tag: "ASMR FOLEY" },
    { id: "binaural-flow", title: "40Hz Deep Focus Binaural Beats", genre: "Binaural / Brainwave", bpm: "40 Hz", duration: "∞ Loop", desc: "Pure Gamma wave binaural tone for peak flow-state concentration.", icon: "ph-brain", accent: "#2dd4bf", tag: "FLOW STATE" }
];

function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new AudioCtx();
        analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 64;
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    initAudioContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.value = 600;
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.08);
    } else if (type === 'nav') {
        osc.type = 'sine';
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.06);
    } else if (type === 'open') {
        osc.type = 'sine';
        osc.frequency.value = 440;
        gain.gain.setValueAtTime(0.22, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.15);
    } else if (type === 'close') {
        osc.type = 'sine';
        osc.frequency.value = 660;
        gain.gain.setValueAtTime(0.22, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(330, audioCtx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.15);
    } else if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.value = 1200;
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.04);
    }
}

function setAmbientVolume(val) {
    ambientVolume = parseFloat(val);
    if (ambientGain && audioCtx) {
        ambientGain.gain.setValueAtTime(ambientVolume * 0.7, audioCtx.currentTime);
    }
}

function setCrackleVolume(val) {
    crackleVolume = parseFloat(val);
    if (crackleVolume > 0 && !crackleSource) {
        startCrackleLayer();
    } else if (crackleVolume === 0 && crackleSource) {
        stopCrackleLayer();
    }
    if (crackleGain && audioCtx) {
        crackleGain.gain.setValueAtTime(crackleVolume * 0.4, audioCtx.currentTime);
    }
}

function setRainOverlayVolume(val) {
    rainOverlayVolume = parseFloat(val);
    if (rainOverlayVolume > 0 && !rainOverlaySource) {
        startRainOverlayLayer();
    } else if (rainOverlayVolume === 0 && rainOverlaySource) {
        stopRainOverlayLayer();
    }
    if (rainOverlayGain && audioCtx) {
        rainOverlayGain.gain.setValueAtTime(rainOverlayVolume * 0.45, audioCtx.currentTime);
    }
}

function startCrackleLayer() {
    initAudioContext();
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() > 0.985 ? (Math.random() * 2 - 1) * 0.8 : 0;
    }

    crackleSource = audioCtx.createBufferSource();
    crackleSource.buffer = buffer;
    crackleSource.loop = true;

    crackleGain = audioCtx.createGain();
    crackleGain.gain.setValueAtTime(crackleVolume * 0.4, audioCtx.currentTime);

    crackleSource.connect(crackleGain);
    crackleGain.connect(audioCtx.destination);
    crackleSource.start();
}

function stopCrackleLayer() {
    if (crackleSource) {
        try { crackleSource.stop(); } catch(e){}
        crackleSource = null;
    }
}

function startRainOverlayLayer() {
    initAudioContext();
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    rainOverlaySource = audioCtx.createBufferSource();
    rainOverlaySource.buffer = buffer;
    rainOverlaySource.loop = true;

    rainOverlayGain = audioCtx.createGain();
    rainOverlayGain.gain.setValueAtTime(rainOverlayVolume * 0.45, audioCtx.currentTime);

    rainOverlaySource.connect(filter);
    filter.connect(rainOverlayGain);
    rainOverlayGain.connect(audioCtx.destination);
    rainOverlaySource.start();
}

function stopRainOverlayLayer() {
    if (rainOverlaySource) {
        try { rainOverlaySource.stop(); } catch(e){}
        rainOverlaySource = null;
    }
}

function toggleSoundscapes() {
    initAudioContext();
    const btn = document.getElementById('soundscape-toggle-btn');
    const icon = btn ? btn.querySelector('i') : null;

    if (isPlayingTrack || soundEnabled) {
        // Currently playing/enabled -> MUTE
        soundEnabled = false;
        stopSoundscape();
        if (icon) icon.className = 'ph-fill ph-speaker-slash';
        showAudioToast('🔇 Audio Muted');
    } else {
        // Currently muted -> UNMUTE sound FX (or resume current track if active)
        soundEnabled = true;
        if (icon) icon.className = 'ph-fill ph-speaker-high';
        if (activeTrackId) {
            setSoundscape(activeTrackId);
        } else {
            showAudioToast('🔊 Audio Enabled');
        }
    }
}

function setSoundscape(mode) {
    initAudioContext();
    soundEnabled = true;
    stopSoundscape();

    currentSoundscape = mode;
    const btn = document.getElementById('soundscape-toggle-btn');
    const icon = btn ? btn.querySelector('i') : null;

    if (mode === 'rain' || mode === 'rain-coffee') {
        activeTrackId = 'rain-coffee';
        isPlayingTrack = true;
        if (icon) icon.className = 'ph-fill ph-speaker-high';
        startRainSoundscape();
        showAudioToast('🌧️ Playing Late Night Rain & Coffee');
    } else if (mode === 'lofi' || mode === 'lofi-chords') {
        activeTrackId = 'lofi-chords';
        isPlayingTrack = true;
        if (icon) icon.className = 'ph-fill ph-speaker-high';
        startLofiSoundscape();
        showAudioToast('🎧 Playing Midnight Lo-Fi Chords');
    } else if (mode === 'synthwave') {
        activeTrackId = 'synthwave';
        isPlayingTrack = true;
        if (icon) icon.className = 'ph-fill ph-speaker-high';
        startSynthwaveSoundscape();
        showAudioToast('⚡ Playing Cyberpunk Synthwave Pulse');
    } else if (mode === 'piano-pads') {
        activeTrackId = 'piano-pads';
        isPlayingTrack = true;
        if (icon) icon.className = 'ph-fill ph-speaker-high';
        startPianoSoundscape();
        showAudioToast('🎹 Playing Space Echo Piano');
    } else if (mode === 'keyboard-asmr') {
        activeTrackId = 'keyboard-asmr';
        isPlayingTrack = true;
        if (icon) icon.className = 'ph-fill ph-speaker-high';
        startKeyboardASMR();
        showAudioToast('⌨️ Playing Cherry MX Blue Keyboard ASMR');
    } else if (mode === 'binaural-flow') {
        activeTrackId = 'binaural-flow';
        isPlayingTrack = true;
        if (icon) icon.className = 'ph-fill ph-speaker-high';
        startBinauralSoundscape();
        showAudioToast('🧠 Playing 40Hz Deep Focus Binaural Beats');
    } else {
        activeTrackId = null;
        isPlayingTrack = false;
        if (icon) icon.className = 'ph-fill ph-speaker-slash';
        showAudioToast('🔇 Soundscape Muted');
    }

    window.isPlayingTrack = isPlayingTrack;
    window.activeTrackId = activeTrackId;

    if (window.updateAudioDeckUI) window.updateAudioDeckUI();
}

function stopSoundscape() {
    isPlayingTrack = false;
    currentSoundscape = 'off';
    window.isPlayingTrack = false;

    if (soundscapeTimer) {
        clearTimeout(soundscapeTimer);
        soundscapeTimer = null;
    }

    activeOscillators.forEach(osc => {
        try { osc.stop(); } catch(e){}
    });
    activeOscillators = [];

    if (ambientSource) {
        try { ambientSource.stop(); } catch(e){}
        ambientSource = null;
    }
}

function startRainSoundscape() {
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(ambientVolume * 0.7, audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(ambientGain);
    if (analyserNode) ambientGain.connect(analyserNode);
    ambientGain.connect(audioCtx.destination);

    noise.start();
    ambientSource = noise;
}

function startLofiSoundscape() {
    const chordFrequencies = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    let chordIdx = 0;
    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(ambientVolume * 0.75, audioCtx.currentTime);
    if (analyserNode) ambientGain.connect(analyserNode);
    ambientGain.connect(audioCtx.destination);

    function playChord() {
        if (currentSoundscape !== 'lofi' && currentSoundscape !== 'lofi-chords') return;

        const freqs = chordFrequencies[chordIdx];
        chordIdx = (chordIdx + 1) % chordFrequencies.length;

        freqs.forEach(freq => {
            const osc = audioCtx.createOscillator();
            const noteGain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.value = freq;

            noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
            noteGain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.6);
            noteGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.5);

            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 850;

            osc.connect(filter);
            filter.connect(noteGain);
            noteGain.connect(ambientGain);

            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 3.8);

            activeOscillators.push(osc);
        });

        soundscapeTimer = setTimeout(playChord, 3800);
    }

    playChord();
}

function startSynthwaveSoundscape() {
    const bassNotes = [110, 110, 130.81, 146.83, 164.81];
    let noteIdx = 0;

    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(ambientVolume * 0.7, audioCtx.currentTime);
    if (analyserNode) ambientGain.connect(analyserNode);
    ambientGain.connect(audioCtx.destination);

    function playPulse() {
        if (currentSoundscape !== 'synthwave') return;

        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.value = bassNotes[noteIdx];
        noteIdx = (noteIdx + 1) % bassNotes.length;

        noteGain.gain.setValueAtTime(0.22, audioCtx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1400;

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(ambientGain);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.35);

        activeOscillators.push(osc);

        soundscapeTimer = setTimeout(playPulse, 400);
    }

    playPulse();
}

function startPianoSoundscape() {
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    let idx = 0;

    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(ambientVolume * 0.7, audioCtx.currentTime);
    if (analyserNode) ambientGain.connect(analyserNode);
    ambientGain.connect(audioCtx.destination);

    function playPianoNote() {
        if (currentSoundscape !== 'piano-pads') return;

        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.value = notes[idx];
        idx = (idx + 1) % notes.length;

        noteGain.gain.setValueAtTime(0.28, audioCtx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.4);

        osc.connect(noteGain);
        noteGain.connect(ambientGain);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 2.5);

        activeOscillators.push(osc);

        soundscapeTimer = setTimeout(playPianoNote, 1800);
    }

    playPianoNote();
}

function startKeyboardASMR() {
    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(ambientVolume * 0.75, audioCtx.currentTime);
    if (analyserNode) ambientGain.connect(analyserNode);
    ambientGain.connect(audioCtx.destination);

    function typeClick() {
        if (currentSoundscape !== 'keyboard-asmr') return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.value = 600 + Math.random() * 500;

        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ambientGain);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.05);

        activeOscillators.push(osc);

        const delay = 120 + Math.random() * 240;
        soundscapeTimer = setTimeout(typeClick, delay);
    }

    typeClick();
}

function startBinauralSoundscape() {
    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(ambientVolume * 0.7, audioCtx.currentTime);
    if (analyserNode) ambientGain.connect(analyserNode);
    ambientGain.connect(audioCtx.destination);

    // Dual detuned oscillators: 200 Hz & 240 Hz create a 40 Hz Gamma wave binaural tone
    const oscLeft = audioCtx.createOscillator();
    const oscRight = audioCtx.createOscillator();
    const subDrone = audioCtx.createOscillator();

    const gainLeft = audioCtx.createGain();
    const gainRight = audioCtx.createGain();
    const gainSub = audioCtx.createGain();

    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(200, audioCtx.currentTime);

    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(240, audioCtx.currentTime);

    subDrone.type = 'triangle';
    subDrone.frequency.setValueAtTime(100, audioCtx.currentTime);

    gainLeft.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gainRight.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gainSub.gain.setValueAtTime(0.12, audioCtx.currentTime);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    subDrone.connect(filter);
    filter.connect(gainSub);
    gainSub.connect(ambientGain);

    oscLeft.connect(gainLeft);
    gainLeft.connect(ambientGain);

    oscRight.connect(gainRight);
    gainRight.connect(ambientGain);

    oscLeft.start();
    oscRight.start();
    subDrone.start();

    activeOscillators.push(oscLeft, oscRight, subDrone);
}

function showAudioToast(text) {
    let toast = document.getElementById('audio-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'audio-toast';
        toast.className = 'verified-toast-banner';
        document.body.appendChild(toast);
    }
    toast.innerHTML = text;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

function initSoundToggle() {
    const btn = document.getElementById('soundscape-toggle-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSoundscapes();
        });
    }
}

// Expose globals for UI controllers
window.playSound = playSound;
window.toggleSoundscapes = toggleSoundscapes;
window.setSoundscape = setSoundscape;
window.setAmbientVolume = setAmbientVolume;
window.setCrackleVolume = setCrackleVolume;
window.setRainOverlayVolume = setRainOverlayVolume;
window.initSoundToggle = initSoundToggle;
