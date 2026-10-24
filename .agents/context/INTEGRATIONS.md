# External Integrations Architecture (Vercel & Supabase)

Technical specifications for how external cloud platforms connect to the Roldan Gaspar portfolio SPA.

---

## 1. Vercel Hosting & Deployment

- **Production URL:** [https://roldangaspar.vercel.app](https://roldangaspar.vercel.app)
- **Repository Connection:** `RoldanGaspar/Portfolio_Brylim_inspo`
- **Production Branch:** `main`
- **Hosting Model:** Static Asset Hosting on Vercel Global Edge Network.
- **Vercel Config (`vercel.json`):**
  ```json
  {
    "version": 2,
    "cleanUrls": true
  }
  ```
- **Deployment Flow:**
  - Pushing to `origin main` immediately triggers an automated Vercel build and deployment.
  - Zero build step: Vercel serves the workspace directly as static files.
- **Vercel MCP Server:**
  - Configured in agent runtime environment (e.g. `~/.gemini/config/mcp_config.json` via `vercel-mcp`). Agents in other environments should discover tool capabilities dynamically.
  - Used by the agent to query deployments (`getVercelDeployments`), read build events (`getVercelDeploymentEvents`), inspect runtime errors, and verify domain health.
  - **Authorization Boundary:** Production deployments and production Git pushes require explicit user approval (see `.agents/rules/production-safety.md`).

---

## 2. Supabase Cloud Database

- **Service Role:** Provides scalable relational PostgreSQL database, authentication, and realtime features without requiring a custom Node.js server.
- **Reproducible Schema & Migrations:** Versioned DDL, RPC functions, and RLS policies are stored in `supabase/migrations/20261021_initial_schema.sql`.
- **Supabase MCP Server:**
  - Configured in agent runtime environment (e.g. `~/.gemini/config/mcp_config.json` via `@supabase/mcp-server-supabase`). Agents in other environments should discover tool capabilities dynamically.
  - Used by the agent to manage schemas, inspect table structures, apply SQL migrations, and query data.

### Implemented Dynamic Portfolio Features

| Feature | Target Table / RPC | Architecture & Security Pattern |
|---|---|---|
| **Contact Form** | `contact_messages` (`inquiry_type`, `name`, `email`, `message`) | Visitors submit messages from modal. RLS allows `anon` to `INSERT` only (no anon `SELECT`). Admin views messages via Supabase dashboard / MCP. |
| **Live Visitor Counter** | `site_metrics` (`metric_key = 'page_views'`) · RPC `increment_site_views()` | Atomic view increments using PostgreSQL stored function (`increment_site_views()`), reading from `site_metrics`. Anon has `SELECT` only on `page_views`. |
| **Interactive Guestbook** | `guestbook_entries` | Public visitors sign short notes; RLS allows public `SELECT` on `is_approved = true` rows and `INSERT` with character constraints. |
| **Live Cyber-Loft Presence** | Realtime Broadcast / Presence (`roldan_portfolio_presence`) | Supabase Realtime channel for visitor presence sync and collaborative avatar count; local storage persists client nickname and avatar color (no durable server chat persistence). |

### Live Verification Record (Verified 2026-10-24)

- **`site_metrics`:** HTTP 200 OK — `page_views` key verified and readable by `anon`.
- **`increment_site_views()` RPC:** HTTP 200 OK — Atomic stored procedure increments count without race conditions.
- **`guestbook_entries`:** HTTP 200 OK — Public read query verified returning approved community entries.
- **`contact_messages` RLS:** HTTP 200 OK — `anon` SELECT query returns 0 rows, confirming strict privacy enforcement.

### Frontend Connection Standard

When client-side code in `src/js/` connects to Supabase:
1. **Script loading:** Load the official Supabase JS SDK via CDN in `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```
2. **Client initialization (`src/js/utils/supabase-client.js`):**
   ```javascript
   const SUPABASE_URL = 'https://<your-project-id>.supabase.co';
   const SUPABASE_ANON_KEY = '<your-public-anon-key>';
   // Implementation exports getSupabaseClient()
   const client = getSupabaseClient();
   ```
3. **Security:** Only `SUPABASE_ANON_KEY` is ever placed in client code. Row Level Security policies enforce read/write access. Secret/service-role keys must NEVER be placed in client code.
