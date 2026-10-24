---
name: verify-locally
description: >-
  Verifies changes to the portfolio before they are reported as done. Use after
  any code, content, or style change, before committing, or when the user asks
  to test, check, preview, or run the site locally.
---

# Verify Locally

## 1. Static check (always)

```powershell
node .agents/skills/verify-locally/scripts/check.mjs
```

Catches: missing files referenced by `index.html`, JS syntax errors, accidental `import`/`export`, global function name collisions, router functions that don't exist, sidebar links with no route, `routeMeta` coverage, `data.js` schema integrity (projects, shop, blog, certs, recs), missing certificate images/PDFs, and project IDs in sync across `data.js`, `home.js`, and `command-palette.js`.

- **Errors → must fix** before handing back.
- **Warnings → don't add new ones.** Compare against the baseline below; if your change adds a warning, fix it or explain why.

Baseline (2026-10-21): `0 errors, 0 warnings`. All routes, collections, certificate images/PDFs, and `routeMeta` entries are fully synchronized.

> **Note on Verification Scope:** While `check.mjs` validates static integrity and syntax, it does not evaluate live database policies, keyboard focus trapping, or CSS layout across screen sizes. Always execute Section 3 below.

## 2. Serve it

```powershell
npx serve . -l 3000
```

Run as a background/daemon process, then open http://localhost:3000. (Python alternative: `python -m http.server 3000`.)

## 3. Manual checklist for the user (or browser tool)

Tell the user exactly which of these apply to your change:

- [ ] The changed route renders; DevTools console has no errors
- [ ] Navigate away and back — interactions still work (listeners re-bound)
- [ ] Light theme AND dark theme
- [ ] Width 992 / 768 / 480 px; mobile menu opens/closes; no horizontal scroll
- [ ] Keyboard: Tab reaches new controls; Esc closes overlays; Ctrl+K palette still opens
- [ ] Direct deep link works (paste `http://localhost:3000/#/your-route` in a fresh tab)

## 4. Scope check

```powershell
git status
git diff --stat
```

Only files related to the task should be changed. Revert accidental edits.

## Extending the checker

When a new class of bug slips through, add a check to `scripts/check.mjs` (keep it dependency-free) and update the baseline above.
