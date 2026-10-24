-- ============================================================================
-- Supabase Schema & Row-Level Security (RLS) Migrations
-- Repository: RoldanGaspar/Portfolio_Brylim_inspo
-- Project: Personal Portfolio SPA (roldangaspar.vercel.app)
-- Date: 2026-10-21
-- ============================================================================

-- Enable pgcrypto for UUID generation if not already active
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. Contact Form Submissions Table (contact_messages)
-- ============================================================================
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

-- Enable Row-Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow anonymous visitors to submit contact inquiries
DROP POLICY IF EXISTS "Allow public contact submissions" ON public.contact_messages;
CREATE POLICY "Allow public contact submissions"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Explicitly deny anon SELECT, UPDATE, DELETE (Private to authenticated dashboard / service_role)
DROP POLICY IF EXISTS "Deny anon reads on contact messages" ON public.contact_messages;
-- (Absence of a SELECT policy for anon defaults to denial in Postgres RLS)

-- ============================================================================
-- 2. Atomic Telemetry & Page Views (site_metrics)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.site_metrics (
    metric_key TEXT PRIMARY KEY,
    count BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial page_views row if not present
INSERT INTO public.site_metrics (metric_key, count)
VALUES ('page_views', 0)
ON CONFLICT (metric_key) DO NOTHING;

-- Enable Row-Level Security
ALTER TABLE public.site_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow anonymous visitors to read public metrics (e.g. page_views counter)
DROP POLICY IF EXISTS "Allow public read site_metrics" ON public.site_metrics;
CREATE POLICY "Allow public read site_metrics"
ON public.site_metrics
FOR SELECT
TO anon
USING (metric_key = 'page_views');

-- Stored RPC: Atomic increment of site views (prevents race conditions)
CREATE OR REPLACE FUNCTION public.increment_site_views()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_count BIGINT;
BEGIN
    UPDATE public.site_metrics
    SET count = count + 1,
        updated_at = NOW()
    WHERE metric_key = 'page_views'
    RETURNING count INTO new_count;

    IF new_count IS NULL THEN
        INSERT INTO public.site_metrics (metric_key, count, updated_at)
        VALUES ('page_views', 1, NOW())
        RETURNING count INTO new_count;
    END IF;

    RETURN new_count;
END;
$$;

-- Grant execution permission for RPC to anonymous role
GRANT EXECUTE ON FUNCTION public.increment_site_views() TO anon, authenticated;

-- ============================================================================
-- 3. Developer Community Guestbook (guestbook_entries)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.guestbook_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    handle_or_role TEXT,
    message TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT gb_name_len CHECK (char_length(name) <= 60),
    CONSTRAINT gb_handle_len CHECK (handle_or_role IS NULL OR char_length(handle_or_role) <= 60),
    CONSTRAINT gb_msg_len CHECK (char_length(message) <= 280)
);

-- Enable Row-Level Security
ALTER TABLE public.guestbook_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow public read of approved guestbook entries
DROP POLICY IF EXISTS "Allow public read approved guestbook entries" ON public.guestbook_entries;
CREATE POLICY "Allow public read approved guestbook entries"
ON public.guestbook_entries
FOR SELECT
TO anon
USING (is_approved = true);

-- RLS Policy: Allow anonymous visitors to submit a guestbook entry
DROP POLICY IF EXISTS "Allow public guestbook insert" ON public.guestbook_entries;
CREATE POLICY "Allow public guestbook insert"
ON public.guestbook_entries
FOR INSERT
TO anon
WITH CHECK (
    char_length(name) <= 60
    AND char_length(message) <= 280
);

-- ============================================================================
-- Verification Queries (Run as anon role to test security boundaries)
-- ============================================================================
-- 1. Test contact read denial:
--    SELECT * FROM public.contact_messages; -- Expected: 0 rows returned
-- 2. Test site metrics read:
--    SELECT metric_key, count FROM public.site_metrics WHERE metric_key = 'page_views';
-- 3. Test atomic RPC increment:
--    SELECT public.increment_site_views();
-- 4. Test guestbook read:
--    SELECT id, created_at, name, handle_or_role, message FROM public.guestbook_entries WHERE is_approved = true;
