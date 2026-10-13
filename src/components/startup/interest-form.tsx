"use client";

import { useActionState } from "react";
import { expressInterest, type ActionState } from "@/lib/actions/startups";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-muted/70 focus:border-brand-soft/60";

export function InterestForm({ startupId }: { startupId: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    expressInterest,
    undefined,
  );

  if (state?.message) {
    return (
      <p className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="startup_id" value={startupId} />

      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Message to the founder</span>
        <textarea
          name="message"
          rows={3}
          placeholder="I'm interested in learning more about your traction…"
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Potential investment (USD)</span>
        <input
          name="amount"
          type="number"
          min={0}
          step={1000}
          placeholder="50000"
          className={inputClass}
        />
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1557b0] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Express interest"}
      </button>
    </form>
  );
}
