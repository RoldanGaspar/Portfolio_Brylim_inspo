---
name: ship-to-production
description: >-
  Commits and deploys changes to the live site (roldangaspar.vercel.app) via
  git push to main. Use only when the user explicitly asks to commit, push,
  publish, deploy, or ship.
---

# Ship to Production

`main` → Vercel production, automatically. There is no staging unless you push a non-main branch (Vercel creates a preview URL for it).

## Pre-flight (all must pass)

1. `node .agents/skills/verify-locally/scripts/check.mjs` → 0 errors, no new warnings vs. baseline.
2. `git status` → only intended files changed; no `.env*`, `.vercel/`, `node_modules/`, scratch files.
3. `git diff` reviewed — summarize it for the user in 2–5 bullets.
4. No unverified claims added (content-integrity rule).

## Commit

```powershell
git add <specific files>      # never blindly `git add .` without reviewing status
git commit -m "feat(ui): short imperative summary"
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`. Scope optional: `ui`, `content`, `certs`, `audio`, `ai`.

## Choose the path — ask the user

- **Preview first (recommended for visual/structural changes):**
  ```powershell
  git switch -c preview/<short-name>
  git push -u origin preview/<short-name>
  ```
  Vercel posts a preview URL. User checks it, then merge to `main`.
- **Direct to production (small, low-risk changes):**
  ```powershell
  git push origin main
  ```

**Never push without the user's explicit "yes" in this conversation.** Never force-push `main`.

## After deploy

- Ask the user to hard-refresh https://roldangaspar.vercel.app and check the changed route.
- If broken: `git revert <sha>` + push (with approval). Don't rewrite history.
- Update `KNOWN_ISSUES.md` if anything was fixed or discovered.
