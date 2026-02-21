"use client";
import { dashboardCashier } from "@/features/dashboard-cashier/api/dashboard-cashier.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const ProductDetailModal = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: product, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => await dashboardCashier.getProductDetail(slug),
  });

  console.log("id product =>", slug);

  console.log(product?.name);

  console.log("error =>", error?.message);

  return (
    <div>
      <h1>hello</h1>
      <h2>{product?.name}</h2>
      {product?.Category?.name}
    </div>
  );
};

export default ProductDetailModal;
