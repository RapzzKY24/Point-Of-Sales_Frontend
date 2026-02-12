import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import QueryProviderLayout from "./layoutQueryProvider";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/features/auth/context/AuthContext";

const JakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Point Of Sales",
  description: "Point Of Sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${JakartaSans.variable} ${JakartaSans.variable} antialiased `}
      >
        <AuthProvider>
          <QueryProviderLayout>{children}</QueryProviderLayout>
          <ToastContainer aria-label={""} />
        </AuthProvider>
      </body>
    </html>
  );
}
