from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Annotated, Self

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

HEX_COLOR_PATTERN = r"^#(?:[0-9a-fA-F]{3}){1,2}$"
ALLOWED_CORNER_TOKENS = {0.0, 2.0, 4.0, 8.0, 12.0}


class IconType(str, Enum):
    LINEAR = "linear"
    SOLID = "solid"
    GEOMETRIC_STACKED = "geometric_stacked"
    HYBRID = "hybrid"


class ContrastMode(str, Enum):
    MONO = "mono"
    PALETTE = "palette"


class StrokeCaps(str, Enum):
    BUTT = "butt"
    ROUND = "round"


class StrokeJoins(str, Enum):
    MITER = "miter"
    ROUND = "round"


class FillRenderMode(str, Enum):
    MONOCHROME = "monochrome"
    TWO_TONE = "two_tone"
    HIERARCHICAL = "hierarchical"
    PALETTE = "palette"


class StrokeStyle(BaseModel):
    model_config = ConfigDict(extra="forbid")

    width_mean: float = Field(..., ge=0.0, description="Average stroke width in pixels at the base grid")
    width_std: float = Field(..., ge=0.0, description="Standard deviation of stroke width across the set")
    caps: StrokeCaps = Field(..., description="Dominant stroke cap style")
    joins: StrokeJoins = Field(..., description="Dominant stroke join style")


class FillStyle(BaseModel):
    model_config = ConfigDict(extra="forbid")

    coverage: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Portion of the icon viewBox covered by fill (0-1 ratio)",
    )
    layers: int = Field(..., ge=0, le=3, description="Layer count used for fills")
    render_mode: FillRenderMode = Field(..., description="Rendering mode for fills or layering")


class PrimitiveMix(BaseModel):
    model_config = ConfigDict(extra="forbid")

    circle: float = Field(default=0.0, ge=0.0, le=1.0)
    rect: float = Field(default=0.0, ge=0.0, le=1.0)
    rounded_rect: float = Field(default=0.0, ge=0.0, le=1.0)
    triangle: float = Field(default=0.0, ge=0.0, le=1.0)

    @model_validator(mode="after")
    def validate_total(self) -> PrimitiveMix:
        total = self.circle + self.rect + self.rounded_rect + self.triangle
        if total > 1.0001:
            raise ValueError("Primitive mix ratios must sum to <= 1.0")
        return self


class StyleProfileBase(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="forbid")

    icon_type: IconType = Field(..., description="Dominant taxonomy bucket for the icon set")
    grid_size: int = Field(..., ge=8, le=256, description="Canonical grid size for the icon set")
    pixel_snap: bool = Field(..., description="Whether vertices align to integer pixel grid")
    corner_radius: float = Field(..., ge=0.0, description="Corner radius token at the base grid")
    palette: list[Annotated[str, Field(pattern=HEX_COLOR_PATTERN)]] = Field(
        default_factory=list,
        description="Primary palette used by the icon set",
    )
    contrast_mode: ContrastMode = Field(..., description="Contrast configuration for the icon set")
    symmetry_score: float = Field(..., ge=0.0, le=1.0)
    complexity_score: float = Field(..., ge=0.0, le=1.0)
    optical_corrections: bool = Field(..., description="Whether optical alignment tweaks are applied")
    stroke: StrokeStyle | None = Field(default=None, description="Stroke metrics when applicable")
    fill: FillStyle | None = Field(default=None, description="Fill metrics when applicable")
    primitive_mix: PrimitiveMix | None = Field(
        default=None,
        description="Ratios of primitive usage for geometric icon sets",
    )
    alignment_grid_fit: float | None = Field(
        default=None,
        ge=0.0,
        le=1.0,
        description="Grid fit score measuring snapped vertices",
    )
    layer_count: int | None = Field(default=None, ge=1, le=3, description="Layer budget for hybrid icons")
    layer_roles: list[str] | None = Field(
        default=None, description="Semantic roles for each layer in hybrid icons"
    )
    consistency_score: float = Field(..., ge=0.0, le=1.0)
    notes: str | None = Field(default=None, max_length=280)

    @field_validator("corner_radius")
    @classmethod
    def validate_corner_radius(cls, value: float) -> float:
        if any(abs(value - token) < 1e-6 for token in ALLOWED_CORNER_TOKENS):
            return float(value)
        raise ValueError(f"corner_radius must be one of {sorted(ALLOWED_CORNER_TOKENS)}")

    @model_validator(mode="after")
    def validate_by_icon_type(self) -> Self:
        if self.icon_type is IconType.LINEAR:
            if self.stroke is None:
                raise ValueError("Linear icons require stroke metrics")
            if self.fill and self.fill.coverage > 0.1:
                raise ValueError("Linear icons should not include significant fill coverage")
            self.layer_count = None
            self.layer_roles = None
        elif self.icon_type is IconType.SOLID:
            if self.fill is None:
                raise ValueError("Solid icons require fill metrics")
            if self.stroke and self.stroke.width_mean > 0.05:
                raise ValueError("Solid icons should not expose stroke metrics")
            self.layer_count = None
            self.layer_roles = None
            self.stroke = None
        elif self.icon_type is IconType.GEOMETRIC_STACKED:
            if self.primitive_mix is None:
                raise ValueError("Geometric-stacked icons require primitive mix data")
            if self.alignment_grid_fit is None:
                raise ValueError("Geometric-stacked icons require alignment_grid_fit")
            self.layer_count = None
            self.layer_roles = None
        elif self.icon_type is IconType.HYBRID:
            if self.fill is None or self.fill.layers < 1:
                raise ValueError("Hybrid icons require fill metrics with at least one layer")
            if self.layer_count is None or self.layer_roles is None:
                raise ValueError("Hybrid icons require layer_count and layer_roles")
            if len(self.layer_roles) != self.layer_count:
                raise ValueError("layer_roles length must match layer_count for hybrid icons")
            if self.stroke is None:
                raise ValueError("Hybrid icons require stroke metrics")
        return self


class StyleProfile(StyleProfileBase):
    id: str = Field(..., examples=["sp_123"])
    project_id: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class StyleProfileCreate(BaseModel):
    file_names: list[str]
