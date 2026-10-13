import { isSupabaseConfigured } from "@/lib/env";
import { demoRepo } from "@/lib/data/demo-repo";
import { supabaseRepo, type Repo } from "@/lib/data/repo";

export type {
  CreateInterestInput,
  CreateStartupInput,
  InterestWithStartup,
  InterestWithStartupName,
  PublicProfile,
  Repo,
  RepoUser,
  SignUpInput,
} from "@/lib/data/repo";

export function getRepo(): Repo {
  return isSupabaseConfigured() ? supabaseRepo : demoRepo;
}
