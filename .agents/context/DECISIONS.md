# Decision Log

Short records of *why* the project is shaped the way it is. Append new entries at the bottom; never rewrite old ones — supersede them with a new entry.

Template:

```md
## D-00X: <title>
- **Date:** YYYY-MM-DD
- **Status:** accepted | superseded by D-00Y
- **Context:** what problem/constraint
- **Decision:** what we chose
- **Consequences:** trade-offs, what it rules out
```

---

## D-001: Vanilla JS, no build step
- **Date:** 2026 (initial commit)
- **Status:** accepted
- **Context:** Personal portfolio, single maintainer, static hosting on Vercel.
- **Decision:** Plain HTML/CSS/JS served directly; no npm dependencies, bundler, or framework.
- **Consequences:** Zero build failures and instant deploys. No tree-shaking, no type checking, no component system — conventions (see `.agents/rules/`) replace tooling.

## D-002: Classic scripts sharing globals instead of ES modules
- **Date:** 2026 (initial commit)
- **Status:** accepted
- **Context:** Files reference each other via globals and `window.*`; works when opened from any static server.
- **Decision:** Keep `<script src>` tags in a fixed order in `index.html`.
- **Consequences:** Load order matters; name collisions possible. Migrating to modules would be a project-wide change — do it all at once, never piecemeal.

## D-003: Hash-based routing
- **Date:** 2026 (initial commit)
- **Status:** accepted
- **Context:** Static host, no server rewrites needed.
- **Decision:** `#/route` hashes handled in `router.js`.
- **Consequences:** Works everywhere with no config; subpages not individually indexed by search engines.

## D-004: Content centralized in `src/js/data.js`
- **Date:** 2026 (initial commit)
- **Status:** accepted (partially implemented — see duplication map)
- **Context:** Content edits shouldn't require touching view markup.
- **Decision:** All content in `window.portfolioData`; views are pure renderers.
- **Consequences:** Several views still hard-code content. New work must not add more.

## D-005: AI context system in `.agents/` + root `AGENTS.md`
- **Date:** 2026-10-14
- **Status:** accepted
- **Context:** The site is built and maintained primarily with AI agents; without written context, agents guess (e.g. add `import` statements, invent content).
- **Decision:** Always-on rules (architecture, content integrity, production safety) + on-demand rules (code style, design system) + skills (playbooks) + context docs, all in `.agents/`. `AGENTS.md` at root as the tool-agnostic entry point.
- **Consequences:** Docs must be kept in sync with code. Any agent that changes structure must update the relevant `.agents/` file in the same change.
