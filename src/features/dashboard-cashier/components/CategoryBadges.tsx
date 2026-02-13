"use client";
import { useState } from "react";

const CATEGORIES = [
  "All Items",
  "Snacks",
  "Drinks",
  "Bakery",
  "Fruits",
  "Frozen",
  "Dairy",
  "Personal Care",
];

const CategoryBadges = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");

  return (
    <div className="flex w-full gap-3 overflow-x-auto pb-1 scrollbar-hide">
      {CATEGORIES.map((cat) => (
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
      ))}
    </div>
  );
};

export default CategoryBadges;
