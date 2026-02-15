"use client";
import { dashboardCashier } from "../api/dashboard-cashier.api";
import { useQuery } from "@tanstack/react-query";

type Category = {
  id: string;
  name: string;
};

type CategoryBadgesProps = {
  selectedCategory?: string;
  onCategoryChange: (categoryId: string | undefined) => void;
};

const CategoryBadges = ({
  selectedCategory,
  onCategoryChange,
}: CategoryBadgesProps) => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: dashboardCashier.getCategories,
  });

  const handleCategoryClick = (categoryId: string | undefined) => {
    onCategoryChange(categoryId);
  };

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
        <>
          {/* All Items Button */}
          <button
            onClick={() => handleCategoryClick(undefined)}
            className={`flex-none rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
              !selectedCategory
                ? "bg-[#3A5A2A] text-white shadow-md shadow-green-900/10 scale-105"
                : "bg-white text-gray-500 hover:bg-[#E9F5E0] hover:text-[#3A5A2A]"
            }`}
          >
            All Items
          </button>

          {/* Category Buttons */}
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex-none rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-[#3A5A2A] text-white shadow-md shadow-green-900/10 scale-105"
                  : "bg-white text-gray-500 hover:bg-[#E9F5E0] hover:text-[#3A5A2A]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default CategoryBadges;
