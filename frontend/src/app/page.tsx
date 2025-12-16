import Link from "next/link";

const benefits = [
  {
    title: "Learns your icon DNA",
    description:
      "Feed a handful of existing assets and we map stroke weight, grid, and negative space rules in minutes."
  },
  {
    title: "Ships new icons instantly",
    description:
      "Spin up brand-faithful SVGs on demand instead of waiting days for the next design slot."
  },
  {
    title: "Keeps sets perfectly aligned",
    description:
      "Review and approve in one place so every product team pulls from the same, consistent source."
  }
];

const steps = [
  {
    title: "Upload your reference set",
    description:
      "Drop 10–15 icons and IconForge builds a live profile of your geometry and stylistic rules."
  },
  {
    title: "Prompt what you need",
    description:
      "Describe the concept in plain language and preview perfectly balanced variations instantly."
  },
  {
    title: "Approve & publish",
    description:
      "Lock in the winner, export production-ready SVGs, and push them straight into your design system."
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-stone-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-6 py-20">
        <header className="grid gap-12 md:grid-cols-[3fr,2fr] md:items-end">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              <span className="inline-flex h-2 w-2 rounded-full bg-stone-900" aria-hidden />
              <span>Icon system co-pilot</span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Stop waiting weeks for icons that match your brand.
              </h1>
              <p className="max-w-xl text-lg text-stone-600">
                IconForge learns your visual language, generates new icons instantly, and keeps every asset
                locked to the same aesthetic—no more ticket queues or manual redraws.
              </p>
            </div>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 bg-stone-900 text-xs text-white">
                  1
                </span>
                <span>Capture your icon DNA from the assets you already shipped.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 bg-stone-900 text-xs text-white">
                  2
                </span>
                <span>Generate cohesive SVGs on demand with marketer-ready speed.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 bg-stone-900 text-xs text-white">
                  3
                </span>
                <span>Ship updates without chasing designers or compromising quality.</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-white transition hover:bg-stone-800"
              >
                Generate icons now
              </Link>
              <Link
                href="/analysis"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-stone-900 transition hover:border-stone-900"
              >
                Upload your set
              </Link>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
              Trusted by design systems teams shipping weekly updates
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl border-2 border-stone-900 bg-white p-8 shadow-[12px_12px_0_0_rgba(15,15,15,0.1)]">
              <div className="grid h-full w-full grid-cols-3 gap-4">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50"
                  >
                    <div className="h-8 w-8 rounded-full border-2 border-stone-900" aria-hidden />
                  </div>
                ))}
              </div>
              <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-stone-400">
                Icon grid preview
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="flex h-full flex-col gap-4 rounded-3xl border-2 border-stone-900 bg-white p-6 shadow-[8px_8px_0_0_rgba(15,15,15,0.08)]"
            >
              <h2 className="text-xl font-semibold">{benefit.title}</h2>
              <p className="text-sm text-stone-600">{benefit.description}</p>
            </article>
          ))}
        </section>

        <section className="space-y-10">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">How it works</p>
            <h2 className="text-3xl font-semibold">From messy backlog to on-brand icons in minutes</h2>
            <p className="mx-auto max-w-2xl text-sm text-stone-600">
              IconForge compresses the hand-off loop so designers, marketers, and engineers ship consistent
              visuals without waiting on the next design cycle.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-6 text-left transition hover:border-stone-900 hover:bg-white"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Step {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-stone-900">{step.title}</h3>
                <p className="text-sm text-stone-600">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border-2 border-stone-900 bg-stone-950 p-10 text-white shadow-[12px_12px_0_0_rgba(15,15,15,0.12)]">
          <div className="flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">No more icon backlog</p>
              <h2 className="text-3xl font-semibold text-white">Put icon requests on autopilot today</h2>
              <p className="max-w-xl text-sm text-stone-300">
                Launch IconForge and give every team a single, reliable place to generate, approve, and ship
                icons that feel like they were crafted by your lead designer.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-stone-950 transition hover:bg-stone-200"
              >
                Start generating
              </Link>
              <Link
                href="/analysis"
                className="inline-flex items-center justify-center rounded-full border border-stone-600 px-6 py-3 text-white transition hover:border-white"
              >
                Learn about style analysis
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
