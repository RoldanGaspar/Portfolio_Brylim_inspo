---
name: craft-ui
description: >-
  Designs and builds new UI sections, components, or visual redesigns that match
  the portfolio's design language and avoid generic AI-looking output. Use for
  any request involving layout, styling, animation, "make it look better",
  redesigns, or new interactive components.
---

# Craft UI

Read `.agents/rules/design-system.md` first. This skill is the process; that rule is the spec.

## 1. Study before building

- Look at 2–3 existing sections that are closest to what you're building (e.g. `rec-card`, `cert-card-full`, `project-stack-card`, `blog-full-item`). Open their CSS in `components.css` / `views.css`.
- Note: spacing scale, border radius, font sizes, how mono labels are used, hover behavior.
- Reuse classes. Extending an existing component beats a new one.

## 2. Decide hierarchy in words first

Before writing CSS, write 3 lines:
1. What is the ONE thing the eye should hit first?
2. What's secondary (meta, labels)?
3. What's the single interaction (hover/click), if any?

If you can't answer, the design will be slop. Ask the user.

## 3. Build

- Markup in the view's template string; semantic elements; Phosphor icons.
- Styles under a banner comment in the right CSS file.
- Colors/fonts/shadows: tokens only. Per-item brand colors may come from data (like `iconBg`) as inline `style`.
- Motion: `reveal` for entry; `tilt-card` / `magnetic` for hover personality — max one effect per element.
- Sound: `playSound('click' | 'open' | 'close')` on meaningful actions only.
- Add `@media (prefers-reduced-motion: reduce)` for any new animation.

## 4. Self-critique pass

Run the anti-slop checklist in `design-system.md`. Then:

- Squint test: is the hierarchy obvious when blurry?
- Remove one thing. Does it get better? Keep removing until it doesn't.
- Dark theme: same hierarchy, sufficient contrast, no pure-white glare blocks.
- 480 px: readable, tappable (≥ 40px targets), no overflow.

## 5. Optional: visual exploration

For bigger redesigns, propose 2 directions in words (or generate mockups if the user wants) before implementing. Don't ship an exploration straight to `main`.

## 6. Verify

Run `verify-locally`; give the user the exact route + what to hover/click.
