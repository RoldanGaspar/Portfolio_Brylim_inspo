# Known Issues & Tech Debt

Living register. **Add** issues you discover; **remove** them (and note it in your summary) when fixed.
Severity: 🔴 high (credibility/broken) · 🟠 medium (UX/maintainability) · 🟢 low (polish).

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

## 🟠 Maintainability

- **Legacy root files** `data.js`, `main.js`, `style.css` are dead code (~90 KB). Candidate for deletion with approval.
- `views.css` is ~4,500 lines; finding styles is slow. Consider splitting per view (keep `@import` order).

## 🟢 Performance

- ~29 separate script requests; fine on HTTP/2 but all render-blocking at end of body.
- Blog/gear images are hot-linked from Unsplash (mitigated with `loading="lazy" decoding="async" referrerpolicy="no-referrer"`).

## 🟢 SEO / sharing

- Hash routing means subpages aren't individually indexable by non-JS crawlers (mitigated for JS-capable crawlers, browser history, and screen readers via Schema.org JSON-LD in `index.html` and dynamic per-route `document.title` + meta description updates in `router.js`).

