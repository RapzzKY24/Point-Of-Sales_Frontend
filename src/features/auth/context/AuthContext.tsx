"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthUser, AuthSession } from "../types/auth.types";

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser, session: AuthSession) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const BETTER_AUTH_SESSION_COOKIE = "better-auth.session_token";
const USER_DATA_COOKIE = "auth_user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const sessionToken = Cookies.get(BETTER_AUTH_SESSION_COOKIE);
      const storedUser = Cookies.get(USER_DATA_COOKIE);

      if (storedUser) {
        const userData = JSON.parse(storedUser) as AuthUser;
        const token = sessionToken || `session_${Date.now()}`;
        const userId = String(userData.id);

        const sessionData: AuthSession = {
          id: token,
          token: token,
          expiresAt: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId,
        };

        setUser(userData);
        setSession(sessionData);
      }
    } catch {
      Cookies.remove(BETTER_AUTH_SESSION_COOKIE);
      Cookies.remove(USER_DATA_COOKIE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: AuthUser, sessionData: AuthSession) => {
    setUser(userData);
    setSession(sessionData);

    Cookies.set(USER_DATA_COOKIE, JSON.stringify(userData), {
      expires: 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  };

  const logout = () => {
    setUser(null);
    setSession(null);
    Cookies.remove(BETTER_AUTH_SESSION_COOKIE, { path: "/" });
    Cookies.remove(USER_DATA_COOKIE, { path: "/" });
    window.location.href = "/auth/login";
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      Cookies.set(USER_DATA_COOKIE, JSON.stringify(updatedUser), {
        expires: 30,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: !!user && !!session,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
