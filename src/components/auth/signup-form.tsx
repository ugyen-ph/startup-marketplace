"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp, type AuthState } from "@/lib/actions/auth";
import type { UserRole } from "@/lib/types";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-muted/70 focus:border-brand-soft/60";

export function SignupForm({
  defaultRole = "founder",
}: {
  defaultRole?: UserRole;
}) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signUp,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Full name</span>
        <input
          name="full_name"
          type="text"
          required
          autoComplete="name"
          placeholder="Ada Lovelace"
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          placeholder="At least 6 characters"
          className={inputClass}
        />
      </label>

      <fieldset className="space-y-2">
        <legend className="text-sm text-muted">I am a…</legend>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm has-[:checked]:border-brand-soft/60 has-[:checked]:bg-brand-soft/10">
            <input
              type="radio"
              name="role"
              value="founder"
              defaultChecked={defaultRole === "founder"}
              className="accent-[#8ab4f8]"
            />
            Founder
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm has-[:checked]:border-brand-soft/60 has-[:checked]:bg-brand-soft/10">
            <input
              type="radio"
              name="role"
              value="investor"
              defaultChecked={defaultRole === "investor"}
              className="accent-[#8ab4f8]"
            />
            Investor
          </label>
        </div>
      </fieldset>

      {state?.error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}
      {state?.message && (
        <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1557b0] disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-soft hover:text-white">
          Log in
        </Link>
      </p>
    </form>
  );
}
