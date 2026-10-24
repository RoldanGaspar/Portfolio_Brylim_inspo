---
name: update-content
description: >-
  Adds, edits, or removes portfolio content — projects, experience, blog posts,
  recommendations, gear, resources, consulting, shop items, stack, bio, stats,
  or social links. Use whenever the user wants to change what the site says
  rather than how it looks.
---

# Update Content

## 0. Integrity gate

Only write content the user provided or that is already verified (see `.agents/rules/content-integrity.md`). Missing details → ask. If you must leave a slot, write `TODO(roldan): <what's needed>` — the checker lists these.

## 1. Find every copy

Content is duplicated across files. Open `.agents/context/DATA_SCHEMA.md#duplication-map` and list every location for the content type you're changing. Confirm with a search, e.g.:

```powershell
Select-String -Path index.html, src\js\*\*.js -Pattern "Travel Buddy"
```

## 2. Edit `src/js/data.js` first

Follow the field list in `DATA_SCHEMA.md` exactly. All fields are required unless noted — views don't null-check (e.g. `project-detail.js` reads `stats.rank/downloads/rating` directly).

- `id`: lowercase-kebab slug, unique, never changed once live (it's a URL).
- Dates: blog `"Mon YYYY"`, certs `"Mon D, YYYY"`.
- Trusted HTML only in fields documented as `html`.

## 3. Verify Consumers & Update Remaining Static Exceptions

Views (`experience-all.js`, `recommendations-all.js`, `stack-all.js`, `projects-all.js`, `project-detail.js`, `ai-bot.js`, and `command-palette.js`) dynamically read from `window.portfolioData` (`src/js/data.js`). **Do not reintroduce hard-coded duplicate markup into those views.**

However, check and synchronize the following **static exceptions**:

| Changing… | Dynamic Consumer (Auto) | Remaining Static Exceptions (Manual Sync Needed) |
|---|---|---|
| **A project** | `projects-all.js`, `project-detail.js`, `command-palette.js`, `ai-bot.js` | `home.js` (if changing one of the 3 featured 3D deck cards), `modals.js` (terminal `cat projects` / commands), `assets/resume/roldan-gaspar-resume.html` |
| **Experience** | `experience-all.js`, `home.js` (reads `data.js#experienceList`) | `assets/resume/roldan-gaspar-resume.html` |
| **A recommendation** | `recommendations-all.js`, `home.js` (reads `data.js#recsList`) | None (fully dynamic) |
| **Stack** | `stack-all.js`, `home.js` (reads `data.js#featuredStack`), `ai-bot.js` | `assets/resume/roldan-gaspar-resume.html` |
| **Certifications** | `certifications-all.js`, `home.js` (reads `data.js#certsList`) | `modals.js` (terminal `verify-certs` / `cat certs.json`), `assets/resume/roldan-gaspar-resume.html` |
| **Contact / Bio / Socials** | `ai-bot.js` | `index.html` sidebar, `home.js` hero text, `assets/resume/roldan-gaspar-resume.html` |

## 4. Removing content

Remove the item from `src/js/data.js`. If a project is removed, verify whether it was featured in the Home 3D stack deck in `home.js` (which requires exactly 3 cards: `pos-left`, `pos-center`, `pos-right`); ask which active project replaces it if needed. Check `command-palette.js` and `modals.js` terminal pool if applicable.

## 5. Verify

Run `verify-locally`. The checker catches project-id drift and schema gaps. Then update `KNOWN_ISSUES.md` → remove any "unverified content" rows that the user has now confirmed or replaced.
