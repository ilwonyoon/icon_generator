# IconForge Frontend

Next.js + TypeScript workspace for the IconForge MVP. The app will deliver the designer-facing experience covering upload, analysis review, icon generation, and exports.

## Tech Stack

- Next.js App Router
- Tailwind CSS + design tokens grounded in the PRD
- TanStack Query for API orchestration
- Zustand for lightweight client state (style profile cache, generation params)
- React Dropzone for drag-drop uploads

## Getting Started

```bash
npm install
cp .env.example .env.local   # optional – points the UI at the local API
npm run dev
```

Environment variables:

- `NEXT_PUBLIC_API_BASE_URL` – FastAPI base URL (defaults to `http://127.0.0.1:8300`).

## Directory Overview

- `src/app` – routed UI surfaces and PRD reference pages.
- `src/components` – shared UI blocks (cards, tables, upload surface, etc.).
- `src/lib` – API helpers, schema adapters, and query keys.
- `src/styles` – Tailwind entrypoints and design tokens.

## Next Steps

1. Implement the upload dropzone and style analysis request flow.
2. Compose shell pages for Analysis, Generate, and Results views.
3. Integrate backend contracts once endpoints are ready.
