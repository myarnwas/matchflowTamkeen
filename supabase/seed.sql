-- =============================================================================
-- MatchFlow — Seed accounts for local/testing
-- Run AFTER 0001_initial_schema.sql, in the Supabase SQL Editor.
--
-- Creates:
--   1) A Super-Admin  (auth.users + platform_admins)
--   2) A demo Tenant  (tenants) + a Tenant-Admin (auth.users + profiles)
--
-- Passwords are bcrypt-hashed via pgcrypto's crypt(). Emails are pre-confirmed
-- so both accounts can log in immediately. Idempotent via ON CONFLICT.
-- =============================================================================

-- Fixed UUIDs so re-running is safe.
--   Super-Admin user : a0000000-0000-0000-0000-000000000001
--   Tenant-Admin user: b0000000-0000-0000-0000-000000000002
--   Demo tenant      : 11111111-1111-1111-1111-111111111111

begin;

-- ---------------------------------------------------------------------------
-- 1) SUPER-ADMIN auth user
-- ---------------------------------------------------------------------------
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  confirmation_token, recovery_token, email_change_token_new, email_change
)
values (
  '00000000-0000-0000-0000-000000000000',
  'a0000000-0000-0000-0000-000000000001',
  'authenticated', 'authenticated',
  'superadmin@matchflow.io',
  crypt('SuperAdmin!2026', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"مدير المنصة"}',
  '', '', '', ''
)
on conflict (id) do nothing;

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider,
  last_sign_in_at, created_at, updated_at
)
values (
  gen_random_uuid(),
  'a0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  '{"sub":"a0000000-0000-0000-0000-000000000001","email":"superadmin@matchflow.io"}',
  'email', now(), now(), now()
)
on conflict (provider_id, provider) do nothing;

insert into public.platform_admins (id, full_name, role)
values (
  'a0000000-0000-0000-0000-000000000001',
  'مدير المنصة',
  'super_admin'
)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 2) DEMO TENANT
-- ---------------------------------------------------------------------------
insert into public.tenants (id, name, slug, status, plan)
values (
  '11111111-1111-1111-1111-111111111111',
  'شركة الأفق المالية',
  'al-ofq-demo',
  'active',
  'growth'
)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 3) TENANT-ADMIN auth user + profile
-- ---------------------------------------------------------------------------
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  confirmation_token, recovery_token, email_change_token_new, email_change
)
values (
  '00000000-0000-0000-0000-000000000000',
  'b0000000-0000-0000-0000-000000000002',
  'authenticated', 'authenticated',
  'admin@alofq-demo.com',
  crypt('TenantAdmin!2026', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"أحمد خالد"}',
  '', '', '', ''
)
on conflict (id) do nothing;

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider,
  last_sign_in_at, created_at, updated_at
)
values (
  gen_random_uuid(),
  'b0000000-0000-0000-0000-000000000002',
  'b0000000-0000-0000-0000-000000000002',
  '{"sub":"b0000000-0000-0000-0000-000000000002","email":"admin@alofq-demo.com"}',
  'email', now(), now(), now()
)
on conflict (provider_id, provider) do nothing;

insert into public.profiles (id, tenant_id, full_name, email, role)
values (
  'b0000000-0000-0000-0000-000000000002',
  '11111111-1111-1111-1111-111111111111',
  'أحمد خالد',
  'admin@alofq-demo.com',
  'tenant_admin'
)
on conflict (id) do nothing;

commit;
