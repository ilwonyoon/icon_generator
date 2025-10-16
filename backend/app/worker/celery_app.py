from celery import Celery

from app.core.config import settings

celery_app = Celery(
    "iconforge",
    broker=settings.redis_url,
    backend=settings.redis_url,
)

celery_app.conf.update(task_serializer="json", result_serializer="json", accept_content=["json"])


@celery_app.task(name="iconforge.style.analyze")
def analyze_style_task(style_id: str, object_keys: list[str]) -> str:
    # TODO: run analysis pipeline and persist StyleProfile
    return style_id


@celery_app.task(name="iconforge.icons.generate")
def generate_icons_task(generation_id: str) -> str:
    # TODO: execute generation pipeline, upload assets, update records
    return generation_id
