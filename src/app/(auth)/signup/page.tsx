import { SignupForm } from "@/components/auth/signup-form";
import type { UserRole } from "@/lib/types";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const defaultRole: UserRole = role === "investor" ? "investor" : "founder";

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-medium text-white">Join StartupHub</h1>
        <p className="text-sm text-muted">
          Create a free account to share ideas or find startups.
        </p>
      </div>
      <SignupForm defaultRole={defaultRole} />
    </div>
  );
}
