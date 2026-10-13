import { promises as fs } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import type { Interest, Profile, Startup, UserRole } from "@/lib/types";

export type DemoUser = {
  id: string;
  email: string;
  password: string;
  role: UserRole;
};

export type DemoDb = {
  users: DemoUser[];
  profiles: Profile[];
  startups: Startup[];
  interests: Interest[];
};

const DB_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DB_DIR, "demo-db.json");

let cache: DemoDb | null = null;
let loading: Promise<DemoDb> | null = null;

function iso(daysAgo: number, hoursAgo = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(d.getHours() - hoursAgo);
  return d.toISOString();
}

function seed(): DemoDb {
  const users: DemoUser[] = [
    { id: "demo-founder", email: "founder@demo.com", password: "demo1234", role: "founder" },
    { id: "demo-investor", email: "investor@demo.com", password: "demo1234", role: "investor" },
    { id: "demo-founder-2", email: "alan@demo.com", password: "demo1234", role: "founder" },
    { id: "demo-founder-3", email: "katherine@demo.com", password: "demo1234", role: "founder" },
    { id: "demo-founder-4", email: "walt@demo.com", password: "demo1234", role: "founder" },
    { id: "demo-investor-2", email: "hedy@demo.com", password: "demo1234", role: "investor" },
  ];

  const profiles: Profile[] = [
    {
      id: "demo-founder",
      role: "founder",
      full_name: "Ada Lovelace",
      company: "GreenLoop",
      bio: "Building circular-economy infrastructure for cities.",
      avatar_url: null,
      created_at: iso(40),
      updated_at: iso(3),
    },
    {
      id: "demo-investor",
      role: "investor",
      full_name: "Grace Hopper",
      company: "Compass Capital",
      bio: "Early-stage investor focused on climate and fintech.",
      avatar_url: null,
      created_at: iso(35),
      updated_at: iso(2),
    },
    {
      id: "demo-founder-2",
      role: "founder",
      full_name: "Alan Turing",
      company: "NorthStar AI",
      bio: "Applied machine learning for industrial operations.",
      avatar_url: null,
      created_at: iso(30),
      updated_at: iso(4),
    },
    {
      id: "demo-founder-3",
      role: "founder",
      full_name: "Katherine Johnson",
      company: "Ledgerly",
      bio: "Realtime accounting engines for vertical SaaS.",
      avatar_url: null,
      created_at: iso(28),
      updated_at: iso(6),
    },
    {
      id: "demo-founder-4",
      role: "founder",
      full_name: "Walt Disney",
      company: "Cartly",
      bio: "A marketplace connecting local makers to buyers.",
      avatar_url: null,
      created_at: iso(22),
      updated_at: iso(8),
    },
    {
      id: "demo-investor-2",
      role: "investor",
      full_name: "Hedy Lamarr",
      company: "Signal Ventures",
      bio: "Deep tech and infrastructure investor.",
      avatar_url: null,
      created_at: iso(20),
      updated_at: iso(1),
    },
  ];

  const startups: Startup[] = [
    {
      id: "startup-greenloop",
      owner_id: "demo-founder",
      name: "GreenLoop",
      tagline: "Circular logistics for city waste streams.",
      description:
        "GreenLoop routes commercial waste through a network of local recyclers, turning disposal into a measurable circular-economy loop. We give cities realtime diversion analytics and give recyclers steady, pre-sorted feedstock.",
      industry: "Cleantech",
      stage: "seed",
      funding_goal: 2000000,
      amount_raised: 420000,
      website: "https://example.com/greenloop",
      logo_url: null,
      created_at: iso(18),
      updated_at: iso(3),
    },
    {
      id: "startup-northstar",
      owner_id: "demo-founder-2",
      name: "NorthStar AI",
      tagline: "Predictive maintenance for heavy industry.",
      description:
        "NorthStar ingests sensor telemetry from industrial equipment and predicts failures before they happen, cutting unplanned downtime for manufacturers by up to 40%.",
      industry: "AI",
      stage: "pre_seed",
      funding_goal: 750000,
      amount_raised: 150000,
      website: "https://example.com/northstar",
      logo_url: null,
      created_at: iso(15),
      updated_at: iso(5),
    },
    {
      id: "startup-ledgerly",
      owner_id: "demo-founder-3",
      name: "Ledgerly",
      tagline: "Embedded accounting for vertical SaaS.",
      description:
        "Ledgerly gives vertical SaaS platforms a realtime, double-entry ledger they can embed directly in their product, so end customers get accounting without leaving the app.",
      industry: "Fintech",
      stage: "series_a",
      funding_goal: 5000000,
      amount_raised: 3100000,
      website: "https://example.com/ledgerly",
      logo_url: null,
      created_at: iso(12),
      updated_at: iso(6),
    },
    {
      id: "startup-medisync",
      owner_id: "demo-founder",
      name: "MediSync",
      tagline: "Care coordination for small clinics.",
      description:
        "MediSync connects appointment scheduling, patient records, and billing for independent clinics in one lightweight tool that works on any device.",
      industry: "Healthtech",
      stage: "idea",
      funding_goal: 500000,
      amount_raised: 0,
      website: null,
      logo_url: null,
      created_at: iso(9),
      updated_at: iso(9),
    },
    {
      id: "startup-cartly",
      owner_id: "demo-founder-4",
      name: "Cartly",
      tagline: "A marketplace for local makers.",
      description:
        "Cartly helps independent makers sell locally with group storefronts, shared delivery routes, and tools that compete with large marketplaces.",
      industry: "Marketplace",
      stage: "seed",
      funding_goal: 1200000,
      amount_raised: 300000,
      website: "https://example.com/cartly",
      logo_url: null,
      created_at: iso(6),
      updated_at: iso(4),
    },
    {
      id: "startup-cloudatlas",
      owner_id: "demo-founder",
      name: "CloudAtlas",
      tagline: "Cost visibility for multi-cloud teams.",
      description:
        "CloudAtlas unifies spend, tagging, and forecasting across AWS, GCP, and Azure, giving platform teams a single view of unit economics.",
      industry: "SaaS",
      stage: "series_b",
      funding_goal: 10000000,
      amount_raised: 6500000,
      website: "https://example.com/cloudatlas",
      logo_url: null,
      created_at: iso(3),
      updated_at: iso(2),
    },
  ];

  const interests: Interest[] = [
    {
      id: "interest-1",
      startup_id: "startup-greenloop",
      investor_id: "demo-investor",
      message: "Love the circular approach — would like to see unit economics.",
      amount: 100000,
      status: "pending",
      created_at: iso(2),
    },
    {
      id: "interest-2",
      startup_id: "startup-ledgerly",
      investor_id: "demo-investor",
      message: "Embedded accounting is a strong wedge. Let's talk.",
      amount: 250000,
      status: "pending",
      created_at: iso(5),
    },
    {
      id: "interest-3",
      startup_id: "startup-northstar",
      investor_id: "demo-investor-2",
      message: "Industrial ML is our focus. Interested in the data moat.",
      amount: 75000,
      status: "pending",
      created_at: iso(4),
    },
  ];

  return { users, profiles, startups, interests };
}

async function persist(db: DemoDb): Promise<void> {
  await fs.mkdir(DB_DIR, { recursive: true });
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

export async function getDb(): Promise<DemoDb> {
  if (cache) return cache;
  if (loading) return loading;

  loading = (async () => {
    try {
      const raw = await fs.readFile(DB_FILE, "utf8");
      const parsed = JSON.parse(raw) as DemoDb;
      cache = parsed;
    } catch {
      cache = seed();
      await persist(cache);
    }
    return cache;
  })();

  const db = await loading;
  loading = null;
  return db;
}

export async function saveDb(): Promise<void> {
  if (cache) await persist(cache);
}

export function newId(): string {
  return randomUUID();
}
