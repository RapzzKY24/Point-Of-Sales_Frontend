"use client";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Calendar1Icon, ShoppingBagIcon, User2Icon } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
      {/* Left: Brand */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#5F8D4E] shadow-sm shadow-green-900/10">
            <ShoppingBagIcon className="text-white size-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#3A5A2A]">
            Rapz Store
          </span>
        </div>
        <div className="h-6 w-px bg-gray-200"></div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          <Calendar1Icon className="size-4 text-gray-400" />
          <span>Oct 24, 2023</span>
        </div>
      </div>

      {/* Right: Status & User */}
      <div className="flex items-center gap-6">
        <div className="hidden items-center gap-2 rounded-full border border-[#CDE5C0] bg-[#E9F5E0] px-4 py-1.5 lg:flex">
          <span className="size-2 rounded-full bg-[#5F8D4E] animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wide text-[#3A5A2A]">
            Terminal Active
          </span>
        </div>

        <div className="flex items-center gap-4  border-l border-gray-100">
          <div className="hidden sm:block">
            <h2 className="text-sm font-bold leading-tight">
              {user ? user.name : "John Doe"}
            </h2>
            <p className="text-[10px] text-gray-400 font-mono">
              {user ? user.role : "ID: #CSH-0042"}
            </p>
          </div>
          <div className="relative size-10 overflow-hidden rounded-full bg-[#E9F5E0] ring-2 ring-white shadow-sm">
            <User2Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5F8D4E]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
