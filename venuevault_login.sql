-- =====================================================================
-- VenueVault : Login / Registration database  (PostgreSQL 13+)
-- Maitreyi College, University of Delhi
--
-- Based on the proposal (Figure 2): role-based authentication with two
-- roles, Applicant (event coordinator) and Admin. Registration is limited
-- to college email IDs. Kept light for the Raspberry Pi edge server.
--
-- Usage (fresh database, run once):
--   createdb venuevault
--   psql -d venuevault -f venuevault_login.sql
--
-- How the login page uses these tables:
--   Register  : INSERT users (role = 'applicant') + auth_tokens ('email_verify')
--   Login     : check users (is_verified, is_active, locked_until)
--               -> write login_audit -> INSERT sessions
--   Logout    : UPDATE sessions SET revoked_at = NOW()
--   Forgot pw : auth_tokens ('password_reset') -> UPDATE users.password_hash
-- =====================================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS citext;   -- case-insensitive email

-- ---------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('applicant', 'admin');
-- If the AI agent later needs its own identity for audit trails:
--   ALTER TYPE user_role ADD VALUE 'system';

CREATE TYPE token_purpose AS ENUM ('email_verify', 'password_reset');

-- ---------------------------------------------------------------------
-- users : one row per person who can log in
-- ---------------------------------------------------------------------
CREATE TABLE users (
  id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name        VARCHAR(100) NOT NULL,
  email            CITEXT NOT NULL UNIQUE,
  password_hash    TEXT NOT NULL,                    -- bcrypt/argon2 hash, never the password
  role             user_role NOT NULL DEFAULT 'applicant',
  roll_no          VARCHAR(20) UNIQUE,               -- students only, e.g. 2024/1252
  department       VARCHAR(100),
  society          VARCHAR(100),                     -- e.g. Student Union, Rhapsody committee
  is_verified      BOOLEAN NOT NULL DEFAULT FALSE,   -- email verified; if the intranet cannot
                                                     -- send mail, an admin can set this to TRUE
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,    -- FALSE = account disabled
  failed_attempts  SMALLINT NOT NULL DEFAULT 0 CHECK (failed_attempts >= 0),
  locked_until     TIMESTAMPTZ,                      -- temporary lock after too many wrong passwords
  last_login_at    TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT users_college_email
    CHECK (email::text ~* '^[^@[:space:]]+@maitreyi\.du\.ac\.in$')
);

-- keep updated_at fresh automatically
CREATE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------
-- sessions : logged-in devices (lets you log out / revoke a session)
-- ---------------------------------------------------------------------
CREATE TABLE sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  TEXT NOT NULL UNIQUE,                  -- SHA-256 of the session token
  ip_address  INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at  TIMESTAMPTZ NOT NULL,
  revoked_at  TIMESTAMPTZ                            -- set on logout
);
CREATE INDEX sessions_user_idx   ON sessions (user_id);
CREATE INDEX sessions_expiry_idx ON sessions (expires_at);

-- ---------------------------------------------------------------------
-- auth_tokens : one-time tokens for email verification / password reset
-- ---------------------------------------------------------------------
CREATE TABLE auth_tokens (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose     token_purpose NOT NULL,
  token_hash  TEXT NOT NULL UNIQUE,                  -- store the hash, not the raw token
  expires_at  TIMESTAMPTZ NOT NULL,
  used_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX auth_tokens_user_idx ON auth_tokens (user_id, purpose);

-- ---------------------------------------------------------------------
-- login_audit : every login attempt (for lockout checks and admin review)
-- ---------------------------------------------------------------------
CREATE TABLE login_audit (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id     BIGINT REFERENCES users(id) ON DELETE SET NULL,
  email       CITEXT NOT NULL,                       -- as typed, even if no such user exists
  success     BOOLEAN NOT NULL,
  reason      VARCHAR(30),                           -- e.g. wrong_password, locked, not_verified
  ip_address  INET,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX login_audit_email_idx ON login_audit (email, created_at DESC);

COMMIT;

-- ---------------------------------------------------------------------
-- First admin: create manually. The registration page must ONLY ever
-- create role 'applicant' (never accept 'role' from the client).
-- Generate the hash in your backend (bcrypt/argon2), then run:
--
-- INSERT INTO users (full_name, email, password_hash, role, is_verified)
-- VALUES ('<Admin Name>', '<admin-id>@maitreyi.du.ac.in', '<HASH>', 'admin', TRUE);
--
-- Housekeeping (run now and then, e.g. from cron, to save SSD space):
--   DELETE FROM sessions    WHERE expires_at < NOW() - INTERVAL '7 days';
--   DELETE FROM auth_tokens WHERE expires_at < NOW() - INTERVAL '7 days';
-- ---------------------------------------------------------------------
