import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_50%_-20%,rgba(26,115,232,0.18),transparent_60%)]">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center px-6">
        <Link href="/" className="flex items-center gap-2 font-medium text-white">
          <span className="material-symbols filled text-brand-soft">
            lightbulb
          </span>
          StartupHub
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-surface/60 p-8 shadow-2xl backdrop-blur-xl">
          {children}
        </div>
      </main>
    </div>
  );
}
