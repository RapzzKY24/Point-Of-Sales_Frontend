import Cookies from "js-cookie";
import { AuthUser } from "../types/auth.types";

// Cookie names that better-auth uses
const BETTER_AUTH_SESSION_COOKIE = "better-auth.session_token";
const USER_DATA_COOKIE = "auth_user";

export const authUtils = {
  // Get session token from cookies
  getSessionToken: (): string | null => {
    return Cookies.get(BETTER_AUTH_SESSION_COOKIE) || null;
  },

  // Get user from cookies
  getUser: (): AuthUser | null => {
    try {
      const user = Cookies.get(USER_DATA_COOKIE);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!(authUtils.getSessionToken() && authUtils.getUser());
  },

  // Clear auth data
  clearAuth: (): void => {
    Cookies.remove(BETTER_AUTH_SESSION_COOKIE);
    Cookies.remove(USER_DATA_COOKIE);
  },

  // Format user display name
  getDisplayName: (user: AuthUser): string => {
    return user.name || user.email.split("@")[0];
  },

  // Check if user has specific role
  hasRole: (user: AuthUser, role: "ADMIN" | "CASHIER" | "MANAGER"): boolean => {
    return user.role === role;
  },

  // Check if user is admin
  isAdmin: (user: AuthUser): boolean => {
    return user.role === "ADMIN";
  },

  // Check if user is manager
  isManager: (user: AuthUser): boolean => {
    return user.role === "MANAGER";
  },

  // Check if user is cashier
  isCashier: (user: AuthUser): boolean => {
    return user.role === "CASHIER";
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

  // Format role display name
  getRoleDisplayName: (role: "ADMIN" | "CASHIER" | "MANAGER"): string => {
    const roleMap = {
      ADMIN: "Administrator",
      MANAGER: "Manager",
      CASHIER: "Kasir",
    };
    return roleMap[role] || role;
  },
};
