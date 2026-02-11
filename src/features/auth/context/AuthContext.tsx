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

// Cookie names that better-auth uses
const BETTER_AUTH_SESSION_COOKIE = "better-auth.session_token";
const USER_DATA_COOKIE = "auth_user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user and session from cookies on mount
  useEffect(() => {
    const loadAuthData = () => {
      try {
        const sessionToken = Cookies.get(BETTER_AUTH_SESSION_COOKIE);
        const storedUser = Cookies.get(USER_DATA_COOKIE);

        if (sessionToken && storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);

          // Create session object from token (better-auth handles session internally)
          const sessionData: AuthSession = {
            id: sessionToken,
            token: sessionToken,
            expiresAt: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: userData.id,
          };
          setSession(sessionData);
        }
      } catch (error) {
        console.error("Error loading auth data from cookies:", error);
        // Clear invalid data
        Cookies.remove(BETTER_AUTH_SESSION_COOKIE);
        Cookies.remove(USER_DATA_COOKIE);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = (userData: AuthUser, sessionData: AuthSession) => {
    setUser(userData);
    setSession(sessionData);

    // Store user data in cookie (session token is handled by better-auth)
    Cookies.set(USER_DATA_COOKIE, JSON.stringify(userData), {
      expires: 30, // 30 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  };

  const logout = () => {
    setUser(null);
    setSession(null);

    // Clear cookies
    Cookies.remove(BETTER_AUTH_SESSION_COOKIE);
    Cookies.remove(USER_DATA_COOKIE);

    // Redirect to login page
    window.location.href = "/auth/login";
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      Cookies.set(USER_DATA_COOKIE, JSON.stringify(updatedUser), {
        expires: 30,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
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
