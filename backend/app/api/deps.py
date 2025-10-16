"""Shared dependencies for API routes (DB sessions, auth, etc.)."""

from collections.abc import AsyncGenerator


async def get_db_session() -> AsyncGenerator[None, None]:  # pragma: no cover - placeholder
    yield
