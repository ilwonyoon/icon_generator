from fastapi import APIRouter, Depends

from app.schemas.generation import GenerationCreate, GenerationResponse
from app.services.icon_generation import IconGenerationService

router = APIRouter()


def get_icon_generation_service() -> IconGenerationService:
    return IconGenerationService()


@router.post("/generate", response_model=GenerationResponse, summary="Generate icons with a style profile")
async def generate_icons(
    request: GenerationCreate,
    service: IconGenerationService = Depends(get_icon_generation_service),
) -> GenerationResponse:
    return service.enqueue_generation(request)


@router.get("/{generation_id}/download", summary="Download a generated icon")
async def download_icon(generation_id: str) -> dict[str, str]:
    # TODO: return signed download URL once storage adapter is available
    return {"download_url": f"https://cdn.iconforge.app/generations/{generation_id}.svg"}
