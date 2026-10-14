---
trigger: model_decision
description: Apply when writing or editing any JavaScript, CSS, or HTML in src/ or index.html.
---

# Code Style Rules

Match what's already there. Consistency beats personal preference.

## JavaScript

- 4-space indent, semicolons, single quotes in JS logic, template literals for HTML.
- `const` by default, `let` when reassigned, never `var`.
- `function name() {}` declarations for anything global; arrow functions for callbacks.
- Guard optional globals: `if (window.playSound) playSound('click');` — files may load in any page state.
- Guard DOM lookups: `const el = document.getElementById('x'); if (!el) return;`
- Rendering: build HTML with template literals and `.map(...).join('')`. Never leave a stray comma from an un-joined array.
- **Escaping:** `data.js` fields that intentionally contain HTML (e.g. `whatsInside`) are trusted. Anything that comes from user input (chat box, command palette search, typing test) must be inserted with `textContent`, never `innerHTML`.
- No `console.log` left behind. No commented-out code blocks.
- Comments explain *why*, not *what*. Preserve existing comments you didn't change.

## Sound & interaction hooks

Use the existing sound vocabulary via `playSound(type)`: `'click'`, `'open'`, `'close'`, `'nav'`, `'key'`. Don't add new Web Audio graphs for simple UI feedback — extend `audio.js` instead.

## CSS

- 4-space indent, one selector per line in lists, kebab-case class names.
- Colors, fonts, shadows → `var(--token)` only (see `design-system` rule).
- Breakpoints in use: `992px`, `768px`, `480px` (`max-width`). Reuse these; don't invent new ones.
- Section headers use the existing banner comment style:
  ```css
  /* ==========================================
     SECTION NAME
     ========================================== */
  ```
- Avoid `!important`. Avoid IDs in selectors. Keep specificity flat.

## HTML

- Semantic elements (`section`, `article`, `nav`, `header`, `button` for actions, `a` for navigation).
- Every icon-only button gets `aria-label`. Every `<img>` gets meaningful `alt` (or `alt=""` if decorative).
- Icons: Phosphor classes `ph ph-<name>` (regular) or `ph-fill ph-<name>` (filled). Browse names at phosphoricons.com — don't guess.
- Internal links use hash routes: `href="#/projects"`. External links get `target="_blank" rel="noopener"`.
