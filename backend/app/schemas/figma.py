from pydantic import BaseModel, Field


class FigmaImportRequest(BaseModel):
    file_key: str = Field(..., description="Figma file key")
    node_ids: list[str] = Field(..., description="Node IDs selected for import")


class FigmaImportResponse(BaseModel):
    file_key: str
    node_ids: list[str]
    imported: int
    skipped: int
    status: str
