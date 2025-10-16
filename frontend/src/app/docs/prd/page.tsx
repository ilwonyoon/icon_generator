import Link from "next/link";

const pillars = [
  {
    label: "Style Fidelity",
    detail: "Reproduce stroke, corner, fill, and grid rules—not just shapes."
  },
  {
    label: "Production Output",
    detail: "Deliver clean SVGs by default (PNG optional) ready for design systems."
  },
  {
    label: "Designer-grade UX",
    detail: "Drag-drop imports, instant analysis, guided generation, and batch workflows."
  }
];

export default function PRDOverviewPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <Link href="/" className="text-sm text-stone-400 hover:text-brand-accent">
          ← Back to workspace
        </Link>
        <h1 className="text-3xl font-semibold text-brand">IconForge MVP PRD</h1>
        <p className="text-stone-600">
          Snapshot of the product requirements to keep designers and engineers aligned while we
          implement the MVP capabilities.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-medium text-brand">Vision</h2>
        <p className="text-stone-600">
          “An AI that understands your icon language and speaks it fluently.” Build an experience that
          trims the time to a production-ready icon to under a minute with 90%+ style fidelity.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-medium text-brand">Product Pillars</h2>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {pillars.map((pillar) => (
            <li key={pillar.label} className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-sm font-semibold text-brand">{pillar.label}</p>
              <p className="mt-2 text-sm text-stone-600">{pillar.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium text-brand">MVP Goals</h2>
        <ul className="list-disc space-y-1 pl-6 text-sm text-stone-600">
          <li>Learn a style from ≥5 icons and produce a structured Style Profile.</li>
          <li>Generate up to 10 prompt-driven icon variations that meet fidelity targets.</li>
          <li>Export optimized SVG and PNG outputs with basic batch support.</li>
          <li>Offer lightweight Figma import for existing icon sets.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium text-brand">Next Up</h2>
        <p className="text-sm text-stone-600">
          We’ll begin with the style analysis engine and upload experience, then layer in generation,
          scoring, and Figma integration. Explore the full PRD in the shared docs folder for the
          complete breakdown.
        </p>
      </section>
    </main>
  );
}
