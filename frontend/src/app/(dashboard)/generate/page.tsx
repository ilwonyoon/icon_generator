export default function GeneratePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium text-brand">Generate Icons</p>
        <p className="text-sm text-stone-600">
          Describe an icon, choose size and format, then let the style-conditioned model produce
          candidates.
        </p>
      </header>
      <div className="rounded-2xl border border-stone-200 bg-white/70 p-12 text-center text-stone-500">
        Prompt input, variations, and scoring UI will live here.
      </div>
    </main>
  );
}
