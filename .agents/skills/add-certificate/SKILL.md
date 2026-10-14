---
name: add-certificate
description: >-
  Adds a new certificate or badge (Cisco NetAcad, Credly, AWS, etc.) to the
  certifications gallery, including image/PDF assets and filter category. Use
  when the user shares a new certificate, Credly link, or badge.
---

# Add a Certificate

## Pick the right list

| Credential | List in `data.js` |
|---|---|
| Has certificate image/PDF + hours (Cisco NetAcad style) | `netacadCertsList` |
| Credly badge only | `credlyAdditionalBadgesList` |
| NetAcad achievement badge | `netacadAchievementsList` |
| Professional exam cert with verify URL | `certsList` |

## Steps (NetAcad-style, the common case)

1. **Get facts from the user** — title, issuer, academy, issue date, hours, description, Credly URL, verify URL, badge image URL, skills. Never fill these from memory. A Credly page usually has all of them; ask the user for the link.

2. **Assets** — slug = kebab-case title (e.g. `cyber-threat-management`):
   - `assets/certificates/<slug>.png` (certificate image)
   - `assets/certificates/pdf/<slug>.pdf` (optional, checker warns if missing)
   Ask the user to drop files in, or tell them the exact paths to use. Don't rename existing assets.

3. **Entry** — append to `netacadCertsList`, newest first within the same date:

   ```js
   {
       title: "Cyber Threat Management",
       issuer: "CISCO NETWORKING ACADEMY",
       academy: "Networking Academy",
       date: "Oct 1, 2026",
       hours: 16,
       description: "One line from the official course description.",
       badgeUrl: "https://images.credly.com/...",
       credlyUrl: "https://www.credly.com/badges/...",
       verifyUrl: "https://www.netacad.com/certificates/?issuanceId=...",
       certificateImage: "assets/certificates/cyber-threat-management.png",
       skills: ["Threat Management", "Incident Response"]
   },
   ```

4. **Filter category** — open `getCertCategory()` in `src/js/views/certifications-all.js`. Make sure the new title/issuer maps to the right filter (`cisco`, `security`, `dev`, `cloud`). Adjust keywords if it doesn't.

5. **Home page** — `home.js` also renders from `netacadCertsList`; check the home certifications section still looks balanced.

6. **Verify** — run `verify-locally`. Checker errors if `certificateImage` doesn't exist. In the browser: filter tabs, lightbox open/close, PDF download, verify link opens in new tab.

7. **Brief** — add the cert to the verified list in `.agents/context/PROJECT_BRIEF.md`.
