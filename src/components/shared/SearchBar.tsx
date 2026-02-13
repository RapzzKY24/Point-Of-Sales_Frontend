import { BarcodeIcon, SearchIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const SearchBar = () => {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1 group">
        <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5F8D4E] transition-colors" />
        <Input
          className="h-14 w-full rounded-2xl border-0 bg-white pl-12 shadow-sm text-base ring-1 ring-gray-100 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#5F8D4E]"
          placeholder="Search product name or SKU..."
        />
      </div>
      <Button
        variant="outline"
        className="h-14 gap-3 rounded-2xl border-gray-200 bg-white px-8 text-gray-700 shadow-sm hover:bg-gray-50 hover:text-[#5F8D4E] hover:border-[#5F8D4E]"
      >
        <BarcodeIcon className="size-5" />
        <span className="font-bold">Scan Barcode</span>
      </Button>
    </div>
  );
};

export default SearchBar;
