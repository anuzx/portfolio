"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchGithubProfile, type GithubProfile } from "@/lib/github";

/**
 * Profile picture pulled straight from GitHub so it never has to be manually
 * updated. Falls back to a neutral placeholder while loading.
 */
const GithubAvatar = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);

  useEffect(() => {
    let active = true;

    fetchGithubProfile().then((data) => {
      if (active) setProfile(data);
    });

    return () => {
      active = false;
    };
  }, []);

  if (!profile) {
    return (
      <div
        aria-hidden="true"
        className="h-16 w-16 shrink-0 animate-pulse rounded-full border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
      />
    );
  }

  return (
    <Image
      src={profile.avatarUrl}
      alt={profile.name ?? profile.login}
      width={64}
      height={64}
      priority
      className="h-16 w-16 shrink-0 rounded-full border border-neutral-200 object-cover dark:border-neutral-800"
    />
  );
};

export default GithubAvatar;
