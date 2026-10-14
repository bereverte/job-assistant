from fastapi import FastAPI

app = FastAPI(title="Job Assistant API")


@app.get("/health")
def health() -> dict[str, str]:
    """Liveness check used by the hosting platform and for smoke tests."""
    return {"status": "ok"}