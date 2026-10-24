---
trigger: always_on
---

# Content Integrity Rules

This portfolio is a factual record about a real person, read by recruiters and clients. Invented content is worse than missing content.

## Never fabricate

Do NOT invent or embellish, even as "example" or "placeholder":

- Job titles, employers, dates, locations
- Metrics (downloads, users, %, ratings, "#1" rankings, community size)
- Testimonials, recommender names or roles
- Certifications, badges, credential URLs
- Project names, App Store links, tech used
- Social profile URLs

If content is needed and not provided, **ask the user**. If you must leave a slot, use an obvious marker the check script can find:

```js
title: "TODO(roldan): job title",
```

## Verified vs unverified content

Treat content as **verified** only if the user stated it or it has a matching asset/credential link in the repo. Currently verified:

- Name, location (Pampanga, Philippines), email `gaspar26roldan@gmail.com`, photo `MyPic.png` / `MyPic.webp`
- Tagline: Software Engineer · AI · Cybersecurity Enthusiast
- 9 Cisco NetAcad Certifications in `netacadCertsList` (each has a matching PNG preview + PDF in `assets/certificates/` and Credly/NetAcad verification URL)
- 1 AWS Educate Introduction to Cloud 101 Training Badge in `credlyAdditionalBadgesList` (Credly verified)
  *(Total: 10 verified credentials, accurately reflected in the Hero stat "10+ Credentials")*
- 5 NetAcad Achievement Badges in `netacadAchievementsList` (NetAcad verified)
- 4 Open-Source Repositories in `data.js#projects`: `tarsi-budget-tracker`, `awardena-security` (AWarden-A), `pos-inventory`, and `pet-hub-payroll`
- Authentic Pampanga workstation setup in `data.js#gear`

**Curriculum vs. Credential Distinction:**
- `cyberLab.verifiedFoundations` and terminal commands reference foundational coursework topics and simulated SOC lab scenarios grounded in Cisco NetAcad CyberOps and Network Defense curriculum; they represent simulated sandbox domains, not additional standalone certificate files.

Everything outside this verified inventory must be treated as **unverified** (see `.agents/context/KNOWN_ISSUES.md` → "Claim-to-Evidence & Verification Record"). Rules for unverified content:

- Don't expand on it, reuse it elsewhere, or feed it to the AI chatbot answers.
- Don't delete it on your own either — flag it to the user and let them decide.

## Writing style for real content

- First person, plain, specific. Short sentences. No hype words ("cutting-edge", "revolutionary", "passionate", "synergy", "leverage").
- Prefer concrete nouns and real numbers the user gave over adjectives.
- Keep the existing lowercase page-title voice (`blog`, `projects`) and monospace section labels (`01 — blog`).
