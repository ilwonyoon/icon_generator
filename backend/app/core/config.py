from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="ICONFORGE_",
        env_file=(".env", ".env.local"),
        extra="allow",
    )

    environment: str = "local"
    api_prefix: str = "/api"
    cors_allow_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3200",
        "http://127.0.0.1:3200",
    ]
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/iconforge"
    redis_url: str = "redis://localhost:6379/0"
    s3_bucket: str = "iconforge-dev"
    s3_region: str = "ap-northeast-2"
    aws_access_key_id: str | None = None
    aws_secret_access_key: str | None = None
    log_level: str = "INFO"

    def configure_logging(self) -> None:  # pragma: no cover - placeholder
        import logging

        logging.basicConfig(level=self.log_level)


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]


settings = get_settings()
