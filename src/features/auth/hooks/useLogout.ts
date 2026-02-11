"use client";
import { useAuth } from "../context/AuthContext";
import { authUtils } from "../utils/authUtils";

export const useLogout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    authUtils.clearAuth();
    logout();
  };

  return {
    logout: handleLogout,
  };
};
