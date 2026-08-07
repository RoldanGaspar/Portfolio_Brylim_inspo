<div align="center">

  <h1>✨ Roldan Gaspar — Software Engineer & AI Portfolio</h1>

  <p>
    <b>A high-performance, interactive developer portfolio built with Vanilla JavaScript, Web Audio API synthesis, dynamic 3D stack mechanics, and modern glassmorphic aesthetic.</b>
  </p>

  <p>
    <a href="https://roldangaspar.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Live_Demo-roldangaspar.vercel.app-38bdf8?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
    <img src="https://img.shields.io/badge/License-MIT-green.style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status" />
  </p>

  <br />

  <a href="https://roldangaspar.vercel.app"><b>🌐 Visit Live Portfolio →</b></a>

</div>

---

## 🌟 Key Features & Highlights

- **⚡ Interactive 3D Projects Stack Deck**:
  - Skeuomorphic 3D card swapping mechanics (`pos-center`, `pos-left`, `pos-right`) with soft ambient shadows, dual App Store badges, and case study routing (`#/projects/:id`).

- **💙 Blue Verified Checkmark Confetti Explosion**:
  - Interactive verified checkmark badge next to name triggering 360° spin, 40+ radial particle blast (`💙`, `✨`, `⚡`, `✔️`), Web Audio chime, and floating authentication toast.

- **🔍 Spotlight Command Palette (`Ctrl + K` / `Cmd + K`)**:
  - Instant search modal for real-time filtering across all routes, projects, tech stack, blog posts, gear, and audio tracks.

- **🎧 Web Audio Studio & Soundscape Engine (`#/audio`)**:
  - Procedural Web Audio API synthesizers generating 5 ambient focus tracks (*Midnight Lo-Fi Chords*, *Late Night Rain & Coffee*, *Cyberpunk Synthwave Pulse*, *Space Echo Piano*, *Cherry MX Blue Keyboard ASMR*).
  - Features spinning cassette tape reels, dark chassis visualizer canvas (Spectrum, Waveform, Cosmic Particles), multi-layer ambient sound mixer (*Vinyl Crackle* & *Rain Overlay*), and Developer Focus Pomodoro timer.

- **💬 Redesigned Recommendations & Certifications**:
  - 3-card grid with Phosphor quote icons, monospace tags, `{ VERIFY }` links, and sleek high-contrast hover accents.

- **↗️ Hero Stats Bar**:
  - Borderless vertical divider layout with diagonal arrow lifting animation (`transform: translate(3px, -3px)`).

---

## 🛠️ Technology Stack

- **Core**: Vanilla HTML5, JavaScript (ES6 Modules)
- **Styling**: Vanilla CSS3 (Custom Tokens, Glassmorphism, Dark/Light Mode Themes)
- **Audio & Visuals**: Web Audio API (Procedural Oscillators & Gain Nodes), HTML5 Canvas API
- **Icons & Typography**: Phosphor Icons, Google Fonts (*Inter*, *Space Mono*)
- **Hosting & Deployment**: Vercel CDN

---

## 📁 Directory Structure

```text
PORTFOLIO/
├── index.html              # Main HTML entry point & sidebar layout
├── vercel.json             # Vercel deployment configuration
├── MyPic.png               # Profile picture & browser tab favicon
├── src/
│   ├── css/
│   │   ├── main.css        # Global CSS entry
│   │   ├── tokens.css      # Theme variables & color design tokens
│   │   ├── layout.css      # App container, sidebar, & responsive grids
│   │   ├── components.css  # Buttons, cards, modals, & confetti styles
│   │   ├── views.css       # Page-specific views & 3D card deck styles
│   │   └── animations.css # Smooth keyframe transitions & entrance reveals
│   └── js/
│       ├── app.js          # App initialization & global state listeners
│       ├── data.js         # Portfolio content database (Projects, Recs, Certs)
│       ├── router.js       # Hash-based Single Page Application router
│       ├── views/          # Modular page view renderers
│       │   ├── home.js
│       │   ├── audio-lounge.js
│       │   ├── projects-all.js
│       │   ├── project-detail.js
│       │   ├── recommendations-all.js
│       │   └── ...
│       └── utils/
│           ├── audio.js    # Procedural Web Audio API Soundscape engine
│           ├── effects.js  # Confetti explosion, 3D card tilt & swap logic
│           └── command-palette.js # Spotlight search modal (Ctrl+K)
```

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RoldanGaspar/Portfolio_Brylim_inspo.git
   cd Portfolio_Brylim_inspo
   ```

2. **Run locally**:
   Since the app uses standard ES6 modules, serve it using any local HTTP server:
   ```bash
   # Using VS Code Live Server extension or npx serve:
   npx serve .
   ```

3. Open `http://localhost:3000` (or `http://127.0.0.1:5500`) in your browser.

---

## 🚀 Deployment

The site is configured for automatic deployment on **Vercel**:

```bash
npx vercel --prod
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ by <b>Roldan Gaspar</b></sub>
</div>
