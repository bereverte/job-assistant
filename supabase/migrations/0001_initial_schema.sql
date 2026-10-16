create table public.resumes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null unique references auth.users (id) on delete cascade,
    file_path text not null,
    extracted_text text not null,
    created_at timestamptz not null default now()
);

create type public.application_status as enum ('saved', 'applied', 'interview', 'rejected', 'offer');

create table public.applications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    company text not null,
    role text not null,
    description text,
    status public.application_status not null default 'saved',
    applied_at date,
    notes text,
    updated_at timestamptz not null default now(),
    created_at timestamptz not null default now()
);

create index applications_user_id_idx on public.applications (user_id);