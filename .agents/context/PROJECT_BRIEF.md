# Project Brief

## Owner

**Roldan Gaspar** — Software Engineer · AI · Cybersecurity Enthusiast · Pampanga, Philippines
Contact: `gaspar26roldan@gmail.com`

Verified credential trail: 9 Cisco Networking Academy certificates (JavaScript Essentials 1 & 2, Python Essentials 1 & 2, Network Defense, Ethical Hacker, Data Analytics Essentials, Networking Basics, Introduction to Cybersecurity), AWS Educate Cloud 101, and 5 NetAcad achievement badges — all dated 2026.

> Anything about Roldan not listed here or in the content-integrity rule is unverified. Ask before using it.

## Purpose of the site

1. **Get hired / get clients** — recruiters and potential clients should, within ~30 seconds, understand who Roldan is, what he can build, and how to contact him.
2. **Prove skill through craft** — the site itself is a portfolio piece (micro-interactions, audio lounge, command palette).
3. **Credibility** — every claim should be checkable (credential links, real projects, real repos).

## Audience (in priority order)

1. Recruiters / hiring managers (skim, mobile, short attention)
2. Potential freelance/consulting clients
3. Fellow developers (will open DevTools, view source, try Ctrl+K)

## Origin

Forked/inspired from **Bryl Lim's portfolio** (repo name: `Portfolio_Brylim_inspo`). All inherited template content was audited and replaced with Roldan Gaspar's verified credentials, active GitHub repositories, and Pampanga workstation setup (see `KNOWN_ISSUES.md` → "Content Integrity Status").

## Voice

- First person, casual-professional, confident without hype.
- Lowercase page titles, monospace metadata labels.
- Show, don't claim: a linked certificate beats "expert in cybersecurity".

## Feature inventory (what exists today)

| Feature | Where |
|---|---|
| Hero with verified-badge confetti + toast | `views/home.js`, `utils/effects.js` |
| 3-card project stack deck (click side card to swap, center to open) | `views/home.js`, `utils/effects.js#initProjectsStack` |
| 4-project gallery & deep-dive case studies `#/projects/:id` with system architecture blueprints, copy-link, and prev/next navigation | `views/projects-all.js`, `views/project-detail.js` |
| CyberOps & Network Defense Lab `#/cyber-lab` with interactive SOC telemetry & packet simulator | `views/cyber-lab.js` |
| Certifications gallery with filters + lightbox + PDFs | `views/certifications-all.js` |
| Command palette (Ctrl/Cmd + K) dynamically backed by `window.portfolioData` | `utils/command-palette.js` |
| Terminal modal (Alt + K), typing test (Alt + J), Cyber-Loft Dev Lounge with realtime visitor presence & collaborative chat | `utils/modals.js` |
| Audio Lounge: 6 procedural tracks (including 40Hz Deep Focus Binaural Beats), visualizer, mixer, Pomodoro | `views/audio-lounge.js`, `utils/audio.js` |
| UI sound effects (off by default) | `utils/audio.js#playSound` |
| Grounded AI Assistant widget dynamically backed by `window.portfolioData` | `utils/ai-bot.js` |
| Real 365-day GitHub contribution graph & featured open-source repositories | `components/github-graph.js` |
| Supabase-backed Contact Modal, Live Visitor Counter & Developer Guestbook with PostgreSQL RLS | `utils/supabase-client.js` |
| Printable ATS HTML Resume & downloadable DOCX Developer Resume Template | `assets/resume/`, `views/shop-detail.js` |
| Light / dark / system theme + dynamic per-route SEO metadata & JSON-LD | `utils/theme.js`, `css/tokens.css`, `router.js`, `index.html` |
| Shop, Blog, Gear, Resources, Experience, Stack, Recommendations, Consulting pages | `views/*.js` |

