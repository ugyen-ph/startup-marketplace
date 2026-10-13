export type UserRole = "founder" | "investor";

export type StartupStage =
  | "idea"
  | "pre_seed"
  | "seed"
  | "series_a"
  | "series_b"
  | "growth";

export type InterestStatus = "pending" | "accepted" | "declined";

export type Profile = {
  id: string;
  role: UserRole;
  full_name: string | null;
  company: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Startup = {
  id: string;
  owner_id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  industry: string | null;
  stage: StartupStage;
  funding_goal: number;
  amount_raised: number;
  website: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Interest = {
  id: string;
  startup_id: string;
  investor_id: string;
  message: string | null;
  amount: number | null;
  status: InterestStatus;
  created_at: string;
};

export const STARTUP_STAGES: { value: StartupStage; label: string }[] = [
  { value: "idea", label: "Idea" },
  { value: "pre_seed", label: "Pre-seed" },
  { value: "seed", label: "Seed" },
  { value: "series_a", label: "Series A" },
  { value: "series_b", label: "Series B" },
  { value: "growth", label: "Growth" },
];

export const STAGE_LABELS: Record<StartupStage, string> = Object.fromEntries(
  STARTUP_STAGES.map((s) => [s.value, s.label]),
) as Record<StartupStage, string>;

export const INDUSTRIES = [
  "AI",
  "Fintech",
  "Healthtech",
  "Cleantech",
  "SaaS",
  "Consumer",
  "Marketplace",
  "Other",
] as const;

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
