# Known Issues & Tech Debt

Living register. **Add** issues you discover; **remove** them (and note it in your summary) when fixed.
Severity: 🔴 high (credibility/broken) · 🟠 medium (UX/maintainability) · 🟢 low (polish).

## 🔴 Unverified content (likely inherited from the inspiration template)

Needs Roldan's confirmation before it stays on a live site under his name. Do not expand on any of it.

| Content | Location |
|---|---|
| Projects Tarsi, Kabi, Travel Buddy — "#1 Finance App", "#1 Paid Fitness", download counts, ratings | `data.js#projects`, `home.js`, `ai-bot.js`, `command-palette.js`, `modals.js` |
| Experience: Lead AI Engineer @ Standard Chartered, AI Ops @ CoE GenAI Cambridge, Sr Full-Stack @ Core Technology | `data.js#experienceList`, `experience-all.js`, `home.js` |
| "Six years… 60+ products shipped" | `experience-all.js` |
| Hero stats: 200K+ community, 6+ yrs, 10x hackathons, PH100 StellarPH | `home.js` |
| Recommendations from Henry Aguda (DICT Secretary), Joshua Shailes, Cris Lawrence Adrian(o) | `data.js#recsList`, `home.js` |
| Certs: Google GenAI Leader, Oracle GenAI Professional, Neo4j, AWS AI Practitioner | `data.js#certsList` |
| Gear (MacBook Pro M3 Max 128GB, Studio Display, WHOOP…) | `data.js#gear` |
| Consulting rates (₱10k/hr, ₱20k/hr) | `data.js#consulting` |
| Stack list (~70 technologies) | `stack-all.js` |

## 🟠 Maintainability

- **Duplicated content** across files — see `DATA_SCHEMA.md#duplication-map`.
- **README is inaccurate:** says "ES6 Modules" (actually classic scripts), directory tree omits several files, `LICENSE` file referenced but missing, license badge URL malformed (`green.style=` → `green?style=`).
- **Legacy root files** `data.js`, `main.js`, `style.css` are dead code (~90 KB). Candidate for deletion with approval.
- `views.css` is ~4,500 lines; finding styles is slow. Consider splitting per view (keep `@import` order).
- `ai-bot.js` answers are hard-coded strings, not derived from `portfolioData`.

## 🟠 Accessibility

- Partial `prefers-reduced-motion` handling (added in `#/cyber-lab` and `#/blog/:id`, still missing on tilt, magnetic, confetti, page transitions, reveal).
- Hero verified badge is an `<i>` with a click handler — not keyboard-focusable, no role/label.
- Project stack cards are clickable `<div>`s — not keyboard accessible.
- Command palette / modals: verify focus trap and focus return.

## 🟢 Performance

- `MyPic.png` (~2.9 MB) is still used as favicon (hero now uses `MyPic.webp` at 34 KB). Consider 32/180px PNGs for icons.
- Phosphor Icons loaded from unpkg without a pinned version (`@phosphor-icons/web`) — unpredictable upgrades; consider pinning `@2.1.1`.
- ~29 separate script requests; fine on HTTP/2 but all render-blocking at end of body.
- Blog/gear images are hot-linked from Unsplash.

## 🟢 SEO / sharing

- Hash routing means subpages aren't individually indexable.
