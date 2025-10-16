from fastapi.testclient import TestClient

from app.main import app


def test_analyze_endpoint_returns_taxonomy_payload() -> None:
    client = TestClient(app)

    response = client.post(
        "/api/styles/analyze",
        files={"files": ("demo.svg", "<svg></svg>", "image/svg+xml")},
    )

    assert response.status_code == 200
    payload = response.json()

    assert payload["icon_type"] == "linear"
    assert payload["grid_size"] == 24
    assert payload["pixel_snap"] is True
    assert payload["stroke"]["width_mean"] == 2.0
    assert payload["fill"]["render_mode"] == "monochrome"
    assert payload["primitive_mix"]["circle"] == 0.4
    assert "notes" in payload


def test_fetch_profile_returns_consistent_schema() -> None:
    client = TestClient(app)

    response = client.get("/api/styles/sp_demo")

    assert response.status_code == 200
    payload = response.json()

    assert payload["id"] == "sp_demo"
    assert payload["icon_type"] == "linear"
    assert payload["consistency_score"] == 0.94
