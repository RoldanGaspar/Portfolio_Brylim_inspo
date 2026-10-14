---
name: add-page
description: >-
  Adds a new page/route to the portfolio SPA (e.g. #/talks, #/now, #/uses), or a
  detail route like #/blog/:id. Use when the user asks for a new page, section
  page, or sub-page.
---

# Add a Page / Route

Touch points (all required): view file → `index.html` script tag → `router.js` → sidebar link → command palette → CSS → docs.

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

5. **Route** in `router.js` `routes` map: `'#/talks': renderTalks,`
   For a detail route (`#/talks/:id`) add a `hash.startsWith('#/talks/')` branch next to the projects/shop branches, set `viewHash = '#/talks'`, and fall back to the list view if the id isn't found.

6. **Sidebar link** in `index.html` in the right `<ul>` group, with a Phosphor icon if the group uses icons:
   `<li><a href="#/talks"><span class="icon"><i class="ph ph-microphone-stage"></i></span> Talks</a></li>`

7. **Command palette** — add to `commandItems` in `src/js/utils/command-palette.js`:
   `{ title: "Talks", type: "Navigation", icon: "ph-microphone-stage", url: "#/talks" },`

8. **Styles** in `src/css/views.css` under a banner comment. Tokens only. Reuse existing list/card classes where possible.

9. **Verify** — run the `verify-locally` skill. The checker will error if the render function isn't loaded and warn if the sidebar link has no route.

10. **Docs** — add the route to the route table in `.agents/context/ARCHITECTURE.md`.
