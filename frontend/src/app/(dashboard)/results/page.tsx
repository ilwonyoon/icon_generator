export default function ResultsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium text-brand">Results & Exports</p>
        <p className="text-sm text-stone-600">
          Review candidates, tweak stroke and corners, and batch export production-ready SVGs.
        </p>
      </header>
      <div className="rounded-2xl border border-stone-200 bg-white/70 p-12 text-center text-stone-500">
        Gallery, edit controls, and export actions will appear here.
      </div>
    </main>
  );
}
