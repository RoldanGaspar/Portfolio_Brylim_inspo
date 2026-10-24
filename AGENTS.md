# AGENTS.md — Roldan Gaspar Portfolio

> Entry point for every AI agent working in this repo. Read this first, then follow the links.
> Live site: https://roldangaspar.vercel.app · Repo: `RoldanGaspar/Portfolio_Brylim_inspo`

## What this is

A personal portfolio SPA for **Roldan Gaspar** (Software Engineer · AI · Cybersecurity enthusiast, Pampanga, PH).
It is **live in production**. Every push to `main` auto-deploys to Vercel.

## Stack in one line

Vanilla HTML + CSS + JavaScript. **No build step, no bundler, no framework, no npm dependencies.**
Classic `<script>` tags sharing globals (NOT ES modules). Hash router. Static hosting on Vercel.

## Repo map (only what matters)

| Path | Role |
|---|---|
| `index.html` | Shell: sidebar, `#router-view`, AI chat widget, **ordered** script tags |
| `src/js/data.js` | `window.portfolioData` — the content database |
| `src/js/router.js` | Hash routes → `render*()` functions, post-render init hooks |
| `src/js/app.js` | Boot: `DOMContentLoaded`, theme, modals, mobile menu |
| `src/js/views/*.js` | One `renderX()` per page, returns an HTML string |
| `src/js/utils/*.js` | Audio engine, effects, theme, modals, AI bot, command palette |
| `src/css/main.css` | Imports `tokens → layout → components → views → animations` |
| `assets/certificates/` | Certificate PNGs + `pdf/` |
| `data.js`, `main.js`, `style.css` (repo root) | **Legacy, unreferenced. Do not edit. Do not use as reference.** |

## Non-negotiables

1. **Never fabricate facts about Roldan.** No invented jobs, metrics, clients, testimonials, certs, or downloads. See [content-integrity](.agents/rules/content-integrity.md).
2. **Production is live.** Do not `git push`, force-push, or deploy without the user's explicit OK. See [production-safety](.agents/rules/production-safety.md).
3. **No build tooling / frameworks / npm packages** unless the user explicitly asks. See [architecture](.agents/rules/architecture.md).
4. **Use design tokens**, never hard-coded colors, and every UI change must work in light AND dark theme. See [design-system](.agents/rules/design-system.md).
5. **Verify before claiming done**: run `node .agents/skills/verify-locally/scripts/check.mjs`. See [verify-locally](.agents/skills/verify-locally/SKILL.md).
6. **Keep duplicated data in sync** (projects/skills appear in several files). See [DATA_SCHEMA](.agents/context/DATA_SCHEMA.md#duplication-map).
7. **MCP & Cloud Safety**: Zero unconfirmed deletions on Vercel deployments, DNS, or Supabase tables; never expose secret keys. See [mcp-safety](.agents/rules/mcp-safety.md).

## Where to look next

| Need | Read |
|---|---|
| Who Roldan is, audience, tone | [.agents/context/PROJECT_BRIEF.md](.agents/context/PROJECT_BRIEF.md) |
| How the code fits together | [.agents/context/ARCHITECTURE.md](.agents/context/ARCHITECTURE.md) |
| Content fields & where each is rendered | [.agents/context/DATA_SCHEMA.md](.agents/context/DATA_SCHEMA.md) |
| Vercel & Supabase integration architecture | [.agents/context/INTEGRATIONS.md](.agents/context/INTEGRATIONS.md) |
| Tri-MCP automated development pipeline | [.agents/context/PIPELINE_WORKFLOW.md](.agents/context/PIPELINE_WORKFLOW.md) |
| Phase-by-phase enhancement roadmap | [.agents/context/ENHANCEMENT_ROADMAP.md](.agents/context/ENHANCEMENT_ROADMAP.md) |
| Phase-by-phase responsiveness roadmap | [.agents/context/RESPONSIVENESS_ROADMAP.md](.agents/context/RESPONSIVENESS_ROADMAP.md) |
| Known bugs, debt, placeholder content | [.agents/context/KNOWN_ISSUES.md](.agents/context/KNOWN_ISSUES.md) |
| Why things are the way they are | [.agents/context/DECISIONS.md](.agents/context/DECISIONS.md) |
| Step-by-step playbooks | [.agents/skills/](.agents/skills/) |
| How this AI system works / how to extend it | [.agents/README.md](.agents/README.md) |

## Working loop (every task)

1. **Understand** — read the relevant context doc + the actual source files. Don't guess file contents.
2. **Plan** — for anything touching >2 files or visible UI, state the plan before editing.
3. **Change** — smallest diff that solves it. Match surrounding style. Preserve unrelated comments.
4. **Verify** — run the check script; describe what to look at in the browser (both themes, mobile width).
5. **Record** — if you found a new problem, add it to `KNOWN_ISSUES.md`; if you made a structural choice, add it to `DECISIONS.md`.
