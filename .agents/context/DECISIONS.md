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
- **Status:** superseded by D-006
- **Context:** Content edits shouldn't require touching view markup.
- **Decision:** All content in `window.portfolioData`; views are pure renderers.
- **Consequences:** Several views still hard-code content. New work must not add more.

## D-005: AI context system in `.agents/` + root `AGENTS.md`
- **Date:** 2026-10-14
- **Status:** accepted
- **Context:** The site is built and maintained primarily with AI agents; without written context, agents guess (e.g. add `import` statements, invent content).
- **Decision:** Always-on rules (architecture, content integrity, production safety) + on-demand rules (code style, design system) + skills (playbooks) + context docs, all in `.agents/`. `AGENTS.md` at root as the tool-agnostic entry point.
- **Consequences:** Docs must be kept in sync with code. Any agent that changes structure must update the relevant `.agents/` file in the same change.

## D-006: Single-source-of-truth dynamic rendering from `window.portfolioData`
- **Date:** 2026-10-17
- **Status:** accepted
- **Context:** Previously, `home.js`, `experience-all.js`, `stack-all.js`, `command-palette.js`, and `ai-bot.js` contained hard-coded copies of projects, experience entries, recommendations, tech stack categories, and certifications, creating synchronization drift whenever `src/js/data.js` changed.
- **Decision:** Centralize `featuredStack`, `stackCategories`, and project card/command metadata in `window.portfolioData` (`src/js/data.js`) and refactor all views and utilities (`home.js`, `experience-all.js`, `stack-all.js`, `command-palette.js`, `ai-bot.js`) to dynamically map over `window.portfolioData` while strictly excluding unverified sections from `ai-bot.js`.
- **Consequences:** Adding or updating a project, blog post, certification, or stack item in `src/js/data.js` automatically propagates across the Home page, detail views, Command Palette (`Ctrl+K`), and AI Chatbot with zero manual sync required.

## D-007: Phase 8 Content Integrity & Personalization Audit
- **Date:** 2026-10-17
- **Status:** accepted
- **Context:** Several sections in `src/js/data.js`, `src/js/views/home.js`, and `assets/resume/roldan-gaspar-resume.html` retained inherited inspiration-template claims (e.g., Standard Chartered, Cambridge, Henry Aguda, MacBook Pro M3 Max, ₱10k/hr rates, and ~70 unverified stack items).
- **Decision:** Replace all inherited template content across `experienceList`, `recsList`, `gear`, `consulting`, `featuredStack`, `stackCategories`, `#affiliations`, and `roldan-gaspar-resume.html` with Roldan Gaspar's verified track record (10 Cisco Networking Academy credentials via DICT-ITU DTC Initiative & CICT, AWS Educate Cloud 101, open-source repositories `AWarden-A`, `pos_with_inventory_system`, `pet-hub-payroll`, `Tarsi`, and authentic Windows 11 Pro / WSL2 security & full-stack workstation).
- **Consequences:** 100% of visible portfolio content and printable resume assets now strictly adhere to `.agents/rules/content-integrity.md` with zero fabricated or inherited third-party claims.
