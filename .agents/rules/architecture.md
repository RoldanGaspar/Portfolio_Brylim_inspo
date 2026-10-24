---
trigger: always_on
---

# Architecture Rules

These describe how the code ACTUALLY works. Breaking them breaks the live site.

## 1. No build step

- The site is served as-is from the repo root by Vercel (`vercel.json`: `cleanUrls: true`).
- Do NOT add: npm packages, `package.json` dependencies, bundlers (Vite/Webpack), TypeScript, JSX, Tailwind, SCSS, or frameworks — unless the user explicitly requests a migration.
- External libraries are allowed only via CDN `<script>`/`<link>` in `index.html`, and only with user approval. Currently: Phosphor Icons (unpkg), Google Fonts (Inter, Space Mono).

## 2. Classic scripts + globals (NOT ES modules)

- Every JS file is loaded with a plain `<script src>` in `index.html`. Functions declared at top level become globals.
- **Never use `import` / `export`**, and never add `type="module"` to one file in isolation — it would hide its globals from everything else.
- Load order in `index.html` matters: `data.js` → components → utils → views → `router.js` → `app.js`. A new file must be inserted in the correct group, before anything that calls it at load time.
- Name collisions are a real risk (everything shares one scope). Before adding a top-level name, search the codebase for it. Prefer specific names (`initPomodoroEvents`, not `init`).
- Put module-private helpers inside the init function or a closure, not at top level.

## 3. Data lives in `src/js/data.js`

- `window.portfolioData` is the single source for content. Views read from it; they never own content.
- Exceptions currently exist (hard-coded content in `home.js`, `stack-all.js`, `ai-bot.js`, `command-palette.js`). See `.agents/context/DATA_SCHEMA.md#duplication-map`. Don't add new exceptions.

## 4. View contract

- A view is `function renderX(...)` in `src/js/views/x.js` that **returns an HTML string**. It must not touch the DOM or attach listeners.
- Interactivity goes in an `initX()` function, exposed on `window`, and invoked from the post-render hook block in `router.js` (`if (window.initX) initX();`). Elements are recreated on every navigation, so listeners must be re-bound each render — never rely on listeners surviving a route change.
- Routes are registered in the `routes` map in `router.js`. Detail routes (`#/projects/:id`, `#/shop/:id`) are parsed by prefix before the map lookup.
- Add the nav link in `index.html` sidebar AND an entry in `commandItems` in `command-palette.js`.

## 5. CSS layering

- Entry: `src/css/main.css` imports in this order: `tokens.css` → `layout.css` → `components.css` → `views.css` → `animations.css`. Don't change the order.
- Tokens/theme vars → `tokens.css`. App shell/sidebar/grid → `layout.css`. Reusable pieces → `components.css`. Page-specific → `views.css`. Keyframes → `animations.css`.
- Don't create new CSS files without a reason; if you do, `@import` them in `main.css`.

## 6. Legacy files — resolved

Legacy root files (`/data.js`, `/main.js`, `/style.css`) from the original template fork were unreferenced dead code (~88.6 KB) and were safely deleted in Phase 2 with explicit approval (see `DECISIONS.md#D-010`). All active application code lives strictly under `src/js/` and `src/css/`. Do not recreate loose files at the repo root.
