"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthState } from "@/lib/actions/auth";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-muted/70 focus:border-brand-soft/60";

export function LoginForm({
  next,
  demo = false,
}: {
  next: string;
  demo?: boolean;
}) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signIn,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      {demo && (
        <div className="rounded-xl border border-brand-soft/20 bg-brand-soft/10 px-4 py-3 text-xs text-muted">
          <p className="font-medium text-brand-soft">Demo accounts</p>
          <p className="mt-1">
            founder@demo.com or investor@demo.com — password{" "}
            <span className="text-white">demo1234</span>
          </p>
        </div>
      )}

      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={demo ? "founder@demo.com" : undefined}
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm text-muted">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          defaultValue={demo ? "demo1234" : undefined}
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
        className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1557b0] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Log in"}
      </button>

      <p className="text-center text-sm text-muted">
        No account?{" "}
        <Link href="/signup" className="text-brand-soft hover:text-white">
          Create one
        </Link>
      </p>
    </form>
  );
}
