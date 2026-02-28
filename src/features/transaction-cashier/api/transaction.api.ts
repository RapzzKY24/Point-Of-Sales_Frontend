import { ApiInstace } from "@/lib/apiInstance";

export type CreateTransactionDto = {
  paid: number;
  paymentMethod: string;
  items: [
    {
      productId: string;
      quantity: number;
    },
  ];
};

export type CreateTransactionResponse = {
  transaction: {
    id: string;
    total: number;
    paid: number;
    change: number;
    paymentMethod: string;
    items: [
      {
        id: string;
        quantity: number;
        price: number;
        product: {
          id: string;
          name: string;
          productSku: string;
        };
      },
    ];
  };
};

export type getAllTransactionsResponse = {
  message: string;
  data: {
    id: string;
    total: number;
    paid: number;
    change: number;
    userId: string;
    paymentMethod: string;
    items: {
      quantity: number;
      price: number;
      productId: string;
      transactionId: string;
      product: {
        name: string;
        price: string;
        productImage: string;
        productSku: string;
      };
    }[];
  }[];
};

export const TransactionApi = {
  createTransaction: async (dto: CreateTransactionDto) => {
    const res = await ApiInstace.post<CreateTransactionResponse>(
      "/transactions",
      dto,
    );
    return res.data.transaction;
  },

  getAllTransactions: async () => {
    const res =
      await ApiInstace.get<getAllTransactionsResponse>("/transactions");
    return res.data;
  },
};
