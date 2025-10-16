from __future__ import annotations

from datetime import datetime
from typing import Any

from app.schemas.generation import GenerationCandidate, GenerationCreate, GenerationResponse


class IconGenerationService:
    """Handles icon generation orchestration and worker dispatch."""

    def enqueue_generation(self, request: GenerationCreate) -> GenerationResponse:
        generation_id = self._queue_task(request)
        return GenerationResponse(
            generation_id=generation_id,
            status="queued",
            created_at=datetime.utcnow(),
            candidates=[
                GenerationCandidate(
                    id="gen_preview_1",
                    svg_url="https://cdn.iconforge.app/preview/gen_preview_1.svg",
                    style_score=0.91,
                    technical_score=0.95,
                )
            ],
        )

    def _queue_task(self, request: GenerationCreate) -> str:
        # TODO: persist request and dispatch Celery task
        self._log_info("queued_generation", payload=request.model_dump())
        return "gen_demo"

    def _log_info(self, event: str, **context: Any) -> None:  # pragma: no cover - placeholder
        from logging import getLogger

        getLogger(__name__).info(event, extra={"context": context})
