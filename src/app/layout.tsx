import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProviderLayout from "./layoutQueryProvider";

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
        <QueryProviderLayout>{children}</QueryProviderLayout>
      </body>
    </html>
  );
}
