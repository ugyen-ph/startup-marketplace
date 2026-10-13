import { createClient } from "@/lib/supabase/server";
import type {
  Interest,
  Profile,
  Startup,
  StartupStage,
  UserRole,
} from "@/lib/types";

export type RepoUser = { id: string; email?: string | null };

export type PublicProfile = {
  full_name: string | null;
  company: string | null;
  bio: string | null;
};

export type CreateStartupInput = {
  name: string;
  tagline: string | null;
  description: string | null;
  industry: string | null;
  stage: StartupStage;
  funding_goal: number;
  website: string | null;
};

export type CreateInterestInput = {
  startupId: string;
  investorId: string;
  message: string | null;
  amount: number | null;
};

export type SignUpInput = {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
};

export type InterestWithStartupName = Interest & {
  startups: { name: string } | null;
};

export type InterestWithStartup = Interest & {
  startups: Startup | null;
};

export interface Repo {
  getUser(): Promise<RepoUser | null>;
  getProfile(id: string): Promise<Profile | null>;
  getPublicProfile(id: string): Promise<PublicProfile | null>;

  signIn(email: string, password: string): Promise<{ error?: string }>;
  signUp(
    input: SignUpInput,
  ): Promise<{ error?: string; session: boolean }>;
  signOut(): Promise<void>;

  listStartups(): Promise<Startup[]>;
  getStartup(id: string): Promise<Startup | null>;
  listStartupsByOwner(ownerId: string): Promise<Startup[]>;
  createStartup(
    ownerId: string,
    input: CreateStartupInput,
  ): Promise<{ id: string } | { error: string }>;

  getInterest(startupId: string, investorId: string): Promise<Interest | null>;
  listInterestsForOwner(ownerId: string): Promise<InterestWithStartupName[]>;
  listInterestsByInvestor(investorId: string): Promise<InterestWithStartup[]>;
  createInterest(
    input: CreateInterestInput,
  ): Promise<{ error?: string; duplicate?: boolean }>;
}

export const supabaseRepo: Repo = {
  async getUser() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user ? { id: user.id, email: user.email } : null;
  },

  async getProfile(id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return (data as Profile | null) ?? null;
  },

  async getPublicProfile(id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("full_name, company, bio")
      .eq("id", id)
      .maybeSingle();
    return (data as PublicProfile | null) ?? null;
  },

  async signIn(email, password) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return error ? { error: error.message } : {};
  },

  async signUp({ email, password, fullName, role }) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });
    if (error) return { error: error.message, session: false };
    return { session: Boolean(data.session) };
  },

  async signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
  },

  async listStartups() {
    const supabase = await createClient();
    const { data } = await supabase
      .from("startups")
      .select("*")
      .order("created_at", { ascending: false });
    return (data ?? []) as Startup[];
  },

  async getStartup(id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("startups")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return (data as Startup | null) ?? null;
  },

  async listStartupsByOwner(ownerId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("startups")
      .select("*")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false });
    return (data ?? []) as Startup[];
  },

  async createStartup(ownerId, input) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("startups")
      .insert({
        owner_id: ownerId,
        name: input.name,
        tagline: input.tagline,
        description: input.description,
        industry: input.industry,
        stage: input.stage,
        funding_goal: input.funding_goal,
        website: input.website,
      })
      .select("id")
      .single();
    if (error) return { error: error.message };
    return { id: data.id as string };
  },

  async getInterest(startupId, investorId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("interests")
      .select("*")
      .eq("startup_id", startupId)
      .eq("investor_id", investorId)
      .maybeSingle();
    return (data as Interest | null) ?? null;
  },

  async listInterestsForOwner(ownerId) {
    const supabase = await createClient();
    const { data: startupsData } = await supabase
      .from("startups")
      .select("id")
      .eq("owner_id", ownerId);
    const ids = (startupsData ?? []).map((s) => s.id as string);
    if (!ids.length) return [];

    const { data } = await supabase
      .from("interests")
      .select("*, startups(name)")
      .in("startup_id", ids)
      .order("created_at", { ascending: false });
    return (data ?? []) as InterestWithStartupName[];
  },

  async listInterestsByInvestor(investorId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("interests")
      .select("*, startups(*)")
      .eq("investor_id", investorId)
      .order("created_at", { ascending: false });
    return (data ?? []) as InterestWithStartup[];
  },

  async createInterest({ startupId, investorId, message, amount }) {
    const supabase = await createClient();
    const { error } = await supabase.from("interests").insert({
      startup_id: startupId,
      investor_id: investorId,
      message,
      amount,
    });
    if (error) {
      if (error.code === "23505") return { duplicate: true };
      return { error: error.message };
    }
    return {};
  },
};
