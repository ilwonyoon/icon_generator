# IconForge Backend

FastAPI + Celery service responsible for:

- Ingesting icon uploads and orchestrating the style analysis pipeline.
- Managing projects, style profiles, generations, and feedback metadata.
- Exposing REST endpoints for the frontend and Figma plugin.
- Dispatching asynchronous work to Celery workers backed by Redis queues.

## Project Structure

```
app/
  api/            # Routers and dependency wiring
  core/           # Application configuration and shared utilities
  models/         # SQLAlchemy models (to be defined)
  schemas/        # Pydantic DTOs shared with clients
  services/       # Business logic (analysis, generation, exports)
  worker/         # Celery app and task registrations
  main.py         # FastAPI application entrypoint
```

## Getting Started

1. Create a virtual environment (`uv`, `venv`, or `conda`).
2. Install dependencies:

   ```bash
   pip install -e .[dev,test]
   ```

3. Run the API locally:

   ```bash
   uvicorn app.main:app --reload
   ```

4. Start the Celery worker:

   ```bash
   celery -A app.worker.celery_app worker --loglevel=info
   ```

Environment variables (add to `.env.local`):

- `ICONFORGE_DATABASE_URL`
- `ICONFORGE_REDIS_URL`
- `ICONFORGE_AWS_ACCESS_KEY_ID` / `ICONFORGE_AWS_SECRET_ACCESS_KEY`
- `ICONFORGE_S3_BUCKET`

## Next Steps

- Define SQLAlchemy models for projects, icons, style profiles, and generations.
- Implement upload ingestion flow with S3 storage adapter.
- Wire Celery tasks for `analyze_style` and `generate_icons`.
- Add integration tests for API contracts and worker pipelines.
