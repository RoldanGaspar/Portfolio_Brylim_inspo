# Known Issues & Tech Debt

Living register. **Add** issues you discover; **remove** them (and note it in your summary) when fixed.
Severity: 🔴 high (credibility/broken) · 🟠 medium (UX/maintainability) · 🟢 low (polish).

## Documentation & Implementation Audit — 2026-10-21 (All 12 Findings Resolved ✅)

Scope: All 27 repository Markdown files, active source code, and cloud integrations. Static check: **0 errors, 0 warnings**.

### Resolution Summary:
1. **Supabase Client & Schema Alignment:** Updated `INTEGRATIONS.md` and `manage-supabase/SKILL.md` to match actual implementation: `site_metrics` table, `increment_site_views()` stored RPC, and `getSupabaseClient()` initialization.
2. **Reproducible Database Migrations:** Created `supabase/migrations/20261021_initial_schema.sql` providing versioned DDL, RPC function, and PostgreSQL Row-Level Security (RLS) policies for `contact_messages` (with `inquiry_type`), `site_metrics`, and `guestbook_entries`.
3. **Modal Dialog Accessibility (WCAG 2.1 AA):** Added `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` semantics to Contact and Guestbook overlays in `src/js/utils/supabase-client.js`. Implemented Escape key closing, Tab key focus containment/trapping, and trigger-focus restoration on modal dismiss.
4. **Credential Evidence & Count Alignment:** Reconciled certificate count across all docs: exactly **9 Cisco NetAcad Certifications** (with matching PNGs + PDFs in `assets/certificates/`) + **1 AWS Educate Introduction to Cloud 101 Training Badge** = **10 verified credentials total** (matching the Hero stat "10+ Credentials"). Documented `cyberLab.verifiedFoundations` as interactive simulation curriculum domains rather than standalone certificate PDFs.
5. **Content-Editing Runbook Refactor:** Synchronized `skills/update-content/SKILL.md` and `DATA_SCHEMA.md` to document dynamic consumers (`experience-all.js`, `recommendations-all.js`, `stack-all.js`, `projects-all.js`, `project-detail.js`) and explicitly list static exceptions (Home featured subset, Terminal, printable HTML resume).
6. **New-Route Metadata Step:** Upgraded `skills/add-page/SKILL.md` to mandate `routeMeta` registration in `src/js/router.js` (`document.title`, meta description, OpenGraph) and screen-reader `#route-announcer` verification.
7. **Architecture & Path Cleanup:** Corrected nonexistent file references in `PROJECT_BRIEF.md` (`modals.js` and `supabase-client.js`). Documented Supabase in `ARCHITECTURE.md` boot sequence and global API table; scoped Cyber-Loft chat to realtime presence and client broadcast.
8. **Automated Verification Enhancement:** Upgraded `scripts/check.mjs` to validate blog ID uniqueness/fields, `routeMeta` coverage for routes, and Home-featured project IDs in `portfolioData.projects`. Documented 0 errors / 0 warnings baseline in `verify-locally/SKILL.md`.
9. **Production Authorization Checkpoints:** Enforced explicit user approval gates in `PIPELINE_WORKFLOW.md` and `INTEGRATIONS.md` prior to executing production Git pushes or deploying schema changes.
10. **Summary & Count Consistency:** Synchronized counts: classic `<script>` description in `AGENTS.md`, 6 audio tracks in `README.md`, 3-layer architecture blueprints in `ENHANCEMENT_ROADMAP.md` and `DECISIONS.md` (`D-009`), and 12 roadmap phases in `.agents/README.md`.
11. **Repository Setup, License & Verification:** Created root `LICENSE` file (MIT, Roldan Gaspar 2026), updated `README.md` module tree, and added static health check command (`node .agents/skills/verify-locally/scripts/check.mjs`).
12. **Responsiveness Matrix & Honest GitHub State:** Documented multi-device / viewport / theme validation matrix in `RESPONSIVENESS_ROADMAP.md`. Updated `github-graph.js` with honest initial status ("syncing..."), real contributions on fetch success, and graceful offline fallback ("cached estimate").

---

## 🔍 Claim-to-Evidence & Verification Record

| Claimed Item | Evidence Location in Repo | External Credential / Verification URL | Audit Status |
|---|---|---|---|
| **Identity & Workstation** | `index.html`, `MyPic.webp`, `data.js#gear` | Pampanga, Philippines · Windows 11 Pro / WSL2 development setup | Verified |
| **JavaScript Essentials 1** | `assets/certificates/javascript-essentials-1.png` + `pdf/` | [NetAcad Issuance](https://www.netacad.com/certificates/?issuanceId=cd68c261-6098-4948-b38b-dd52b2735bcb) · [Credly Badge](https://www.credly.com/badges/9a2489bc-b20c-4600-8e5e-7f4cbdb524e0) | Verified |
| **JavaScript Essentials 2** | `assets/certificates/javascript-essentials-2.png` + `pdf/` | [NetAcad Issuance](https://www.netacad.com/certificates/?issuanceId=9bb8a3cf-fbd2-4f21-9f0d-f84cd0bb6577) · [Credly Badge](https://www.credly.com/badges/06bf7beb-dc73-484f-94ce-8d0835d4e146) | Verified |
| **Network Defense** | `assets/certificates/network-defense.png` + `pdf/` | [NetAcad Issuance](https://www.netacad.com/certificates/?issuanceId=bb7d044d-e528-4437-aa58-21e42aebfcad) · [Credly Badge](https://www.credly.com/badges/4317f869-fb2b-4cfd-a377-3ff898d6d236) | Verified |
| **Ethical Hacker** | `assets/certificates/ethical-hacker.png` + `pdf/` | [NetAcad Issuance](https://www.netacad.com/certificates/?issuanceId=95403cdc-07e9-4bd9-b45f-71b3f8d8d6c8) · [Credly Badge](https://www.credly.com/badges/b75d8f5e-1b06-4be1-8f2e-d5a2fc5ead83) | Verified |
| **Data Analytics Essentials** | `assets/certificates/data-analytics-essentials.png` + `pdf/` | [NetAcad Issuance](https://www.netacad.com/certificates/?issuanceId=d84879d8-31bf-4a50-914a-4536d08ca89d) · [Credly Badge](https://www.credly.com/badges/b8f40efc-a6b3-469a-9c5a-c9dbd20cad2e) | Verified |
| **Python Essentials 1** | `assets/certificates/python-essentials-1.png` + `pdf/` | [NetAcad Issuance](https://www.netacad.com/certificates/?issuanceId=6426f512-66bf-48cd-8fa4-71c9ff65efbb) · [Credly Badge](https://www.credly.com/badges/ae0773b6-42f5-4558-9d79-7f769fa1a114) | Verified |
| **Python Essentials 2** | `assets/certificates/python-essentials-2.png` + `pdf/` | [NetAcad Issuance](https://www.netacad.com/certificates/?issuanceId=d0cbc502-cd0f-453c-8724-6b3cbd4ae4f5) · [Credly Badge](https://www.credly.com/badges/7ca14f5f-c2fd-4144-a7ca-96a847b30a3c) | Verified |
| **Networking Basics** | `assets/certificates/networking-basics.png` + `pdf/` | [NetAcad Issuance](https://www.netacad.com/certificates/?issuanceId=673d5cb3-f150-4d96-b0d0-02c172234ce5) · [Credly Badge](https://www.credly.com/badges/3982861e-0288-4e85-b483-6e954f46a3e4) | Verified |
| **Introduction to Cybersecurity** | `assets/certificates/introduction-to-cybersecurity.png` + `pdf/` | [NetAcad Issuance](https://www.netacad.com/certificates/?issuanceId=1eb1be6e-5686-48c4-a91b-d98d1ca892ee) · [Credly Badge](https://www.credly.com/badges/0ef8090b-0504-475e-a886-c36f33baed44) | Verified |
| **AWS Educate Cloud 101 Badge** | `src/js/data.js#credlyAdditionalBadgesList` | [Credly Badge](https://www.credly.com/badges/7eda7327-b679-4eaf-b005-a761222d2fc9) | Verified |
| **5 NetAcad Course Badges** | `src/js/data.js#netacadAchievementsList` | NetAcad course badges (Resource Specialist, Network Defense, Safeguards, Threat Analysis, Administration) | Verified |
| **4 Open Repositories** | `src/js/data.js#projects`, `components/github-graph.js` | [GitHub @RoldanGaspar](https://github.com/RoldanGaspar): `AWarden-A`, `pos_with_inventory_system`, `pet-hub-payroll`, `Portfolio_Brylim_inspo` | Verified |
| **Cyber Lab Foundations** | `src/js/data.js#cyberLab` | Interactive SOC sandbox curriculum domains (CyberOps, Network Defense, Endpoint Security) | Simulation (Curriculum-grounded) |

---

## ✅ Content Integrity Status (100% Verified)

All portfolio sections (`src/js/data.js`, `src/js/views/home.js`, and `assets/resume/roldan-gaspar-resume.html`) are 100% grounded in Roldan Gaspar's verified credentials, active GitHub repositories, and Pampanga workstation setup, with zero inherited template claims remaining.

> Note: The following items were successfully audited and aligned with Roldan's authentic verified credentials and GitHub repos:
> - **Certifications:** Top certs in `data.js#certsList` and `home.js` now strictly feature Cisco NetAcad (Network Defense, Ethical Hacker, Python Essentials) and AWS Cloud 101 with direct Credly verification links.
> - **Hero Stats:** Replaced template numbers with authentic facts (`10+ Credentials`, `4 Open Repos`, `0 Dependencies`, `100% Verified`).
> - **Projects:** Replaced template claims with Roldan's active repositories (`AWarden-A`, `pos_with_inventory_system`, `Tarsi`) with honest technical metrics and GitHub links.
> - **Favicon & CDN:** Replaced 2.9 MB image with dedicated `favicon-32.png` and `apple-touch-icon.png` (<3 KB), and pinned Phosphor to `@2.1.1`.
> - **3D Cyber-Loft:** Added collapsible persistent live chat drawer with live feed and unread badge.
> - **Accessibility, Reduced Motion & README (Phase 6):** Implemented global `prefers-reduced-motion` guards in CSS and JS, WCAG keyboard navigation & ARIA semantics (`role="button"`, `tabindex="0"`, `Enter`/`Space`/`Arrow` keys) on `#hero-verified-badge` and `.project-stack-card`, modal/command palette focus trapping & restoration, and synchronized `README.md` with the zero-build classic `<script>` architecture.
> - **Single-Source-of-Truth Data Refactor (Phase 7):** Eliminated cross-file content duplication across `home.js`, `experience-all.js`, `stack-all.js`, `command-palette.js`, and `ai-bot.js` so all views and utilities dynamically read from `window.portfolioData` (`src/js/data.js`).
> - **Content Integrity & Personalization Audit (Phase 8):** Replaced all remaining inherited template experience (`Standard Chartered`, `Cambridge`, `Core Technology`), recommendations (`Henry Aguda`, `Joshua Shailes`), affiliations (`ST Engineering`, `Pocket Devs`), gear (`MacBook Pro M3 Max`, `WHOOP`), consulting rates (`₱10k/hr`), and bloated 70-item stack lists across `data.js`, `home.js`, and `roldan-gaspar-resume.html` with Roldan's authentic Cisco NetAcad, DICT-ITU DTC, AWS Educate, and open-source engineering track record.
> - **SEO, Structured Data, Dynamic Route Metadata & Image Performance (Phase 9):** Added Schema.org `Person` + `WebSite` JSON-LD structured data, dynamic per-route `document.title` and meta/OG description updates in `router.js`, ARIA `aria-live="polite"` `#route-announcer` for SPA screen-reader transitions, explicit `aria-label` attributes on icon-only buttons, and `loading="lazy" decoding="async"` across below-the-fold view images (`gear.js`, `blog-detail.js`, `certifications-all.js`, `home.js`).
> - **Project Case Studies 2.0, Crawlability Assets & Context Sync (Phases 10–12):** Added the 4th verified repository (`pet-hub-payroll`) to `portfolioData.projects` for full 4-repo parity across `#/projects`, Command Palette, and AI Bot; upgraded `#/projects/:id` (`project-detail.js`) with a 3-layer System Architecture Blueprint, Copy Case-Study Link button (`initProjectDetailEvents()`), and Previous/Next Project footer navigation; added root `robots.txt` and `sitemap.xml`; and synchronized `.agents/context/PROJECT_BRIEF.md`.

## 🟠 Maintainability

- **Legacy root files** `data.js`, `main.js`, `style.css` are dead code (~90 KB). Candidate for deletion with approval.
- `views.css` is ~5,000 lines; finding styles is slow. Consider splitting per view (keep `@import` order).

## 🟢 Performance

- ~29 separate script requests; fine on HTTP/2 but all render-blocking at end of body.
- Blog/gear images are hot-linked from Unsplash (mitigated with `loading="lazy" decoding="async" referrerpolicy="no-referrer"`).

## 🟢 SEO / sharing

- Hash routing means subpages aren't individually indexable by non-JS crawlers (mitigated via root `robots.txt` + `sitemap.xml`, Schema.org JSON-LD in `index.html`, and dynamic per-route `document.title` + meta description updates in `router.js`).


