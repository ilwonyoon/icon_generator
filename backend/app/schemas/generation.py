from datetime import datetime

from pydantic import BaseModel, Field


class GenerationParams(BaseModel):
    prompt: str = Field(..., min_length=2)
    style_id: str = Field(..., description="Style profile identifier")
    n: int = Field(default=4, ge=1, le=10)
    size: int = Field(default=24, ge=16, le=512)
    format: str = Field(default="svg")
    color_mode: str = Field(default="original")


class GenerationCreate(GenerationParams):
    pass


class GenerationCandidate(BaseModel):
    id: str
    svg_url: str | None = None
    png_url: str | None = None
    style_score: float | None = Field(default=None, ge=0.0, le=1.0)
    technical_score: float | None = Field(default=None, ge=0.0, le=1.0)


class GenerationResponse(BaseModel):
    generation_id: str
    status: str
    created_at: datetime
    candidates: list[GenerationCandidate] = []
