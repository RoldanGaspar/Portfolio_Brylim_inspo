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
| `downloadUrl` | url | currently `"#"` |

### `projects[]` → `views/projects-all.js`, `views/project-detail.js`, router (`#/projects/:id`)
| Field | Type | Notes |
|---|---|---|
| `id` | slug | URL key, unique. **Also hard-coded in `home.js` stack deck and `command-palette.js`** |
| `title`, `badge`, `subtitle`, `tagline`, `desc`, `problem`, `solution` | string | |
| `iconText` | 1–2 chars | app icon letters |
| `iconBg`, `mockupBg` | hex color | per-project brand color (allowed exception to token rule) |
| `highlights` | string[] | |
| `techStack` | string[] | |
| `stats` | `{ rank, downloads, rating }` | all strings; all three required by `project-detail.js` |
| `downloadUrl` | url | |

### `blog[]` → `views/blog.js`, `views/blog-detail.js`, `views/home.js` (first 3), router (`#/blog/:id`)
`id` (slug), `title`, `preview`, `date` (`"Mon YYYY"`), `readTime` (`"N min"`), `category`, `tags[]`, `image` (url), `sections[]` (`id`, `heading`, `paragraphs[]`, optional `callout`, optional `code: { lang, snippet }`).

### `gear{ [CATEGORY]: item[] }` → `views/gear.js`
Item: `name`, `desc`, `image`. Category keys are UPPERCASE display labels.

### `resources{ [CATEGORY]: item[] }` → `views/resources.js`
Item: `title`, `desc`. (No `url` field yet — links are `href="#"`.)

### `consulting[]` → `views/consulting.js`
`title`, `price` (string, ₱), `desc`, `points` (string[]).

### `experienceList[]` → ⚠️ **not rendered anywhere**
`id`, `year`, `title`, `company`, `location`, `desc`, `highlights[]`, `tech[]`.
`experience-all.js` and `home.js` hard-code their own copies instead.

### `certsList[]` → `views/certifications-all.js`
`title`, `issuer` (UPPERCASE), `date`, `logo` (url), `verifyUrl`, `skills[]`.

### `netacadCertsList[]` → `views/certifications-all.js`, `views/home.js` ✅ verified
| Field | Type | Notes |
|---|---|---|
| `title`, `issuer`, `academy`, `date` (`"Mon D, YYYY"`), `description` | string | |
| `hours` | number | |
| `badgeUrl`, `credlyUrl`, `verifyUrl` | url | |
| `certificateImage` | path | must exist: `assets/certificates/<slug>.png` |
| `skills` | string[] | |

PDF convention: `assets/certificates/pdf/<same-slug>.pdf`.
Filter category is derived in `getCertCategory()` from `issuer`/`title` keywords — check it when adding a cert with a new topic.

### `credlyAdditionalBadgesList[]` → `views/certifications-all.js` ✅ verified
Same as NetAcad minus `hours`, `verifyUrl`, `certificateImage`.

### `netacadAchievementsList[]` → `views/certifications-all.js` ✅ verified
`title`, `date`, `badgeUrl`.

### `recsList[]` → `views/recommendations-all.js`
`author`, `role`, `text`, `initials`.

### `cyberLab` → `views/cyber-lab.js` (`#/cyber-lab`) ✅ verified foundations
`subtitle`, `nodes[]` (`id`, `label`, `ip`, `role`, `ports`, `tier`, `lane`), `defenseRules[]` (`id`, `label`, `code`, `desc`, `active`), `threatScenarios[]` (`id`, `label`, `mitre`, `protocol`, `target`, `mitigatedBy`, `payload`), `verifiedFoundations[]`.

## Duplication map

Content that lives in more than one place. **When you change one, change all — or better, refactor the copy to read from `portfolioData`.**

| Content | Locations |
|---|---|
| Projects (names, ids, taglines) | `data.js#projects`, `home.js` stack deck (hard-coded 3 cards), `command-palette.js#commandItems`, `ai-bot.js` answer, `modals.js` (terminal output) |
| Experience | `data.js#experienceList` (unused), `experience-all.js` (hard-coded), `home.js` experience section (hard-coded) |
| Recommendations | `data.js#recsList`, `home.js` (hard-coded, truncated; name spelled "Adriano" vs "Adrian" in data) |
| Tech stack | `stack-all.js` (local `stackCategories`), `home.js` tag row, `ai-bot.js` skills answer |
| Contact / location | `index.html` sidebar, `ai-bot.js`, `effects.js` toast, `home.js` hero |
| Blog titles | `data.js#blog`, `command-palette.js` (one entry) |

## Adding a new collection

1. Add it to `portfolioData` with a JSDoc-style comment above describing fields.
2. Document it here (fields + consumers).
3. Render it in a view; never hard-code the same content elsewhere.
4. If it should be searchable, derive palette entries from it rather than hand-writing them.
