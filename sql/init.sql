CREATE TABLE IF NOT EXISTS links (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT UNIQUE NOT NULL,
  url         TEXT NOT NULL,
  clicks      INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_clicked TIMESTAMPTZ
);
