from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI
from app.core.auth import CurrentUser, get_current_user

from app.core.config import settings

app = FastAPI(title="Job Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    """Liveness check used by the hosting platform and for smoke tests."""
    return {"status": "ok"}

@app.get("/me")
def read_me(current_user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    """Return the authenticated user. Useful to check that authentication works."""
    return current_user