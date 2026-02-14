"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { dashboardCashier } from "../api/dashboard-cashier.api";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  price: number;
  productSku: string;
  Category?: {
    name: string;
  };
  stock: number;
  image?: string | null;
};

const ProductGrid = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await dashboardCashier.getProduct(),
    staleTime: 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!products || products.length === 0) return notFound();

  return (
    <div className="grid flex-1 overflow-y-auto content-start grid-cols-2 gap-4 p-1 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product: Product) => {
        const isOutOfStock = product.stock <= 0;
        const isLowStock = product.stock > 0 && product.stock <= 5;

        return (
          <div
            key={product.id}
            className={`group relative flex h-fit cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 transition-all hover:-translate-y-1 hover:shadow-lg ${
              isOutOfStock
                ? "opacity-60 ring-gray-100 grayscale-[0.5]"
                : "ring-gray-100 hover:ring-[#5F8D4E]/50"
            }`}
          >
            {/* BAGIAN GAMBAR  */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
                  <ImageIcon className="size-10" />
                </div>
              )}

              {/* Category Badge (Top Left) */}
              {product.Category?.name && (
                <span className="absolute left-2 top-2 z-10 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  {product.Category.name}
                </span>
              )}

              {/* Stock Badge (Bottom Right) */}
              <span
                className={`absolute bottom-2 right-2 z-10 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
                  isOutOfStock
                    ? "bg-red-500/90 text-white"
                    : isLowStock
                      ? "bg-yellow-400/90 text-yellow-900"
                      : "bg-white/90 text-[#3A5A2A]"
                }`}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : isLowStock
                    ? `${product.stock} Left`
                    : `${product.stock} Stock`}
              </span>
            </div>

            {/* === BAGIAN INFO === */}
            <div className="flex flex-col gap-1 p-3">
              {/* SKU - Small & Mono */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-400 tracking-tight bg-gray-50 px-1.5 py-0.5 rounded">
                  {product.productSku}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="line-clamp-2 min-h-2.5rem text-sm font-bold text-gray-700 leading-tight group-hover:text-[#5F8D4E] transition-colors">
                {product.name}
              </h3>

              {/* Price & Action Placeholder */}
              <div className="mt-2 flex items-center justify-between border-t border-gray-50 pt-2">
                <p className="text-lg font-black text-[#3A5A2A]">
                  {formatCurrency(product.price)}
                </p>
                {!isOutOfStock && (
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#E9F5E0] text-[#5F8D4E] opacity-0 group-hover:opacity-100 transition-opacity">
                    +
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
