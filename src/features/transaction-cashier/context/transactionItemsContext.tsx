"use client";
import { createContext, useContext, useMemo } from "react";
import {
  TransactionApi,
  getAllTransactionsResponse,
} from "../api/transaction.api";
import { useQuery } from "@tanstack/react-query";

interface TransactionContextType {
  transactionItem: getAllTransactionsResponse | undefined;
  isLoading: boolean;
  totalPrice: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

interface TransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionContextProvider = ({
  children,
}: TransactionProviderProps) => {
  const { data: transactionItem, isLoading } = useQuery({
    queryKey: ["transactions-items"],
    queryFn: () => TransactionApi.getAllTransactions(),
  });

  const totalPrice = useMemo(() => {
    if (!transactionItem?.data) return 0;

    return transactionItem.data
      .flatMap((transaction) => transaction.items)
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [transactionItem]);

  const value: TransactionContextType = {
    transactionItem,
    isLoading,
    totalPrice,
  };
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionItem = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
