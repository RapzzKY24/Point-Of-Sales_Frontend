import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";

const CART_ITEMS = [
  {
    id: 1,
    name: "Mineral Water 600ml",
    price: 2.0,
    qty: 1,
    total: 2.0,
    image: "/images/water.png",
  },
  {
    id: 2,
    name: "Potato Chips L",
    price: 3.5,
    qty: 2,
    total: 7.0,
    image: "/images/chips.png",
  },
];

const CartItemList = () => {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto bg-[#FAFAFA] p-4">
      {CART_ITEMS.map((item, i) => (
        <div
          key={item.id}
          className={`flex gap-4 rounded-2xl border p-3 shadow-sm transition-colors ${i === 1 ? "bg-[#F3F8F0] border-[#CDE5C0]" : "bg-white border-gray-100"}`}
        >
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white border border-gray-100">
            {item.image ? (
              <Image
                src={item.image}
                fill
                alt={item.name}
                className="object-cover"
              />
            ) : (
              <div className="size-full bg-gray-100" />
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex justify-between">
              <h4 className="font-bold text-gray-800 line-clamp-1">
                {item.name}
              </h4>
              <span className="font-bold text-gray-900">
                ${item.total.toFixed(2)}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xs font-medium text-gray-400">
                ${item.price} x {item.qty}
              </span>
              <div className="flex h-7 items-center rounded-lg bg-white ring-1 ring-gray-200">
                <button className="flex h-full w-7 items-center justify-center rounded-l-lg hover:bg-gray-50 text-gray-500">
                  <MinusIcon className="size-3" />
                </button>
                <span className="w-6 text-center text-xs font-bold">
                  {item.qty}
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

export default CartItemList;
