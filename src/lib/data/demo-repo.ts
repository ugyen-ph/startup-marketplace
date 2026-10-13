import { getDb, newId, saveDb } from "@/lib/data/demo-store";
import {
  clearDemoSession,
  getDemoUserId,
  setDemoSession,
} from "@/lib/data/demo-session";
import type {
  CreateInterestInput,
  CreateStartupInput,
  PublicProfile,
  Repo,
  RepoUser,
} from "@/lib/data/repo";
import type { Interest, Profile, Startup } from "@/lib/types";

function byNewest<T extends { created_at: string }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export const demoRepo: Repo = {
  async getUser(): Promise<RepoUser | null> {
    const id = await getDemoUserId();
    if (!id) return null;
    const db = await getDb();
    const user = db.users.find((u) => u.id === id);
    return user ? { id: user.id, email: user.email } : null;
  },

  async getProfile(id): Promise<Profile | null> {
    const db = await getDb();
    return db.profiles.find((p) => p.id === id) ?? null;
  },

  async getPublicProfile(id): Promise<PublicProfile | null> {
    const db = await getDb();
    const profile = db.profiles.find((p) => p.id === id);
    return profile
      ? {
          full_name: profile.full_name,
          company: profile.company,
          bio: profile.bio,
        }
      : null;
  },

  async signIn(email, password) {
    const db = await getDb();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user) {
      return {
        error:
          "No demo account found. Try founder@demo.com or investor@demo.com (password: demo1234), or create an account.",
      };
    }
    if (user.password !== password) {
      return { error: "Incorrect password. Demo accounts use demo1234." };
    }
    await setDemoSession(user.id);
    return {};
  },

  async signUp({ email, password, fullName, role }) {
    const db = await getDb();
    if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return {
        error: "An account with that email already exists.",
        session: false,
      };
    }

    const id = newId();
    const now = new Date().toISOString();
    db.users.push({ id, email, password, role });
    db.profiles.push({
      id,
      role,
      full_name: fullName || null,
      company: null,
      bio: null,
      avatar_url: null,
      created_at: now,
      updated_at: now,
    });
    await saveDb();
    await setDemoSession(id);
    return { session: true };
  },

  async signOut() {
    await clearDemoSession();
  },

  async listStartups() {
    const db = await getDb();
    return byNewest(db.startups);
  },

  async getStartup(id) {
    const db = await getDb();
    return db.startups.find((s) => s.id === id) ?? null;
  },

  async listStartupsByOwner(ownerId) {
    const db = await getDb();
    return byNewest(db.startups.filter((s) => s.owner_id === ownerId));
  },

  async createStartup(ownerId, input: CreateStartupInput) {
    const db = await getDb();
    const now = new Date().toISOString();
    const startup: Startup = {
      id: newId(),
      owner_id: ownerId,
      name: input.name,
      tagline: input.tagline,
      description: input.description,
      industry: input.industry,
      stage: input.stage,
      funding_goal: input.funding_goal,
      amount_raised: 0,
      website: input.website,
      logo_url: null,
      created_at: now,
      updated_at: now,
    };
    db.startups.push(startup);
    await saveDb();
    return { id: startup.id };
  },

  async getInterest(startupId, investorId) {
    const db = await getDb();
    return (
      db.interests.find(
        (i) => i.startup_id === startupId && i.investor_id === investorId,
      ) ?? null
    );
  },

  async listInterestsForOwner(ownerId) {
    const db = await getDb();
    const owned = db.startups.filter((s) => s.owner_id === ownerId);
    const names = new Map(owned.map((s) => [s.id, s.name]));
    if (!names.size) return [];

    return byNewest(
      db.interests.filter((i) => names.has(i.startup_id)),
    ).map((interest) => ({
      ...interest,
      startups: { name: names.get(interest.startup_id) ?? "" },
    }));
  },

  async listInterestsByInvestor(investorId) {
    const db = await getDb();
    return byNewest(
      db.interests.filter((i) => i.investor_id === investorId),
    ).map((interest) => ({
      ...interest,
      startups:
        db.startups.find((s) => s.id === interest.startup_id) ?? null,
    }));
  },

  async createInterest(input: CreateInterestInput) {
    const db = await getDb();
    const exists = db.interests.some(
      (i) =>
        i.startup_id === input.startupId &&
        i.investor_id === input.investorId,
    );
    if (exists) return { duplicate: true };

    const interest: Interest = {
      id: newId(),
      startup_id: input.startupId,
      investor_id: input.investorId,
      message: input.message,
      amount: input.amount,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    db.interests.push(interest);
    await saveDb();
    return {};
  },
};
