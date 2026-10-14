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
  - Configured in `~/.gemini/config/mcp_config.json` via `vercel-mcp`.
  - Used by the agent to query deployments (`getVercelDeployments`), read build events (`getVercelDeploymentEvents`), inspect runtime errors, and verify domain health.

---

## 2. Supabase Cloud Database

- **Service Role:** Provides scalable relational PostgreSQL database, authentication, and realtime features without requiring a custom Node.js server.
- **Supabase MCP Server:**
  - Configured in `~/.gemini/config/mcp_config.json` via `@supabase/mcp-server-supabase`.
  - Used by the agent to manage schemas, inspect table structures, apply SQL migrations, and query data.

### Planned / Supported Dynamic Portfolio Features

| Feature | Target Table | Architecture & Security Pattern |
|---|---|---|
| **Contact Form** | `contact_messages` | Visitors submit messages from portfolio. RLS allows `anon` to `INSERT` only. Admin views messages via Supabase dashboard / MCP. |
| **Live Visitor Counter** | `page_views` / `site_stats` | Atomic view increments using PostgreSQL stored function (`increment_views()`), replacing the hardcoded static viewer count in the sidebar. |
| **Interactive Guestbook** | `guestbook_entries` | Public visitors leave a short note; RLS allows public `SELECT` on approved rows and `INSERT` with rate limits. |

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
   const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
   ```
3. **Security:** Only `SUPABASE_ANON_KEY` is ever placed in client code. Row Level Security policies prevent unauthorized access.
