from functools import lru_cache

from supabase import Client, create_client

from app.core.config import settings

RESUMES_BUCKET = "resumes"


@lru_cache
def get_supabase_admin() -> Client:
    """Return a Supabase client with admin privileges. Backend use only."""
    return create_client(settings.supabase_url, settings.supabase_secret_key)


def upload_resume_file(user_id: str, content: bytes) -> str:
    """Upload (or replace) the user's resume PDF and return its storage path."""
    path = f"{user_id}/resume.pdf"
    get_supabase_admin().storage.from_(RESUMES_BUCKET).upload(
        path,
        content,
        {"content-type": "application/pdf", "upsert": "true"},
    )
    return path