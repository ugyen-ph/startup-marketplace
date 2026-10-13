"use server";

import { redirect } from "next/navigation";
import { getRepo } from "@/lib/data";
import type { UserRole } from "@/lib/types";

export type AuthState = { error?: string; message?: string } | undefined;

export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  const { error } = await getRepo().signIn(email, password);
  if (error) {
    return { error };
  }

  redirect(safeNext);
}

export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();
  const role: UserRole =
    String(formData.get("role") ?? "") === "founder" ? "founder" : "investor";

  const { error, session } = await getRepo().signUp({
    email,
    password,
    fullName,
    role,
  });

  if (error) {
    return { error };
  }

  // When email confirmation is enabled, no session is created yet.
  if (!session) {
    return { message: "Check your email to confirm your account." };
  }

  redirect("/dashboard");
}

export async function signOut() {
  await getRepo().signOut();
  redirect("/");
}
