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

Forked/inspired from **Bryl Lim's portfolio** (repo name: `Portfolio_Brylim_inspo`). The layout, section structure, and some copy came from that inspiration. Part of the ongoing work is replacing inherited content with Roldan's real content. See `KNOWN_ISSUES.md` → "Unverified content".

## Voice

- First person, casual-professional, confident without hype.
- Lowercase page titles, monospace metadata labels.
- Show, don't claim: a linked certificate beats "expert in cybersecurity".

## Feature inventory (what exists today)

| Feature | Where |
|---|---|
| Hero with verified-badge confetti + toast | `views/home.js`, `utils/effects.js` |
| 3-card project stack deck (click side card to swap, center to open) | `views/home.js`, `utils/effects.js#initProjectsStack` |
| Project case-study pages `#/projects/:id` | `views/project-detail.js` |
| Certifications gallery with filters + lightbox + PDFs | `views/certifications-all.js` |
| Command palette (Ctrl/Cmd + K) | `utils/command-palette.js` |
| Terminal modal (Alt + K), typing test (Alt + J), community mini-game | `utils/modals.js` |
| Audio Lounge: 5 procedural tracks, visualizer, mixer, Pomodoro | `views/audio-lounge.js`, `utils/audio.js` |
| UI sound effects (off by default) | `utils/audio.js#playSound` |
| Rule-based "AI" chat widget (keyword matching, not an LLM) | `utils/ai-bot.js` |
| Light / dark / system theme | `utils/theme.js`, `css/tokens.css` |
| Shop, Blog, Gear, Resources, Collabs, Consulting pages | `views/*.js` |
| Fake GitHub contribution graph (random) | `components/github-graph.js` |
