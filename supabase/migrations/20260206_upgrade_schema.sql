-- Update Case Studies table
do $$ 
begin
  if not exists (select 1 from information_schema.columns where table_name = 'case_studies' and column_name = 'problem') then
    alter table case_studies add column problem text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'case_studies' and column_name = 'approach') then
    alter table case_studies add column approach text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'case_studies' and column_name = 'outcomes') then
    alter table case_studies add column outcomes text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'case_studies' and column_name = 'role') then
    alter table case_studies add column role text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'case_studies' and column_name = 'year') then
    alter table case_studies add column year text;
  end if;
  -- Add images array if not present (using jsonb for flexibility or text[] for simple paths)
  if not exists (select 1 from information_schema.columns where table_name = 'case_studies' and column_name = 'images') then
    alter table case_studies add column images text[] default '{}';
  end if;
end $$;

-- Update People Applications table (serving as Roster)
do $$ 
begin
  if not exists (select 1 from information_schema.columns where table_name = 'people_consultant_applications' and column_name = 'display_name') then
    alter table people_consultant_applications add column display_name text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'people_consultant_applications' and column_name = 'bio') then
    alter table people_consultant_applications add column bio text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'people_consultant_applications' and column_name = 'domain') then
    alter table people_consultant_applications add column domain text; -- e.g. "Payments", "Growth"
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'people_consultant_applications' and column_name = 'role_level') then
    alter table people_consultant_applications add column role_level text; -- "Senior", "Staff", "Lead"
  end if;
end $$;

-- RLS Update (Ensure public can read roster items if we decide to expose them)
-- Creating a policy for public read of "roster" status items if needed.
-- For now, we'll keep it strictly Admin view unless we explicitly build a public roster page fetching from this table.
-- If the /people page shows the roster, we need a public policy.

create policy "Public can read roster members"
  on people_consultant_applications for select
  using (status = 'roster' and visibility_preference = 'public');
