import { AuthUser } from "../types/auth.types";

export const authUtils = {
  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  },

  // Get user from localStorage
  getUser: (): AuthUser | null => {
    if (typeof window === "undefined") return null;
    try {
      const user = localStorage.getItem("auth_user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!(authUtils.getToken() && authUtils.getUser());
  },

  // Clear auth data
  clearAuth: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  },

  // Format user display name
  getDisplayName: (user: AuthUser): string => {
    return user.name || user.email.split("@")[0];
  },

  // Check if user has specific role
  hasRole: (user: AuthUser, role: string): boolean => {
    return user.role === role;
  },

  // Get user initials for avatar
  getUserInitials: (user: AuthUser): string => {
    const name = user.name || user.email;
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  },
};
