-- Create inquiries table for contact form submissions
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  service text not null,
  details text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;

-- Allow anonymous visitors to submit inquiries from website
create policy "Allow anonymous insert"
  on public.inquiries
  for insert
  to anon
  with check (true);

-- Allow authenticated dashboard users to read inquiries
create policy "Allow authenticated select"
  on public.inquiries
  for select
  to authenticated
  using (true);

