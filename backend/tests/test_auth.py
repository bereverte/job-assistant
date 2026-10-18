from fastapi.testclient import TestClient

from app.core.auth import CurrentUser, get_current_user
from app.main import app

client = TestClient(app)


def test_me_without_token_returns_401():
    response = client.get("/me")

    assert response.status_code == 401
    assert response.json() == {"detail": "Missing access token"}


def test_me_with_malformed_token_returns_401():
    response = client.get("/me", headers={"Authorization": "Bearer not-a-real-token"})

    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid or expired access token"}



def test_me_returns_current_user_when_authenticated():
    fake_user = CurrentUser(id="user-123", email="test@example.com")
    app.dependency_overrides[get_current_user] = lambda: fake_user

    try:
        response = client.get("/me")
    finally:
        app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json() == {"id": "user-123", "email": "test@example.com"}