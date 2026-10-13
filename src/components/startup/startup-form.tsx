"use client";

import { useActionState } from "react";
import { createStartup, type ActionState } from "@/lib/actions/startups";
import { INDUSTRIES, STARTUP_STAGES } from "@/lib/types";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-muted/70 focus:border-brand-soft/60";

const selectClass =
  "w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-soft/60 [&>option]:bg-surface [&>option]:text-white";

export function StartupForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    createStartup,
    undefined,
  );

  return (
    <form action={action} className="space-y-5">
      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Startup name *</span>
        <input
          name="name"
          required
          placeholder="GreenLoop"
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Tagline</span>
        <input
          name="tagline"
          placeholder="Carbon-negative delivery in 30 minutes"
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Description</span>
        <textarea
          name="description"
          rows={5}
          placeholder="What are you building, and why now?"
          className={inputClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm text-muted">Industry</span>
          <select name="industry" defaultValue="AI" className={selectClass}>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm text-muted">Stage</span>
          <select name="stage" defaultValue="idea" className={selectClass}>
            {STARTUP_STAGES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm text-muted">Funding goal (USD)</span>
          <input
            name="funding_goal"
            type="number"
            min={0}
            step={1000}
            defaultValue={250000}
            className={inputClass}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm text-muted">Website</span>
          <input
            name="website"
            type="url"
            placeholder="https://example.com"
            className={inputClass}
          />
        </label>
      </div>

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
        {pending ? "Publishing…" : "Publish startup"}
      </button>
    </form>
  );
}
