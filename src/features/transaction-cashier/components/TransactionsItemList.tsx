import { useQuery } from "@tanstack/react-query";
import { ImageIcon, MinusIcon, PlusIcon } from "lucide-react";
// import Image from "next/image";
import { TransactionApi } from "../api/transaction.api";
import { formatCurrency } from "@/lib/utils";

const TransactionsItemList = () => {
  const { data: transactionsItems } = useQuery({
    queryKey: ["transactions-items"],
    queryFn: () => TransactionApi.getAllTransactions(),
  });

  return (
    <div className="flex-1 space-y-4 overflow-y-auto bg-[#FAFAFA] p-4">
      {transactionsItems?.data.flatMap((transaction, i) => (
        <div
          key={transaction.id}
          className={`flex gap-4 rounded-2xl border p-3 shadow-sm transition-colors ${i === 1 ? "bg-[#F3F8F0] border-[#CDE5C0]" : "bg-white border-gray-100"}`}
        >
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white border border-gray-100">
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
              <ImageIcon className="size-10" />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex justify-between">
              <h4 className="font-bold text-gray-800 line-clamp-1">
                {transaction.items[0].product?.name}
              </h4>
              <span className="font-bold text-gray-900">
                {formatCurrency(
                  transaction.items[0].price * transaction.items[0].quantity,
                )}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xs font-medium text-gray-400">
                {formatCurrency(transaction.items[0].price)}
              </span>
              <div className="flex h-7 items-center rounded-lg bg-white ring-1 ring-gray-200">
                <button className="flex h-full w-7 items-center justify-center rounded-l-lg hover:bg-gray-50 text-gray-500">
                  <MinusIcon className="size-3" />
                </button>
                <span className="w-6 text-center text-xs font-bold">
                  {transaction.items[0].quantity}
                </span>
                <button className="flex h-full w-7 items-center justify-center rounded-r-lg hover:bg-gray-50 text-gray-500">
                  <PlusIcon className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsItemList;
