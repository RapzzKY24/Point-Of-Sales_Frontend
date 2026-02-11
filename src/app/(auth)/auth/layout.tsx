import { AuthProvider } from "@/features/auth/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <main>{children}</main>
    </AuthProvider>
  );
}
