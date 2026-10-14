---
name: manage-vercel
description: >-
  Inspects Vercel deployments, build logs, and project health for roldangaspar.vercel.app.
  Use when the user asks to check deployment status, debug Vercel build issues, or monitor production.
---

# Manage Vercel Deployments

Operational runbook for monitoring and troubleshooting Vercel deployments using the Vercel MCP server or CLI.

## 1. Inspecting Recent Deployments

When checking if a commit deployed cleanly:
1. Use the Vercel MCP tool `getVercelDeployments` or query the Vercel REST API:
   - Verify `state`: Should be `READY` (or `BUILDING` if recently pushed).
   - Verify `target`: Should be `production` for pushes to `main`.
2. Check the commit hash matches the latest local git commit:
   ```powershell
   git rev-parse HEAD
   ```

## 2. Diagnosing Build Failures

If a deployment fails (`state: ERROR` or `CANCELED`):
1. Retrieve build events using `getVercelDeploymentEvents` with the failing `deploymentId`.
2. Look for common static site failure causes:
   - Missing assets referenced in HTML/CSS (e.g. 404 on image paths).
   - Malformed `vercel.json` configuration.
   - Accidental addition of unbuilt dependencies or unsupported modules.
3. Formulate the fix in the local working copy, verify locally using `verify-locally`, and commit.

## 3. Verifying Live Production

1. Test that the live site responds with HTTP 200:
   ```powershell
   Invoke-WebRequest -Uri "https://roldangaspar.vercel.app" -Method Head
   ```
2. Check that critical static routes load:
   - `https://roldangaspar.vercel.app/MyPic.png`
   - `https://roldangaspar.vercel.app/src/css/main.css`
   - `https://roldangaspar.vercel.app/src/js/data.js`

## 4. Safety Guardrails

- Never cancel or delete existing deployments without explicit user confirmation.
- Never edit DNS records or remove custom domains via MCP tools unless explicitly requested by the user.
