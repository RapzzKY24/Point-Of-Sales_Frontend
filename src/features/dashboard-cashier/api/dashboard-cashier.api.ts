import { ApiInstace } from "@/lib/apiInstance";

type queryGetProduct = {
  categoryId: string;
  productSku: string;
  name: string;
  sortBy: string;
  take: string;
  offset: string;
};

export const dashboardCashier = {
  getProduct: async (query?: queryGetProduct) => {
    const res = await ApiInstace.get("products", { params: query });
    return res.data.data;
  },

  getCategories: async () => {
    const res = await ApiInstace.get("categories");
    return res.data.data;
  },
};
