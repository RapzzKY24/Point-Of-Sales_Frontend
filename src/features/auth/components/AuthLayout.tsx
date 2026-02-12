"use client";
import { Store } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="w-full min-h-screen bg-[#f5f7f0] flex items-center justify-center lg:grid lg:grid-cols-2 lg:gap-0">
      {/* Form Section */}
      <div className="w-full flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg lg:shadow-none lg:bg-transparent lg:p-0">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 lg:hidden text-[#7a8c1a] mb-2">
            <Store className="w-6 h-6" />
            <span className="font-bold text-xl">PosSystem.</span>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="text-slate-500">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      {/* Brand Section */}
      <div className="hidden lg:flex flex-col relative h-full bg-[#465a27] text-white p-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#7a8c1a] to-[#465a27] opacity-90 z-10" />
        <div className="relative z-20 flex flex-col justify-between h-full">
          <div className="flex items-center gap-2">
            <Store className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">PosSystem.</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
