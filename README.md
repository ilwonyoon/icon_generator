# IconForge MVP

Early workspace for building the IconForge MVP described in the product requirements document. The repo is organised into three main areas:

- `frontend/` – Next.js TypeScript app that delivers the designer-facing experience (upload, analysis, generation, gallery, exports).
- `backend/` – FastAPI service backed by Celery workers for analysis and generation pipelines.
- `shared/` – Cross-cutting assets such as documentation, schemas, mock data, and infrastructure configs.

## Next Steps

1. Scaffold the Next.js frontend with the core routes and Tailwind configuration.
2. Bootstrap the FastAPI backend with project skeleton, Celery config, and typed models.
3. Define shared interfaces (`StyleProfile`, `GenerationRequest`, etc.) for use across services.
