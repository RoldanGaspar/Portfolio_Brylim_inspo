# Responsiveness Roadmap: Multi-Device & Mobile Optimization Plan

> Step-by-step engineering roadmap for optimizing [roldangaspar.vercel.app](https://roldangaspar.vercel.app) across all mobile devices (320px–480px), tablets (768px–1024px), and desktops (1200px+).

---

## 🗺️ Roadmap Architecture Overview

```mermaid
flowchart LR
    P1["Phase 1<br/><b>Shell & Safe Areas</b><br/>• 100dvh & iOS Safe Area<br/>• Mobile Drawer Navigation<br/>• Touch Target Sizing (44px)"]
    --> P2["Phase 2<br/><b>Hero & Projects Stack</b><br/>• Fluid clamp() Typography<br/>• Neon Tagline Wrapping<br/>• 3D Stack Deck Responsive Fit"]
    --> P3["Phase 3<br/><b>Modals & AI Drawer</b><br/>• Contact Bottom-Sheet<br/>• Guestbook Mobile Split<br/>• AI Chat Drawer Full-Width"]
    --> P4["Phase 4<br/><b>Audio & Game Canvases</b><br/>• Fluid Audio Visualizer Canvas<br/>• Responsive 2D Game & D-Pad<br/>• Cassette Deck Mobile Touch"]
    --> P5["Phase 5<br/><b>Grids & Scroll Polish</b><br/>• Fluid 1-to-2 Column Grids<br/>• GitHub Calendar Scroll Hint<br/>• Shop & Project Detail Stacking"]
```

---

## 📋 Phase 1: App Shell, Mobile Drawer & Safe Areas `[COMPLETED ✅ - Commit e55b3fc]`
**Goal:** Perfect the core mobile frame, prevent content clipping under browser toolbars/home indicators, and ensure accessible touch targets.

### Scope of Work
1. **Dynamic Viewport & Safe Area Tokens (`tokens.css`):**
   - Defined `--safe-top`, `--safe-bottom`, `--safe-left`, and `--safe-right` using standard `env(...)` insets.
   - Upgraded mobile header to account for top notch/Dynamic Island (`height: calc(60px + var(--safe-top))`).
   - Upgraded mobile drawer height to `calc(100dvh - 60px - var(--safe-top))` with bottom safe area padding `calc(28px + var(--safe-bottom))` so theme and contact buttons are never clipped.
2. **Smooth Drawer Scrolling & Momentum:**
   - Added `-webkit-overflow-scrolling: touch;` and `overscroll-behavior: contain;` for buttery smooth mobile scrolling.
   - Upgraded backdrop blur to `blur(24px)`.
3. **Touch Targets (44px WCAG Guideline):**
   - Configured `#mobile-menu-toggle`, `.theme-btn`, `.sound-btn`, `.sidebar-contact-btn`, and navigation links with minimum 44x44px touch targets.
   - Verified live in production at [roldangaspar.vercel.app](https://roldangaspar.vercel.app).

---

## 📋 Phase 2: Hero Section, Neon Badges & Projects Stack
**Goal:** Ensure the portfolio homepage looks crisp, proportional, and unclipped on narrow mobile viewports (320px–400px).

### Scope of Work
1. **Fluid Hero Typography & Image:**
   - Use CSS `clamp(1.6rem, 5vw, 2.4rem)` for `.hero-title` to prevent awkward word wrapping.
   - Scale `.hero-image-container` fluidly on ultra-compact screens.
2. **Neon Badge Wrapping:**
   - Make `.hero-neon-tagline` wrap cleanly with consistent 8px gaps and centered alignment on mobile.
3. **Projects Stack Deck Mobile Fit:**
   - Optimize `.projects-stack-container` on `< 400px` phones: adjust `translateX(-50px)` / `translateX(50px)` and scale so side cards don't create horizontal page spillover.
   - Add a subtle swipe indicator / visual card hint.

---

## 📋 Phase 3: Interactive Modals & AI Chatbot Drawer
**Goal:** Transform desktop-centric popups into natural mobile bottom-sheets and responsive overlay panels.

### Scope of Work
1. **Contact Modal & Guestbook Modal Mobile Bottom-Sheet:**
   - On screens `< 600px`, anchor `.contact-modal-card` and `.guestbook-modal-card` to the bottom of the viewport with rounded top corners (`border-radius: 20px 20px 0 0`) and `max-height: 90dvh`.
   - Stack guestbook form and notes feed vertically with smooth touch scrolling.
2. **AI Chatbot Drawer Responsiveness:**
   - On screens `< 480px`, expand `.ai-chat-drawer` to full width (`width: 100%; right: 0; bottom: 0; border-radius: 20px 20px 0 0; height: 85dvh;`).
   - Prevent mobile on-screen keyboard from breaking drawer layout.
3. **Terminal & Typing Modals:**
   - Adjust terminal font size and horizontal padding for easy reading on phones.

---

## 📋 Phase 4: Audio Studio & 2D Mini-Game Canvas Scaling
**Goal:** Ensure canvas-driven experiences resize fluidly without horizontal overflow or pixel distortion.

### Scope of Work
1. **Responsive Audio Visualizer Canvas (`#/audio`):**
   - Make `#audio-visualizer-canvas` fluidly fill the tape bridge width (`width: 100%`) rather than fixed 340px.
   - Polish mobile layout of the Hi-Fi cassette deck, Pomodoro widget, and volume slider.
2. **2D Dev Lounge Canvas Scaling:**
   - In `modals.js`, dynamically calculate `#game-canvas` width based on viewport width (`Math.min(600, window.innerWidth - 40)`).
   - Ensure the mobile on-screen D-pad is comfortably reachable with thumbs.

---

## 📋 Phase 5: Content Grids, Detail Views & GitHub Scroll Hint
**Goal:** Refine all multi-card galleries, detail pages, and horizontal overflow sections.

### Scope of Work
1. **Fluid Gallery Grids:**
   - Update `.certs-full-grid`, `.shop-grid`, `.recs-full-grid`, `.gear-grid`, `.consulting-grid` to smoothly adapt from 3 columns (desktop) to 2 columns (tablet) and 1 column (mobile).
2. **GitHub Contribution Calendar Mobile Indicator:**
   - Add a subtle horizontal scroll hint with gradient fade indicator on `.github-graph-container` so mobile users know they can swipe through the 52 weeks.
3. **Shop & Project Detail Stacking:**
   - Ensure sticky meta sidebars in `#/projects/:id` and `#/shop/:id` un-stick and stack gracefully above/below the main content on mobile screens.

---

## 🚦 Execution Protocol
1. **Plan & Report:** Formulate exact file diffs before making changes.
2. **Await Approval:** Strict chain of user approval (`"APPROVED"`) before each phase is executed.
3. **Verify Locally:** `node .agents/skills/verify-locally/scripts/check.mjs` must pass with `0 errors`.
4. **Deploy & Verify:** Commit, push to `main`, and verify on [roldangaspar.vercel.app](https://roldangaspar.vercel.app).
