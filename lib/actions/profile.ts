"use server";

import { createClient } from "../supabase/server";

export async function getCurrentUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("getCurrentUserProfile: No user found");
    return null;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  console.log("getCurrentUserProfile: DB query result:", { profile, error });

  if (error) {
    console.error("Error fetching profile: ", error);
    return null;
  }

  return profile;
}
