---
trigger: always_on
---

# Production Safety Rules

`main` is wired to Vercel. A push to `main` = a deploy to https://roldangaspar.vercel.app.

## Requires explicit user approval (ask every time)

- `git push` (any branch), `git push --force`, `git reset --hard`, `git rebase` on shared history
- `npx vercel` / `vercel --prod` or any deploy command
- Deleting files, renaming/moving files referenced by `index.html` or `data.js`
- Changing `vercel.json`, `.gitignore`, or adding CDN dependencies

## Safe to do without asking

- Editing source files in the working tree
- `git status`, `git diff`, `git log`, `git add`, local commits (when asked to commit)
- Running the local server and the check script

## Commits

- Conventional Commits, matching existing history: `feat(ui): ...`, `fix: ...`, `docs: ...`, `refactor: ...`, `chore: ...`.
- One logical change per commit. Never commit `.env*`, `.vercel/`, or `node_modules/`.

## Before handing work back

1. `node .agents/skills/verify-locally/scripts/check.mjs` passes (no errors).
2. You've told the user exactly what to look at in the browser.
3. Nothing outside the task scope changed (`git diff --stat` to confirm).

## Secrets

This is a public static site. Never add API keys, tokens, or private endpoints to any file — anything in the repo is publicly downloadable.
