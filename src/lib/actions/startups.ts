"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getRepo } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import type { StartupStage } from "@/lib/types";
import { STARTUP_STAGES } from "@/lib/types";

export type ActionState =
  | { error?: string; message?: string }
  | undefined;

const VALID_STAGES = new Set<string>(STARTUP_STAGES.map((s) => s.value));

export async function createStartup(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Startup name is required." };

  const stage = String(formData.get("stage") ?? "idea");
  const fundingGoal = Number(formData.get("funding_goal") ?? 0);

  const result = await getRepo().createStartup(user.id, {
    name,
    tagline: String(formData.get("tagline") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    industry: String(formData.get("industry") ?? "").trim() || null,
    stage: (VALID_STAGES.has(stage) ? stage : "idea") as StartupStage,
    funding_goal: Number.isFinite(fundingGoal) ? fundingGoal : 0,
    website: String(formData.get("website") ?? "").trim() || null,
  });

  if ("error" in result) return { error: result.error };

  revalidatePath("/dashboard");
  revalidatePath("/startups");
  redirect(`/startups/${result.id}`);
}

export async function expressInterest(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const startupId = String(formData.get("startup_id") ?? "");
  if (!startupId) return { error: "Missing startup." };

  const amountRaw = String(formData.get("amount") ?? "").trim();
  const amount = amountRaw ? Number(amountRaw) : null;

  const result = await getRepo().createInterest({
    startupId,
    investorId: user.id,
    message: String(formData.get("message") ?? "").trim() || null,
    amount: amount != null && Number.isFinite(amount) ? amount : null,
  });

  if (result.duplicate) {
    return { message: "You already expressed interest in this startup." };
  }
  if (result.error) return { error: result.error };

  revalidatePath(`/startups/${startupId}`);
  revalidatePath("/dashboard");
  return { message: "Interest sent — the founder has been notified." };
}
