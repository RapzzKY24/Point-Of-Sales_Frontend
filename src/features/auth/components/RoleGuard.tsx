"use client";
import { useAuth } from "../context/AuthContext";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ("ADMIN" | "CASHIER" | "MANAGER")[];
  fallback?: React.ReactNode;
}

export const RoleGuard = ({
  children,
  allowedRoles,
  fallback = null,
}: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  if (!allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
