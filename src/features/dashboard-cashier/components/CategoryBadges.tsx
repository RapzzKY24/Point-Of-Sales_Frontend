"use client";
import { useState } from "react";
import { dashboardCashier } from "../api/dashboard-cashier.api";
import { useQuery } from "@tanstack/react-query";

type Category = {
  id: string;
  name: string;
};

const CategoryBadges = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: dashboardCashier.getCategories,
  });

  const allCategories = ["All Items", ...categories.map((cat) => cat.name)];

  return (
    <div className="flex w-full gap-3 overflow-x-auto pb-1 scrollbar-hide">
      {isLoading ? (
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      ) : (
        allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-none rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#3A5A2A] text-white shadow-md shadow-green-900/10 scale-105"
                : "bg-white text-gray-500 hover:bg-[#E9F5E0] hover:text-[#3A5A2A]"
            }`}
          >
            {cat}
          </button>
        ))
      )}
    </div>
  );
};

export default CategoryBadges;
