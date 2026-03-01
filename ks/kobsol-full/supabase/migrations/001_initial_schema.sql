-- ============================================================
-- KOBSOL — Schéma initial Supabase
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- ============================================================

-- ── 1. EXTENSION UUID ────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── 2. TABLE PROFILES ────────────────────────────────────────
-- Liée automatiquement à auth.users via trigger
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  name        text not null default '',
  email       text not null default '',
  role        text not null default 'member' check (role in ('member', 'superadmin')),
  avatar_url  text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── 3. TABLE PROJECTS ────────────────────────────────────────
create table public.projects (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  amount_per_person numeric not null check (amount_per_person > 0),
  period            text not null check (period in ('weekly','bimonthly','monthly','yearly')),
  start_date        date not null,
  end_date          date,
  country           text,
  admin_id          uuid references public.profiles(id) on delete cascade not null,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- ── 4. TABLE PROJECT_MEMBERS ─────────────────────────────────
create table public.project_members (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references public.projects(id) on delete cascade not null,
  user_id     uuid references public.profiles(id) on delete set null,
  email       text,           -- email d'invitation (avant inscription)
  name        text not null,
  order_index integer not null default 0,
  status      text default 'invited' check (status in ('invited','active','inactive')),
  invited_at  timestamptz default now(),
  joined_at   timestamptz,
  unique(project_id, order_index)
);

-- ── 5. TABLE LATE_PAYMENTS ───────────────────────────────────
create table public.late_payments (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references public.projects(id) on delete cascade not null,
  member_id   uuid references public.project_members(id) on delete cascade not null,
  since       date not null,
  due_date    date,
  reason      text default '',
  resolved    boolean default false,
  resolved_at timestamptz,
  created_at  timestamptz default now()
);

-- ── 6. TRIGGER : créer profile à l'inscription ───────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 7. TRIGGER : updated_at automatique ──────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_projects_updated_at
  before update on public.projects
  for each row execute procedure public.set_updated_at();

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ── 8. TRIGGER : lier membre invité quand il s'inscrit ───────
-- Quand un user s'inscrit avec un email déjà présent dans project_members,
-- on lie automatiquement son user_id
create or replace function public.link_invited_member()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  update public.project_members
  set user_id = new.id, status = 'active', joined_at = now()
  where email = new.email and user_id is null;
  return new;
end;
$$;

create trigger on_user_registered_link_member
  after insert on public.profiles
  for each row execute procedure public.link_invited_member();

-- ── 9. ROW LEVEL SECURITY ────────────────────────────────────
alter table public.profiles       enable row level security;
alter table public.projects       enable row level security;
alter table public.project_members enable row level security;
alter table public.late_payments  enable row level security;

-- Helper : est-ce que l'utilisateur courant est superadmin ?
create or replace function public.is_superadmin()
returns boolean language sql security definer
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'superadmin'
  );
$$;

-- PROFILES
create policy "Voir son propre profil"
  on public.profiles for select
  using (id = auth.uid() or public.is_superadmin());

create policy "Modifier son propre profil"
  on public.profiles for update
  using (id = auth.uid());

create policy "Superadmin: tout voir"
  on public.profiles for all
  using (public.is_superadmin());

-- PROJECTS
create policy "Voir ses projets (admin ou membre)"
  on public.projects for select
  using (
    admin_id = auth.uid()
    or exists (
      select 1 from public.project_members
      where project_id = projects.id and user_id = auth.uid()
    )
    or public.is_superadmin()
  );

create policy "Créer un projet"
  on public.projects for insert
  with check (admin_id = auth.uid());

create policy "Modifier son projet (admin uniquement)"
  on public.projects for update
  using (admin_id = auth.uid() or public.is_superadmin());

create policy "Supprimer son projet (admin uniquement)"
  on public.projects for delete
  using (admin_id = auth.uid() or public.is_superadmin());

-- PROJECT_MEMBERS
create policy "Voir membres de ses projets"
  on public.project_members for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.projects
      where id = project_id
        and (admin_id = auth.uid() or public.is_superadmin())
    )
  );

create policy "Admin gère les membres"
  on public.project_members for all
  using (
    exists (
      select 1 from public.projects
      where id = project_id and admin_id = auth.uid()
    )
    or public.is_superadmin()
  );

-- LATE_PAYMENTS
create policy "Voir retards de ses projets"
  on public.late_payments for select
  using (
    exists (
      select 1 from public.projects
      where id = project_id
        and (admin_id = auth.uid()
          or exists (
            select 1 from public.project_members
            where project_id = projects.id and user_id = auth.uid()
          ))
    )
    or public.is_superadmin()
  );

create policy "Admin gère les retards"
  on public.late_payments for all
  using (
    exists (
      select 1 from public.projects
      where id = project_id and admin_id = auth.uid()
    )
    or public.is_superadmin()
  );

-- ── 10. VUE ADMIN : stats globales ───────────────────────────
create or replace view public.admin_stats as
select
  (select count(*) from public.profiles)                       as total_users,
  (select count(*) from public.projects)                       as total_projects,
  (select count(*) from public.project_members)                as total_members,
  (select count(*) from public.late_payments where not resolved) as active_lates,
  (select coalesce(sum(amount_per_person), 0) from public.projects) as total_amount_in_play;

-- ── 11. DÉFINIR LE PREMIER SUPERADMIN ────────────────────────
-- ⚠️  Remplacez par votre email APRÈS votre première inscription
-- update public.profiles set role = 'superadmin' where email = 'votre@email.com';
