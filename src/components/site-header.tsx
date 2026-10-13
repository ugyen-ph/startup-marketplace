import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth";
import { isSupabaseConfigured } from "@/lib/env";

export async function SiteHeader() {
  const profile = await getCurrentProfile();
  const demo = !isSupabaseConfigured();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0d10]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2 font-medium text-white">
          <span className="material-symbols filled text-brand-soft">
            lightbulb
          </span>
          StartupHub
          {demo && (
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-300">
              Demo
            </span>
          )}
        </Link>

        <nav className="ml-4 hidden items-center gap-1 text-sm text-muted md:flex">
          <Link
            href="/startups"
            className="rounded-full px-3 py-2 transition-colors hover:bg-white/5 hover:text-white"
          >
            Browse startups
          </Link>
          {profile?.role === "founder" && (
            <Link
              href="/startups/new"
              className="rounded-full px-3 py-2 transition-colors hover:bg-white/5 hover:text-white"
            >
              Submit idea
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 text-sm">
          {profile ? (
            <>
              <Link
                href="/dashboard"
                className="hidden rounded-full px-3 py-2 text-muted transition-colors hover:bg-white/5 hover:text-white sm:inline-flex"
              >
                Dashboard
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-full px-3 py-2 text-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-2 text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-brand px-4 py-2 font-medium text-white transition-colors hover:bg-[#1557b0]"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
