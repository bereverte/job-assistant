import os

# Settings require SUPABASE_URL. Tests must not depend on a real .env file,
# so we set a dummy value before the app is imported.
os.environ.setdefault("SUPABASE_URL", "https://example.supabase.co")
os.environ.setdefault("DATABASE_URL", "postgresql://test:test@localhost:5432/test")
os.environ.setdefault("SUPABASE_SECRET_KEY", "sb_secret_test")