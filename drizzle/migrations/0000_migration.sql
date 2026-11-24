CREATE TABLE public.community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (name IS NULL OR char_length(name) <= 80)
);
GRANT SELECT, INSERT ON public.community_posts TO anon, authenticated;
GRANT ALL ON public.community_posts TO service_role;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read posts" ON public.community_posts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can add posts" ON public.community_posts FOR INSERT TO anon, authenticated WITH CHECK (true);