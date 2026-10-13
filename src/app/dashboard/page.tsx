import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { StartupCard } from "@/components/startup/startup-card";
import { getRepo } from "@/lib/data";
import { getCurrentProfile } from "@/lib/auth";
import { formatCurrency } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted">
              {profile.role === "founder" ? "Founder" : "Investor"} dashboard
            </p>
            <h1 className="text-3xl font-medium text-white">
              {profile.full_name ? `Hi, ${profile.full_name}` : "Welcome"}
            </h1>
          </div>
          {profile.role === "founder" ? (
            <Link
              href="/startups/new"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1557b0]"
            >
              Submit a startup
            </Link>
          ) : (
            <Link
              href="/startups"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1557b0]"
            >
              Browse startups
            </Link>
          )}
        </div>

        {profile.role === "founder" ? (
          <FounderView ownerId={profile.id} />
        ) : (
          <InvestorView investorId={profile.id} />
        )}
      </main>
    </div>
  );
}

async function FounderView({ ownerId }: { ownerId: string }) {
  const repo = getRepo();
  const startups = await repo.listStartupsByOwner(ownerId);
  const interests = await repo.listInterestsForOwner(ownerId);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-lg font-medium text-white">Your startups</h2>
        {startups.length === 0 ? (
          <EmptyState
            text="You haven't submitted a startup yet."
            ctaLabel="Submit your first startup"
            ctaHref="/startups/new"
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {startups.map((s) => (
              <StartupCard key={s.id} startup={s} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium text-white">
          Investor interest
        </h2>
        {interests.length === 0 ? (
          <EmptyState text="No investor interest yet. Keep sharing your idea." />
        ) : (
          <ul className="space-y-3">
            {interests.map((i) => (
              <li
                key={i.id}
                className="rounded-2xl border border-white/10 bg-surface/60 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-white">
                    {i.startups?.name ?? "Startup"}
                  </span>
                  <span className="rounded-full bg-brand-soft/10 px-2.5 py-1 text-xs text-brand-soft">
                    {i.status}
                  </span>
                </div>
                {i.amount != null && (
                  <p className="mt-1 text-sm text-muted">
                    Offered {formatCurrency(i.amount)}
                  </p>
                )}
                {i.message && (
                  <p className="mt-2 text-sm text-muted">{i.message}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

async function InvestorView({ investorId }: { investorId: string }) {
  const interests = await getRepo().listInterestsByInvestor(investorId);

  return (
    <section>
      <h2 className="mb-4 text-lg font-medium text-white">
        Startups you&apos;re interested in
      </h2>
      {interests.length === 0 ? (
        <EmptyState
          text="You haven&apos;t expressed interest in any startups yet."
          ctaLabel="Discover startups"
          ctaHref="/startups"
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((i) =>
            i.startups ? (
              <StartupCard key={i.id} startup={i.startups} />
            ) : null,
          )}
        </div>
      )}
    </section>
  );
}

function EmptyState({
  text,
  ctaLabel,
  ctaHref,
}: {
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-surface/40 p-8 text-center">
      <p className="text-sm text-muted">{text}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1557b0]"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
