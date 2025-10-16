from __future__ import annotations

from typing import Any

from fastapi import UploadFile

from app.schemas.style_profile import (
    ContrastMode,
    FillRenderMode,
    FillStyle,
    IconType,
    PrimitiveMix,
    StrokeCaps,
    StrokeJoins,
    StrokeStyle,
    StyleProfile,
    StyleProfileCreate,
)


class StyleAnalysisService:
    """Coordinates icon style analysis tasks."""

    def enqueue_analysis(self, payload: StyleProfileCreate, files: list[UploadFile]) -> None:
        # TODO: persist upload metadata, push Celery task for heavy lifting
        file_names = [file.filename for file in files]
        self._log_debug("queued_style_analysis", payload=payload.model_dump(), files=file_names)

    def placeholder_response(self, payload: StyleProfileCreate) -> StyleProfile:
        # Placeholder response allowing the frontend to iterate before ML is ready
        return self._demo_profile(profile_id="sp_preview")

    def fetch_profile(self, style_id: str) -> StyleProfile:
        # TODO: query database or fallback cache
        return self._demo_profile(profile_id=style_id)

    def _log_debug(self, event: str, **context: Any) -> None:  # pragma: no cover - placeholder
        from logging import getLogger

        getLogger(__name__).debug(event, extra={"context": context})

    def _demo_profile(self, profile_id: str) -> StyleProfile:
        return StyleProfile(
            id=profile_id,
            project_id="proj_demo",
            icon_type=IconType.LINEAR,
            grid_size=24,
            pixel_snap=True,
            corner_radius=4.0,
            palette=["#111827", "#6B7280"],
            contrast_mode=ContrastMode.MONO,
            symmetry_score=0.92,
            complexity_score=0.18,
            optical_corrections=True,
            stroke=StrokeStyle(
                width_mean=2.0,
                width_std=0.2,
                caps=StrokeCaps.ROUND,
                joins=StrokeJoins.ROUND,
            ),
            fill=FillStyle(coverage=0.05, layers=1, render_mode=FillRenderMode.MONOCHROME),
            primitive_mix=PrimitiveMix(circle=0.4, rect=0.4, rounded_rect=0.2),
            alignment_grid_fit=0.95,
            consistency_score=0.94,
            notes="Outlined, 24 grid, no gradients",
        )
