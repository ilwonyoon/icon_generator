from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import api_router
from app.core.config import settings

app = FastAPI(
    title="IconForge API",
    version="0.1.0",
    description="Icon style analysis and generation backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["system"], summary="Health check")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


def configure_routers(application: FastAPI) -> None:
    application.include_router(api_router, prefix=settings.api_prefix)


def configure_startup_events(application: FastAPI) -> None:
    @application.on_event("startup")
    async def startup_event() -> None:  # pragma: no cover - wiring
        settings.configure_logging()


configure_routers(app)
configure_startup_events(app)
