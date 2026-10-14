---
trigger: model_decision
description: Apply when using or configuring MCP tools for Vercel, Supabase, or GitHub.
---

# MCP Safety & Integration Rules

These rules protect production environments, database integrity, and sensitive secrets when interacting with external services via Model Context Protocol (MCP).

## 1. Zero Unconfirmed Destructive Actions

Never execute destructive operations without explicit, unambiguous user confirmation in the conversation:
- **Vercel**: Never delete deployments, remove custom domains, or modify DNS records without asking.
- **Supabase**: Never run `DROP TABLE`, `DROP SCHEMA`, `TRUNCATE`, or `DELETE` queries on production data without explicit confirmation.
- **GitHub**: Never delete branches, force push, or close pull requests/issues without confirmation.

## 2. Secrets & Credential Boundaries

This portfolio is a public static SPA hosted on Vercel CDN. Everything committed to this repository is publicly accessible.
- **Never expose sensitive keys in frontend code**:
  - `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ACCESS_TOKEN`, `VERCEL_API_KEY`, and `GITHUB_PERSONAL_ACCESS_TOKEN` must **NEVER** appear in any file under `src/`, `index.html`, or commit messages.
- **Allowed frontend keys**:
  - Only the public `SUPABASE_URL` and `SUPABASE_ANON_KEY` may be embedded in client-side code, and only when protected by PostgreSQL Row Level Security (RLS).
- **Tool credentials**: Keep all administrative tokens confined to `~/.gemini/config/mcp_config.json`.

## 3. Database Security & Row Level Security (RLS)

Any table created in Supabase for this portfolio must enforce the principle of least privilege:
- **RLS is mandatory**: Every newly created table must execute `ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;`.
- **Restrict public access**:
  - For submissions (e.g. contact form): Grant `INSERT` access to `anon`, but forbid `SELECT`, `UPDATE`, or `DELETE`.
  - For read-only content (e.g. public guestbook entries or view counts): Restrict `SELECT` to approved/verified rows.
- **Sanitize inputs**: Use parameterized queries and avoid string concatenation when executing SQL statements.

## 4. Deployment Verification

After any code change pushed to GitHub:
- Check the deployment status via Vercel MCP tools or verify that the build succeeds without runtime or asset loading errors.
- If a build fails, immediately inspect build logs to identify the breaking commit or asset mismatch before attempting further changes.
