import { Trash2Icon } from "lucide-react";

const HeaderCartItemList = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 p-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-800">Current Order</h2>
        <span className="rounded-lg bg-[#E9F5E0] px-2.5 py-1 text-xs font-bold text-[#3A5A2A]">
          4 Items
        </span>
      </div>
      <button className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
        <Trash2Icon className="size-5" />
      </button>
    </div>
  );
};

export default HeaderCartItemList;
