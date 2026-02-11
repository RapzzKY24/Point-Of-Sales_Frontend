export const authQueryKeys = {
  all: ["auth"] as const,
  user: () => [...authQueryKeys.all, "user"] as const,
  profile: () => [...authQueryKeys.all, "profile"] as const,
  sessions: () => [...authQueryKeys.all, "sessions"] as const,
} as const;
