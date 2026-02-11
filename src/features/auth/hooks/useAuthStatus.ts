"use client";
import { useEffect, useState } from "react";
import { authUtils } from "../utils/authUtils";
import { AuthUser } from "../types/auth.types";

export const useAuthStatus = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const userData = authUtils.getUser();
        const sessionToken = authUtils.getSessionToken();

        if (userData && sessionToken) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
};
