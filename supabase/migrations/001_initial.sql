-- Bold Design — Initial Schema
-- Supabase project: vljesbqayvspmehhrrff (EU Paris / eu-west-3)

-- ─────────────────────────────────────────────
-- Partner Requests
-- ─────────────────────────────────────────────
create table if not exists partner_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  name            text not null,
  email           text not null,
  company         text,
  partnership_type text,
  message         text not null,
  status          text default 'new' check (status in ('new', 'contacted', 'active', 'declined'))
);

-- ─────────────────────────────────────────────
-- Newsletter / Notify
-- ─────────────────────────────────────────────
create table if not exists newsletter (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email      text unique not null,
  source     text default 'general',
  confirmed  boolean default false
);

-- ─────────────────────────────────────────────
-- Products (seeded from Notion)
-- ─────────────────────────────────────────────
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name_fr     text not null,
  name_en     text,
  name_mn     text,
  description_fr text,
  description_en text,
  description_mn text,
  status      text default 'concept' check (status in ('concept', 'research', 'dev', 'ready')),
  category    text,
  reference_url text,
  notion_id   text unique,
  tags        text[] default array[]::text[]
);

-- ─────────────────────────────────────────────
-- Research Items (seeded from Notion)
-- ─────────────────────────────────────────────
create table if not exists research_items (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  title       text not null,
  description text,
  source      text,
  source_url  text,
  category    text,
  notion_id   text unique,
  tags        text[] default array[]::text[]
);

-- ─────────────────────────────────────────────
-- Concepts
-- ─────────────────────────────────────────────
create table if not exists concepts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  slug        text unique not null,
  name_fr     text not null,
  name_en     text,
  name_mn     text,
  description_fr text,
  description_en text,
  description_mn text,
  type        text check (type in ('street', 'bistro', 'foodtruck', 'gastro', 'mongolia', 'other')),
  stage       text default 'concept',
  is_featured boolean default false
);

-- ─────────────────────────────────────────────
-- RLS Policies
-- ─────────────────────────────────────────────

-- Partner requests: anyone can insert, only auth users can read
alter table partner_requests enable row level security;
create policy "anyone can submit partner request" on partner_requests
  for insert with check (true);
create policy "admins can read partner requests" on partner_requests
  for select using (auth.role() = 'authenticated');

-- Newsletter: anyone can subscribe
alter table newsletter enable row level security;
create policy "anyone can subscribe" on newsletter
  for insert with check (true);
create policy "admins can read subscribers" on newsletter
  for select using (auth.role() = 'authenticated');

-- Products: public read
alter table products enable row level security;
create policy "public read products" on products
  for select using (true);
create policy "admins write products" on products
  for all using (auth.role() = 'authenticated');

-- Research: public read
alter table research_items enable row level security;
create policy "public read research" on research_items
  for select using (true);
create policy "admins write research" on research_items
  for all using (auth.role() = 'authenticated');

-- Concepts: public read
alter table concepts enable row level security;
create policy "public read concepts" on concepts
  for select using (true);
create policy "admins write concepts" on concepts
  for all using (auth.role() = 'authenticated');
