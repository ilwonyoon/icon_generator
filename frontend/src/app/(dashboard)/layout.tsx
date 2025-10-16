import Link from "next/link";

const links = [
  { href: "/analysis", label: "Analyze" },
  { href: "/generate", label: "Generate" },
  { href: "/results", label: "Results" }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-100">
      <nav className="border-b border-stone-200 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold text-brand">
            IconForge
          </Link>
          <div className="flex items-center gap-4 text-sm text-stone-500">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1 transition hover:bg-brand-accent/10 hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
