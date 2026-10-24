---
name: add-page
description: >-
  Adds a new page/route to the portfolio SPA (e.g. #/talks, #/now, #/uses), or a
  detail route like #/blog/:id. Use when the user asks for a new page, section
  page, or sub-page.
---

# Add a Page / Route

Touch points (all required): view file → `index.html` script tag → `router.js` (`routes` + `routeMeta`) → sidebar link → command palette → CSS → docs.

## Steps

1. **Data first.** If the page shows content, add a collection to `src/js/data.js` (see `.agents/context/DATA_SCHEMA.md#adding-a-new-collection`). Don't hard-code content in the view.

2. **Create the view** `src/js/views/<name>.js`:

   ```js
   function renderTalks() {
       return `
           <div class="page-header reveal">
               <h2>talks</h2>
               <p class="page-desc">One honest sentence about this page.</p>
           </div>
           <div class="talks-list reveal">
               ${portfolioData.talks.map(t => `
                   <article class="talks-item">
                       <span class="blog-date">${t.date}</span>
                       <h3>${t.title}</h3>
                   </article>
               `).join('')}
           </div>
       `;
   }
   ```
   - Returns a string. No DOM access, no listeners.
   - Lowercase `<h2>` title; reuse `page-header`, `page-desc`, `reveal`.

3. **Interactivity (optional)** — add to the same file:

   ```js
   function initTalksEvents() {
       const root = document.querySelector('.talks-list');
       if (!root) return;            // runs on every route — must no-op elsewhere
       // bind listeners here
   }
   window.initTalksEvents = initTalksEvents;
   ```
   Then in `router.js` post-render block: `if (window.initTalksEvents) initTalksEvents();`

4. **Script tag** in `index.html`, inside the views group (after the other `views/*.js`, before `router.js`):
   `<script src="src/js/views/talks.js"></script>`

5. **Route & Metadata registration in `src/js/router.js`:**
   - Add to `routes` map: `'#/talks': renderTalks,`
   - **Crucial: Add to `routeMeta` map** so the page receives accurate SEO titles, OG tags, and screen-reader announcements:
     ```js
     '#/talks': {
         title: 'Talks — Roldan Gaspar',
         desc: 'Technical talks and presentations on software engineering and AI by Roldan Gaspar.'
     },
     ```
   - For a detail route (`#/talks/:id`), add a `hash.startsWith('#/talks/')` branch next to the projects/shop/blog branches in `router()`, set `viewHash = '#/talks'`, set dynamic `metaTitle` / `metaDesc` based on the item, and fall back to the list view if the ID isn't found.

6. **Sidebar link** in `index.html` in the right `<ul>` group, with a Phosphor icon if the group uses icons:
   `<li><a href="#/talks"><span class="icon"><i class="ph ph-microphone-stage"></i></span> Talks</a></li>`

7. **Command palette** — add to `commandItems` in `src/js/utils/command-palette.js`:
   `{ title: "Talks", type: "Navigation", icon: "ph-microphone-stage", url: "#/talks" },`

8. **Styles** in `src/css/views.css` under a banner comment. Tokens only. Reuse existing list/card classes where possible.

9. **Verify** — run the `verify-locally` skill:
   - `node .agents/skills/verify-locally/scripts/check.mjs` checks render function availability and routeMeta coverage.
   - Test navigation in browser: confirm `#route-announcer` updates ("Navigated to Talks — Roldan Gaspar") and browser tab title reflects the routeMeta title.

10. **Docs** — add the route to the route table in `.agents/context/ARCHITECTURE.md`.
