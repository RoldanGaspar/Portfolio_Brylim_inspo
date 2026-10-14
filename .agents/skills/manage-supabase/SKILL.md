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

When creating a new table for portfolio features, write idempotent SQL with UUID keys, timestamps, and RLS enabled:

```sql
-- Example: Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread'
);

-- Mandatory: Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous visitors to insert messages
CREATE POLICY "Allow public submissions" 
ON public.contact_messages 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policy: Do NOT allow public to read messages
-- (Only authenticated dashboard or service role can select)
```

## 3. Applying Migrations via Supabase MCP

1. Execute the migration SQL using the Supabase MCP database tool.
2. Verify table creation by querying table metadata or schemas:
   - Ensure the table appears in `public` schema.
   - Verify `row_security` is enabled (`true`).

## 4. Frontend Client Integration

When wiring the table into the portfolio:
1. Ensure the Supabase JS library is included in `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```
2. Create or extend `src/js/utils/supabase-client.js`:
   - Initialize client with `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
   - Never embed secret or service role keys.
3. Expose clean, promise-based helper functions:
   ```javascript
   async function submitContactMessage(payload) {
       if (!window.supabaseClient) throw new Error('Database client not available');
       const { data, error } = await window.supabaseClient
           .from('contact_messages')
           .insert([payload]);
       if (error) throw error;
       return data;
   }
   window.submitContactMessage = submitContactMessage;
   ```
4. Verify using `verify-locally` and test submissions.
