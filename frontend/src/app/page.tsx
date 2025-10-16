import Link from "next/link";

const sections = [
  {
    title: "Upload & Analyze",
    description:
      "Drag-drop icon sets, infer stroke and grid rules, and review your Style Profile.",
    href: "/analysis"
  },
  {
    title: "Generate",
    description:
      "Prompt new icons with style fidelity scores and export-ready SVG output.",
    href: "/generate"
  },
  {
    title: "Manage",
    description:
      "Organise projects, collect feedback, and keep a single source of truth for icon rules.",
    href: "/results"
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-16 px-6 py-20">
      <header className="flex flex-col gap-4 text-balance">
        <p className="font-mono text-sm uppercase tracking-wide text-brand-muted">
          MVP Workbench
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-brand">
          IconForge – Icon Style Learning & Generation
        </h1>
        <p className="max-w-2xl text-lg text-stone-600">
          Follow the build plan, validate milestones, and keep the team focused on style fidelity,
          rapid generation, and production-ready output.
        </p>
        <div className="flex items-center gap-3 text-sm text-stone-500">
          <span>North star: production-ready icon in &lt; 60s · 90%+ style match</span>
          <span aria-hidden>•</span>
          <Link href="/docs/prd" className="underline hover:text-brand">
            View PRD
          </Link>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-stone-200 bg-white/70 p-6 shadow-sm backdrop-blur hover:border-brand-accent/40"
          >
            <h2 className="text-xl font-medium text-brand">{section.title}</h2>
            <p className="mt-2 text-sm text-stone-600">{section.description}</p>
            <Link
              href={section.href}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-accent"
            >
              Explore →
            </Link>
          </article>
        ))}
      </section>

      <footer className="border-t border-stone-200 pt-6 text-sm text-stone-500">
        <p>Phase 1 focus: upload pipeline, style analysis engine, and baseline UX.</p>
        <p className="mt-1">Next checkpoints: API contract drafts and worker pipeline scaffolding.</p>
      </footer>
    </main>
  );
}
