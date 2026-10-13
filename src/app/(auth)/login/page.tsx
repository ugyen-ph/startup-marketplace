import { LoginForm } from "@/components/auth/login-form";
import { isSupabaseConfigured } from "@/lib/env";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const demo = !isSupabaseConfigured();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-medium text-white">Welcome back</h1>
        <p className="text-sm text-muted">Log in to your StartupHub account.</p>
      </div>
      <LoginForm next={next ?? "/dashboard"} demo={demo} />
    </div>
  );
}
