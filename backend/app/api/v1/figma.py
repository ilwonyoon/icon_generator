from fastapi import APIRouter

from app.schemas.figma import FigmaImportRequest, FigmaImportResponse

router = APIRouter()


@router.post("/import", response_model=FigmaImportResponse, summary="Import icons from Figma")
async def import_from_figma(request: FigmaImportRequest) -> FigmaImportResponse:
    # TODO: call Figma API, collect nodes, push to analysis worker
    return FigmaImportResponse(
        file_key=request.file_key,
        node_ids=request.node_ids,
        imported=len(request.node_ids),
        skipped=0,
        status="queued",
    )
