"use client";
import { useAuth } from "../context/AuthContext";

export const useLogout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // TODO: Call API to invalidate token on server
    logout();
  };

  return {
    logout: handleLogout,
  };
};
