import os

# Settings require SUPABASE_URL. Tests must not depend on a real .env file,
# so we set a dummy value before the app is imported.
os.environ.setdefault("SUPABASE_URL", "https://example.supabase.co")