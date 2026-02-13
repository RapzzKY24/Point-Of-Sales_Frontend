import Navbar from "@/components/shared/Navbar";
import { ProtectedRoute, RoleGuard } from "@/features/auth/components";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export default function DashboardCashierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["CASHIER"]}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </RoleGuard>
    </ProtectedRoute>
  );
}
