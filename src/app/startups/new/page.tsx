import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { StartupForm } from "@/components/startup/startup-form";
import { getCurrentProfile } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewStartupPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.role !== "founder") redirect("/startups");

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-medium text-white">Submit a startup</h1>
        <p className="mt-2 text-sm text-muted">
          Share your idea with investors. You can edit it later.
        </p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-surface/60 p-6 sm:p-8">
          <StartupForm />
        </div>
      </main>
    </div>
  );
}
