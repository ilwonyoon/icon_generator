from fastapi import APIRouter

from app.api.v1 import analysis, figma, generation

api_router = APIRouter()

api_router.include_router(analysis.router, prefix="/styles", tags=["styles"])
api_router.include_router(generation.router, prefix="/icons", tags=["icons"])
api_router.include_router(figma.router, prefix="/figma", tags=["figma"])
