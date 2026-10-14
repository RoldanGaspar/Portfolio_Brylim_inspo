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

## 3. Update the hard-coded copies

Per the duplication map. Typical sets:

| Changing… | Also update |
|---|---|
| A project | `home.js` stack deck card, `command-palette.js` `commandItems`, `ai-bot.js` projects answer, `modals.js` terminal output |
| Experience | `experience-all.js`, `home.js` experience list (and `data.js#experienceList`) |
| A recommendation | `home.js` rec grid |
| Stack | `stack-all.js` `stackCategories`, `home.js` tag row, `ai-bot.js` skills answer |
| Contact/location/socials | `index.html` sidebar, `home.js` hero, `ai-bot.js`, `effects.js` toast |

**Preferred when touching a copy:** refactor that spot to read from `portfolioData` instead of re-hard-coding — but only if the user agrees to the scope increase.

## 4. Removing content

Remove from every location above. Search for the `id` and the title afterward to confirm zero references remain. If a project is removed, the home stack deck needs exactly 3 cards (`pos-left`, `pos-center`, `pos-right`) — ask which project replaces it.

## 5. Verify

Run `verify-locally`. The checker catches project-id drift and schema gaps. Then update `KNOWN_ISSUES.md` → remove any "unverified content" rows that the user has now confirmed or replaced.
