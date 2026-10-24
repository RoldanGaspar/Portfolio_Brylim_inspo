# Data Schema — `window.portfolioData` (`src/js/data.js`)

Fields marked `html` are inserted raw via template literals — only trusted, hand-written HTML.

## Collections

### `shop[]` → `views/shop.js`, `views/shop-detail.js`, router (`#/shop/:id`)
| Field | Type | Notes |
|---|---|---|
| `id` | slug | URL key, unique |
| `title`, `type`, `price`, `tag`, `subtitle`, `desc` | string | |
| `whatsInside` | string[] `html` | |
| `sections`, `footerText` | string | |
| `downloadUrl` | url | `"assets/resume/developer-resume-template.docx"` |

### `projects[]` → `views/projects-all.js`, `views/project-detail.js`, `views/home.js`, `utils/command-palette.js`, `utils/ai-bot.js`, router (`#/projects/:id`)
Contains all 4 flagship repositories (`tarsi-budget-tracker`, `awardena-security`, `pos-inventory`, `pet-hub-payroll`).
| Field | Type | Notes |
|---|---|---|
| `id` | slug | URL key, unique |
| `title`, `badge`, `subtitle`, `tagline`, `desc`, `problem`, `solution` | string | |
| `iconText` | 1–2 chars | app icon letters |
| `iconBg`, `mockupBg` | hex color | per-project brand color (allowed exception to token rule) |
| `homeCard` | `{ posClass, ariaLabel, shortTitle, shortDesc, tags[], iconClass, badgeClass, badgeStyle, storeBadges[] }` | optional; used by `home.js` interactive 3D stack deck (first 3 projects) |
| `cmdTitle`, `cmdIcon` | string | used by `command-palette.js` (`Ctrl+K`) |
| `architecture` | `{ pattern: string, layers: { step, label, detail }[] }` | rendered as the 3-layer System Architecture Blueprint in `project-detail.js` |
| `highlights` | string[] | |
| `techStack` | string[] | |
| `stats` | `{ rank, downloads, rating }` | all strings; all three required by `project-detail.js` |
| `downloadUrl` | url | |

### `blog[]` → `views/blog.js`, `views/blog-detail.js`, `views/home.js` (first 3), `utils/command-palette.js`, `utils/ai-bot.js`, router (`#/blog/:id`)
`id` (slug), `title`, `preview`, `date` (`"Mon YYYY"`), `readTime` (`"N min"`), `category`, `tags[]`, `image` (url), `sections[]` (`id`, `heading`, `paragraphs[]`, optional `callout`, optional `code: { lang, snippet }`).

### `gear{ [CATEGORY]: item[] }` → `views/gear.js`
Item: `name`, `desc`, `image`. Category keys are UPPERCASE display labels.

### `resources{ [CATEGORY]: item[] }` → `views/resources.js`
Item: `title`, `desc`, `url` (official external documentation URL).

### `consulting[]` → `views/consulting.js`
`title`, `price` (string), `desc`, `points` (string[]).

### `experienceList[]` → `views/experience-all.js`, `views/home.js`
`id`, `initials`, `year`, `shortYear`, `title`, `company`, `shortCompany` (optional), `employmentType`, `location`, `desc`, `highlights[]`, `tech[]`, `homeOnly` (boolean, optional — rendered on Home compact preview only).

### `featuredStack[]` → `views/home.js`
`string[]` — compact array of top verified technologies (`["JavaScript (ES6+)", "TypeScript", "Python", "Supabase (PostgreSQL)", "Network Defense", "AWS Cloud", "AI Agent Harnesses"]`) rendered on the Home page.

### `stackCategories[]` → `views/stack-all.js` (`#/stack`)
`title` (category title), `items[]` (`string[]` of technology names).

### `certsList[]` → `views/certifications-all.js`, `views/home.js`
`title`, `shortTitle` (optional), `issuer`, `date`, `badgeUrl`, `credlyUrl`, `verifyUrl`, `certificateImage` (optional), `skills[]`.

### `netacadCertsList[]` → `views/certifications-all.js`, `views/home.js`, `utils/ai-bot.js` ✅ verified
| Field | Type | Notes |
|---|---|---|
| `title`, `issuer`, `academy`, `date` (`"Mon D, YYYY"`), `description` | string | |
| `hours` | number | |
| `badgeUrl`, `credlyUrl`, `verifyUrl` | url | |
| `certificateImage` | path | must exist: `assets/certificates/<slug>.png` |
| `skills` | string[] | |

PDF convention: `assets/certificates/pdf/<same-slug>.pdf`.
Filter category is derived in `getCertCategory()` from `issuer`/`title` keywords — check it when adding a cert with a new topic.

### `credlyAdditionalBadgesList[]` → `views/certifications-all.js`, `utils/ai-bot.js` ✅ verified
Same as NetAcad minus `hours`, `verifyUrl`, `certificateImage`.

### `netacadAchievementsList[]` → `views/certifications-all.js` ✅ verified
`title`, `date`, `badgeUrl`.

### `recsList[]` → `views/recommendations-all.js`, `views/home.js`
`author`, `role`, `shortRole` (optional), `text`, `shortText` (optional), `initials`.

### `cyberLab` → `views/cyber-lab.js` (`#/cyber-lab`), `utils/ai-bot.js` ✅ verified foundations
`subtitle`, `nodes[]` (`id`, `label`, `ip`, `role`, `ports`, `tier`, `lane`), `defenseRules[]` (`id`, `label`, `code`, `desc`, `active`), `threatScenarios[]` (`id`, `label`, `mitre`, `protocol`, `target`, `mitigatedBy`, `payload`), `verifiedFoundations[]`.

## Duplication map (Phase 7 Single-Source-of-Truth Refactor)

> **Resolved in Phase 7:** `home.js`, `experience-all.js`, `stack-all.js`, `command-palette.js`, and `ai-bot.js` now dynamically read from `window.portfolioData`.

| Content | Single Source (`src/js/data.js`) | Dynamic Consumers | Remaining Static Exceptions |
|---|---|---|---|
| Projects | `portfolioData.projects` | `projects-all.js`, `project-detail.js`, `command-palette.js`, `ai-bot.js` | `home.js` (explicitly selects 3 featured project IDs for 3D deck), `modals.js` (terminal `projects` list), `assets/resume/roldan-gaspar-resume.html` |
| Experience | `portfolioData.experienceList` | `experience-all.js`, `home.js` (timeline preview) | `assets/resume/roldan-gaspar-resume.html` |
| Recommendations | `portfolioData.recsList` | `recommendations-all.js`, `home.js` (3-card preview) | None |
| Tech stack | `portfolioData.featuredStack` & `portfolioData.stackCategories` | `home.js`, `stack-all.js` | `ai-bot.js` (curated summary string), `assets/resume/roldan-gaspar-resume.html` |
| Certifications | `portfolioData.certsList`, `netacadCertsList`, `credlyAdditionalBadgesList` | `certifications-all.js`, `home.js`, `ai-bot.js` | `modals.js` (terminal `verify-certs`), `assets/resume/roldan-gaspar-resume.html` |
| Blog & Shop | `portfolioData.blog`, `portfolioData.shop` | `blog.js`, `blog-detail.js`, `shop.js`, `shop-detail.js`, `home.js`, `command-palette.js`, `ai-bot.js` | None |
| Contact / location | N/A | N/A | `index.html` sidebar, `ai-bot.js`, `effects.js` toast, `home.js` hero, `assets/resume/roldan-gaspar-resume.html` |

## Adding a new collection

1. Add it to `portfolioData` with a JSDoc-style comment above describing fields.
2. Document it here (fields + consumers).
3. Render it in a view; never hard-code the same content elsewhere.
4. If it should be searchable, derive palette entries from it rather than hand-writing them.
