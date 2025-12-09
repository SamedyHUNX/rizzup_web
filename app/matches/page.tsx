"use client";

import { UserProfile } from "@/app/profile/page";
import { getPotentialMatches } from "@/lib/actions/matches";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [potentialMatches, setPotentialMatches] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const potentialMatchesData = await getPotentialMatches();
        setPotentialMatches(potentialMatchesData);
        console.log(potentialMatchesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return <div></div>;
}
