-- Enable RLS
alter table if exists profiles enable row level security;
alter table if exists posts enable row level security;
alter table if exists case_studies enable row level security;
alter table if exists media enable row level security;

-- 1. PROFILES (Existing)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- 2. CMS PAGES (New)
create table if not exists cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  status text check (status in ('draft','published')) default 'draft',
  blocks jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  og_image_path text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table cms_pages enable row level security;

-- 3. POSTS (Update)
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  cover_image_path text,
  content jsonb not null default '[]'::jsonb, -- This serves as 'blocks'
  tags text[] default '{}',
  status text check (status in ('draft','published')) default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  og_image_path text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
-- Ensure new columns exist if table already existed
do $$ 
begin
  if not exists (select 1 from information_schema.columns where table_name = 'posts' and column_name = 'content') then
    alter table posts add column content jsonb not null default '[]'::jsonb;
  end if;
end $$;

-- 4. CASE STUDIES (Update)
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  client_name text,
  one_liner text,
  industry text,
  tags text[] default '{}',
  hero_media_path text,
  sections jsonb not null default '[]'::jsonb, -- This serves as 'blocks'
  metrics jsonb default '{}'::jsonb,
  status text check (status in ('draft','published')) default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  og_image_path text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
-- Ensure new columns exist
do $$ 
begin
  if not exists (select 1 from information_schema.columns where table_name = 'case_studies' and column_name = 'client_name') then
    alter table case_studies add column client_name text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'case_studies' and column_name = 'metrics') then
    alter table case_studies add column metrics jsonb default '{}'::jsonb;
  end if;
end $$;

-- 5. CONSULTANT APPLICATIONS (New)
create table if not exists people_consultant_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  linkedin text,
  current_company text,
  role text,
  expertise_tags text[] default '{}',
  availability text,
  hourly_rate_range text,
  visibility_preference text check (visibility_preference in ('anonymous', 'first-name-only', 'public')) default 'anonymous',
  compliance_confirmed boolean default false,
  notes text,
  status text default 'new',
  created_at timestamptz default now()
);
alter table people_consultant_applications enable row level security;

-- 6. MEDIA (Existing)
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  alt text,
  caption text,
  width int,
  height int,
  created_at timestamptz default now()
);

-- INDEXES
create index if not exists posts_status_published_at_idx on posts (status, published_at desc);
create index if not exists posts_slug_idx on posts (slug);
create index if not exists case_studies_status_published_at_idx on case_studies (status, published_at desc);
create index if not exists case_studies_slug_idx on case_studies (slug);
create index if not exists cms_pages_slug_idx on cms_pages (slug);

-- RLS POLICIES

-- Helper for admin check
-- Note: We can't use a function in a policy definition easily without more setup, so we repeat the subquery.

-- PROFILES
create policy "Profiles are viewable by owner" on profiles for select using (auth.uid() = id);

-- CMS PAGES
create policy "Public can read published pages" on cms_pages for select using (status = 'published');
create policy "Admins can manage pages" on cms_pages for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.is_admin = true)
);

-- POSTS
create policy "Public can read published posts" on posts for select using (status = 'published');
create policy "Admins can manage posts" on posts for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.is_admin = true)
);

-- CASE STUDIES
create policy "Public can read published case studies" on case_studies for select using (status = 'published');
create policy "Admins can manage case studies" on case_studies for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.is_admin = true)
);

-- APPLICATIONS
-- Public can insert (apply)
create policy "Public can submit applications" on people_consultant_applications for insert with check (true);
-- Only admins can view
create policy "Admins can view applications" on people_consultant_applications for select using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.is_admin = true)
);

-- MEDIA
create policy "Admins can manage media" on media for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.is_admin = true)
);
create policy "Public can read media" on media for select using (true);
