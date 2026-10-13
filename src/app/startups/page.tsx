import { SiteHeader } from "@/components/site-header";
import { StartupCard } from "@/components/startup/startup-card";
import { getRepo } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function StartupsPage() {
  const startups = await getRepo().listStartups();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white">Discover startups</h1>
          <p className="mt-2 text-sm text-muted">
            {startups.length} startup{startups.length === 1 ? "" : "s"} raising
            on StartupHub.
          </p>
        </div>

        {startups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-surface/40 p-10 text-center text-sm text-muted">
            No startups yet. Be the first to submit one.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {startups.map((s) => (
              <StartupCard key={s.id} startup={s} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
