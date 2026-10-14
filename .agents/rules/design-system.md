---
trigger: model_decision
description: Apply when changing anything visual — layout, colors, typography, components, animations, or adding a new page/section.
---

# Design System Rules

The aesthetic: **minimal editorial + developer details**. Off-white/near-black canvas, generous whitespace, Inter for reading, Space Mono for labels/metadata, soft card shadows, a few playful micro-interactions. Inspired by Bryl Lim's portfolio, but it is Roldan's site.

## Tokens (source: `src/css/tokens.css`)

| Purpose | Token |
|---|---|
| Page / card / sidebar bg | `--bg-color`, `--card-bg`, `--sidebar-bg` |
| Text | `--text-color`, `--text-muted` |
| Lines | `--border-color` |
| Interaction bg | `--hover-bg`, `--tag-bg` |
| Glass surfaces | `--glass-bg`, `--glass-border` |
| Elevation | `--card-shadow`, `--card-shadow-hover`, `--card-border-glow` |
| Accents (sparingly) | `--accent-blue`, `--accent-violet`, `--accent-cyan` |
| Type | `--font-main` (Inter), `--mono-font` (Space Mono) |

- **Never hard-code a color** in a new rule. If a needed value doesn't exist, add a token to BOTH `:root` and `[data-theme="dark"]`.
- Theme is set on `<html data-theme="light|dark">` by `theme.js` (system/light/dark, persisted in `localStorage.theme`).

## Typography

- Body: Inter 400/500/600 only (those are the only weights loaded).
- Metadata, labels, tags, dates, kbd hints: Space Mono, usually uppercase, small, letter-spaced.
- Page titles are lowercase (`blog`, `projects`). Section labels: `01 — blog` in mono.

## Motion

- Entry: add class `reveal` → `scroll.js` adds `revealed` when visible.
- Page transitions: `page-exit` / `page-enter` handled by the router. Don't add competing transitions on `#router-view`.
- Hover lift: `translateY(-2px)` to `-4px` + `--card-shadow-hover`. Durations 0.2–0.4s, ease-out curves.
- Reusable effects: `.tilt-card` (3D tilt), `.magnetic` (cursor pull). Use them; don't re-implement.
- New animations should respect `@media (prefers-reduced-motion: reduce)` (currently missing site-wide — see KNOWN_ISSUES).

## Anti-slop checklist (reject your own output if any are true)

- [ ] Purple-to-blue gradient backgrounds, glowing neon everywhere, or gradient text on body copy
- [ ] Emoji used as section icons when Phosphor icons are the convention
- [ ] Generic stock hero copy ("Welcome to my portfolio", "I'm passionate about...")
- [ ] Uniform 3-column card grids with identical icon-title-paragraph cards for everything
- [ ] More than one accent color competing in a single component
- [ ] Rounded-2xl-everything with no hierarchy; every element has a shadow
- [ ] Looks broken or low-contrast in the other theme
- [ ] Breaks at 480px width or causes horizontal scroll
- [ ] New visual pattern that duplicates an existing component in `components.css`

## Before adding a component

1. Search `components.css` and `views.css` for something similar and reuse/extend it.
2. Check it in light, dark, and at 992 / 768 / 480 px.
3. Keyboard: focusable, visible focus state, Escape closes overlays.
