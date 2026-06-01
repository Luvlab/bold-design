-- Bold Design — Inhouse Projects
-- Stores Bold Design's own software/digital dev projects (separate from restaurant concepts)

create table if not exists inhouse_projects (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  slug            text unique not null,
  name            text not null,
  name_fr         text,
  name_mn         text,
  description     text,
  description_fr  text,
  description_mn  text,
  category        text not null default 'dev'
                    check (category in ('dev', 'concept', 'design', 'research')),
  status          text not null default 'concept'
                    check (status in ('concept', 'design', 'dev', 'beta', 'live', 'paused')),
  owner           text default 'Bold Design',
  tech_stack      text[] default array[]::text[],
  tags            text[] default array[]::text[],
  target_audience text,
  languages       text[] default array[]::text[],
  is_featured     boolean default false,
  url             text,
  github_url      text,
  notes           text
);

alter table inhouse_projects enable row level security;

create policy "Public read for inhouse_projects"
  on inhouse_projects for select using (true);

create policy "Authenticated write for inhouse_projects"
  on inhouse_projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Seed: GeoKids — Geography Tutor for kids (all ages, all languages)
insert into inhouse_projects
  (slug, name, name_fr, name_mn, description, description_fr, description_mn,
   category, status, owner, tech_stack, tags, target_audience, languages, is_featured)
values (
  'geokids-tutor',
  'GeoKids — Geography Tutor',
  'GeoKids — Tuteur Géographie',
  'ГэоКидс — Газарзүйн багш',
  'Interactive geography tutor for children of all ages. Adapts to skill level, covers all countries, capitals, flags and cultures. Available in all world languages. Maps, quizzes, exploration — making geography fun and accessible everywhere.',
  'Tuteur de géographie interactif pour enfants de tous âges. Adapté au niveau de l''élève, couvre tous les pays, capitales, drapeaux et cultures. Disponible dans toutes les langues du monde. Cartes, quiz, exploration — rendre la géographie fun et accessible partout.',
  'Дэлхийн бүх насны хүүхдэд зориулсан интерактив газарзүйн багш. Суралцагчийн түвшинд тохирсон, бүх улс орон, нийслэл, туг, соёлыг хамарсан. Дэлхийн бүх хэлээр боломжтой.',
  'dev',
  'concept',
  'Bold Design',
  array['Next.js', 'AI', 'next-intl', 'Supabase', 'React', 'Mapbox'],
  array['education', 'kids', 'geography', 'multilingual', 'AI', 'inhouse', 'edtech', 'all-ages'],
  'Children all ages, parents, schools worldwide',
  array['fr', 'mn', 'en', 'zh', 'ar', 'es', 'pt', 'de', 'ja', 'ko', 'ru', 'hi', '+ all world languages'],
  true
)
on conflict (slug) do nothing;
