import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { InterestForm } from "@/components/startup/interest-form";
import { getRepo } from "@/lib/data";
import { getCurrentProfile } from "@/lib/auth";
import { STAGE_LABELS, formatCurrency, type Interest } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function StartupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const repo = getRepo();

  const startup = await repo.getStartup(id);
  if (!startup) notFound();

  const profile = await getCurrentProfile();

  const founder = await repo.getPublicProfile(startup.owner_id);

  let myInterest: Interest | null = null;
  if (profile && profile.id !== startup.owner_id) {
    myInterest = await repo.getInterest(startup.id, profile.id);
  }

  const isOwner = profile?.id === startup.owner_id;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/startups"
          className="text-sm text-muted transition-colors hover:text-white"
        >
          ← Back to startups
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-soft/10 px-3 py-1 text-xs font-medium text-brand-soft">
            {STAGE_LABELS[startup.stage]}
          </span>
          {startup.industry && (
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">
              {startup.industry}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-4xl font-medium text-white">{startup.name}</h1>
        {startup.tagline && (
          <p className="mt-3 text-lg text-muted">{startup.tagline}</p>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-white/10 bg-surface/60 p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
                About
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-white/90">
                {startup.description || "No description provided yet."}
              </p>
              {startup.website && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm text-brand-soft hover:text-white"
                >
                  {startup.website}
                </a>
              )}
            </section>

            <section className="rounded-3xl border border-white/10 bg-surface/60 p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
                Founder
              </h2>
              <p className="mt-3 text-white">
                {founder?.full_name || "Anonymous founder"}
              </p>
              {founder?.company && (
                <p className="text-sm text-muted">{founder.company}</p>
              )}
              {founder?.bio && (
                <p className="mt-2 text-sm text-muted">{founder.bio}</p>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-surface/60 p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
                The raise
              </h2>
              <p className="mt-3 text-3xl font-medium text-white">
                {formatCurrency(startup.funding_goal)}
              </p>
              <p className="text-sm text-muted">
                raised {formatCurrency(startup.amount_raised)}
              </p>
            </section>

            {isOwner ? (
              <p className="rounded-2xl border border-white/10 bg-surface/60 p-5 text-sm text-muted">
                This is your startup. Founders can&apos;t invest in their own raise.
              </p>
            ) : !profile ? (
              <div className="rounded-2xl border border-white/10 bg-surface/60 p-5">
                <p className="text-sm text-muted">
                  Log in as an investor to express interest.
                </p>
                <Link
                  href={`/login?next=/startups/${startup.id}`}
                  className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1557b0]"
                >
                  Log in
                </Link>
              </div>
            ) : myInterest ? (
              <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-300">
                You expressed interest
                {myInterest.amount != null
                  ? ` (${formatCurrency(myInterest.amount)})`
                  : ""}
                . Status: {myInterest.status}.
              </p>
            ) : (
              <section className="rounded-3xl border border-white/10 bg-surface/60 p-6">
                <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">
                  Interested?
                </h2>
                <InterestForm startupId={startup.id} />
              </section>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
