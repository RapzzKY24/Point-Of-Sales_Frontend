"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardCashier } from "../api/dashboard-cashier.api";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import CategoryBadges from "./CategoryBadges";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

type ProductDetailModalProps = {
  productId: string;
  onClose?: () => void;
};

const ProductDetailModal = ({
  productId,
  onClose,
}: ProductDetailModalProps) => {
  const { data: product, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => await dashboardCashier.getProductDetail(productId),
  });
  console.log("product =>", product);

  console.log(product?.name);

  console.log("error =>", error?.message);
  return (
    <div className="relative max-w-4xl w-full mx-auto rounded-2xl bg-white shadow-2xl p-5 md:p-6">
      <div className="flex flex-col gap-y-6">
        {/* header + close button */}
        <div className="space-y-3">
          <div className="flex justify-between  items-center gap-6">
            <h2 className="text-xl font-bold">Product Detail</h2>
            <button onClick={onClose}>X</button>
          </div>
          {/* image product */}
          <div className="w-full h-full aspect-4/3 bg-white/50 shadow-md rounded-md">
            {product?.image ? (
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
          </div>
          {/* badge product + title + price */}
          <div className="space-y-3">
            <div className="flex-none rounded-full px-3 py-2.5 text-sm font-semibold bg-[#3A5A2A] text-white shadow-md shadow-green-900/10 w-[50%]">
              {product?.Category?.name}
            </div>
            <hgroup className="flex items-center justify-between text-primary-600 gap-4">
              <h1 className="text-xl font-semibold">{product?.name}</h1>
              <p className="font-extralight">{product?.price}</p>
            </hgroup>
          </div>
          {/* notes order */}
          <div className="space-y-3 ">
            <h3 className="font-medium">Notes</h3>
            <textarea />
          </div>
          {/* button quantity order */}
          <Button>Add to Cart ({formatCurrency(product?.price)})</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
