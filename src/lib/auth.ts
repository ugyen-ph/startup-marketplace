import { cache } from "react";
import { getRepo } from "@/lib/data";
import type { Profile } from "@/lib/types";

export const getCurrentUser = cache(async () => {
  return getRepo().getUser();
});

export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  return getRepo().getProfile(user.id);
});
