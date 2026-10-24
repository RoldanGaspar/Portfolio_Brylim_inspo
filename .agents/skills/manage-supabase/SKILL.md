---
name: manage-supabase
description: >-
  Manages Supabase database tables, schema migrations, Row Level Security policies,
  and frontend client connections. Use when adding dynamic features (contact form,
  visitor counter, guestbook) or querying database tables.
---

# Manage Supabase Database & Integrations

Operational runbook for managing Supabase database structures safely and wiring dynamic backend features into the portfolio.

## 1. Safety First

- **Never drop tables or truncate data in production** without explicit confirmation from the user.
- **Always enable Row Level Security (RLS)** on any table accessible via client-side keys.

## 2. Table Creation Standard (DDL Template)

When creating or modifying tables for portfolio features, write idempotent SQL with UUID keys, timestamps, length constraints, and RLS enabled. Store versioned migrations under `supabase/migrations/`:

```sql
-- Example: Contact Messages Table (as in supabase/migrations/20261021_initial_schema.sql)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    inquiry_type TEXT NOT NULL DEFAULT 'General',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread',
    CONSTRAINT contact_name_len CHECK (char_length(name) <= 80),
    CONSTRAINT contact_email_len CHECK (char_length(email) <= 100),
    CONSTRAINT contact_message_len CHECK (char_length(message) <= 1000)
);

-- Mandatory: Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous visitors to insert messages
DROP POLICY IF EXISTS "Allow public contact submissions" ON public.contact_messages;
CREATE POLICY "Allow public contact submissions" 
ON public.contact_messages 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policy: Do NOT allow public to read messages
-- (Absence of a SELECT policy for anon defaults to denial in PostgreSQL RLS)
```

## 3. Applying Migrations via Supabase MCP

1. Execute the migration SQL using the available Supabase MCP database tool (e.g. `execute_sql` or migration tool, discovered from the MCP server capabilities).
2. Verify table creation and security by querying table metadata:
   - Ensure the table appears in `public` schema.
   - Verify `row_security` is enabled (`true`).
   - Run anonymous verification queries (e.g. test that `SELECT * FROM contact_messages` returns 0 rows for `anon`).

## 4. Frontend Client Integration

When wiring the table into the portfolio:
1. Ensure the Supabase JS library is included in `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```
2. Create or extend `src/js/utils/supabase-client.js`:
   - Initialize client with `SUPABASE_URL` and `SUPABASE_ANON_KEY` via `getSupabaseClient()`.
   - Never embed secret or service role keys.
3. Expose clean, promise-based helper functions:
   ```javascript
   async function submitContactMessage(payload) {
       const client = getSupabaseClient();
       if (!client) throw new Error('Database client not available');
       const { data, error } = await client
           .from('contact_messages')
           .insert([{
               name: payload.name.trim(),
               email: payload.email.trim(),
               inquiry_type: payload.inquiry_type || 'General',
               message: payload.message.trim()
           }]);
       if (error) throw error;
       return data;
   }
   window.submitContactMessage = submitContactMessage;
   ```
4. Verify using `verify-locally` and test submissions in browser.
