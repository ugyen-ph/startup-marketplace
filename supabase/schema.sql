-- StartupHub schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).

-- ---------- Types ----------
create type public.user_role as enum ('founder', 'investor');
create type public.startup_stage as enum (
  'idea',
  'pre_seed',
  'seed',
  'series_a',
  'series_b',
  'growth'
);
create type public.interest_status as enum ('pending', 'accepted', 'declined');

-- ---------- profiles ----------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'investor',
  full_name text,
  company text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- startups ----------
create table public.startups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  tagline text,
  description text,
  industry text,
  stage public.startup_stage not null default 'idea',
  funding_goal numeric(14, 2) not null default 0,
  amount_raised numeric(14, 2) not null default 0,
  website text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index startups_owner_id_idx on public.startups (owner_id);
create index startups_stage_idx on public.startups (stage);
create index startups_industry_idx on public.startups (industry);

-- ---------- interests (investor → startup) ----------
create table public.interests (
  id uuid primary key default gen_random_uuid(),
  startup_id uuid not null references public.startups (id) on delete cascade,
  investor_id uuid not null references auth.users (id) on delete cascade,
  message text,
  amount numeric(14, 2),
  status public.interest_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (startup_id, investor_id)
);

create index interests_startup_id_idx on public.interests (startup_id);
create index interests_investor_id_idx on public.interests (investor_id);

-- ---------- updated_at trigger ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger startups_set_updated_at
  before update on public.startups
  for each row execute function public.set_updated_at();

-- ---------- new-user → profile ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'investor'),
    new.raw_user_meta_data ->> 'full_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Row Level Security ----------
alter table public.profiles enable row level security;
alter table public.startups enable row level security;
alter table public.interests enable row level security;

-- profiles: readable by everyone, writable by the owner
create policy "profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- startups: readable by everyone, writable by the owner
create policy "startups are viewable by everyone"
  on public.startups for select
  using (true);

create policy "founders can insert their own startups"
  on public.startups for insert
  with check (auth.uid() = owner_id);

create policy "founders can update their own startups"
  on public.startups for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "founders can delete their own startups"
  on public.startups for delete
  using (auth.uid() = owner_id);

-- interests: investors manage their own; founders see interests on their startups
create policy "investors can create interests"
  on public.interests for insert
  with check (auth.uid() = investor_id);

create policy "investors can view their own interests"
  on public.interests for select
  using (auth.uid() = investor_id);

create policy "founders can view interests on their startups"
  on public.interests for select
  using (
    exists (
      select 1 from public.startups s
      where s.id = interests.startup_id
        and s.owner_id = auth.uid()
    )
  );

create policy "founders can update interests on their startups"
  on public.interests for update
  using (
    exists (
      select 1 from public.startups s
      where s.id = interests.startup_id
        and s.owner_id = auth.uid()
    )
  );
