import Link from "next/link";
import { STAGE_LABELS, formatCurrency, type Startup } from "@/lib/types";

export function StartupCard({ startup }: { startup: Startup }) {
  const pct =
    startup.funding_goal > 0
      ? Math.min(
          100,
          Math.round((startup.amount_raised / startup.funding_goal) * 100),
        )
      : 0;

  return (
    <Link
      href={`/startups/${startup.id}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-surface/60 p-6 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-surface"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-brand-soft/10 px-2.5 py-1 text-xs font-medium text-brand-soft">
          {STAGE_LABELS[startup.stage]}
        </span>
        {startup.industry && (
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-muted">
            {startup.industry}
          </span>
        )}
      </div>

      <h3 className="text-lg font-medium text-white group-hover:text-brand-soft">
        {startup.name}
      </h3>
      {startup.tagline && (
        <p className="mt-1 line-clamp-2 text-sm text-muted">{startup.tagline}</p>
      )}

      <div className="mt-auto pt-5">
        <div className="mb-2 flex items-center justify-between text-xs text-muted">
          <span>Raised {formatCurrency(startup.amount_raised)}</span>
          <span>Goal {formatCurrency(startup.funding_goal)}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-brand-soft"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
