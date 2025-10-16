from fastapi import APIRouter, BackgroundTasks, Depends, File, UploadFile

from app.schemas.style_profile import StyleProfile, StyleProfileCreate
from app.services.style_analysis import StyleAnalysisService

router = APIRouter()


async def get_style_analysis_service() -> StyleAnalysisService:
    return StyleAnalysisService()


@router.post("/analyze", response_model=StyleProfile, summary="Analyze icons to build a style profile")
async def analyze_style(
    background_tasks: BackgroundTasks,
    files: list[UploadFile] = File(...),
    service: StyleAnalysisService = Depends(get_style_analysis_service),
) -> StyleProfile:
    payload = StyleProfileCreate(file_names=[file.filename for file in files])
    background_tasks.add_task(service.enqueue_analysis, payload=payload, files=files)
    return service.placeholder_response(payload)


@router.get("/{style_id}", response_model=StyleProfile, summary="Fetch a style profile")
async def get_style_profile(style_id: str, service: StyleAnalysisService = Depends(get_style_analysis_service)) -> StyleProfile:
    return service.fetch_profile(style_id)
