import { ImageIcon } from "lucide-react";
import Image from "next/image";

const PRODUCTS = [
  { id: 3, name: "Organic Bananas", price: 1.2, stock: "1.2KG", image: null },
  { id: 5, name: "Instant Coffee", price: 12.99, stock: "SALE", image: null },
  {
    id: 6,
    name: "Whole Wheat Bread",
    price: 3.2,
    stock: "LOW STOCK",
    image: null,
  },
  { id: 7, name: "Orange Juice 1L", price: 2.5, stock: "FRESH", image: null },
  { id: 8, name: "Butter Cookies", price: 5.5, stock: "SOLD OUT", image: null },
  {
    id: 9,
    name: "Chocolate Milk 500ml",
    price: 2.8,
    stock: "LOW STOCK",
    image: null,
  },
  {
    id: 10,
    name: "Mineral Water 1.5L",
    price: 1.2,
    stock: "FRESH",
    image: null,
  },
  {
    id: 11,
    name: "Potato Chips BBQ",
    price: 3.7,
    stock: "SOLD OUT",
    image: null,
  },
];

const ProductGrid = () => {
  return (
    <div className="grid flex-1 overflow-y-auto grid-cols-2 gap-4 pb-24 md:grid-cols-3 xl:grid-cols-4 pr-2">
      {PRODUCTS.map((product) => (
        <div
          key={product.id}
          className="group relative flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-[#5F8D4E]/30 cursor-pointer"
        >
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-50">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
                <ImageIcon className="size-10" />
              </div>
            )}
            {/* Stock Badge */}
            <span
              className={`absolute bottom-2 right-2 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                product.stock === "SOLD OUT"
                  ? "bg-red-500/90 text-white"
                  : "bg-white/90 text-gray-700 shadow-sm"
              }`}
            >
              {product.stock}
            </span>
          </div>

          {/* Info */}
          <div>
            <h3 className="line-clamp-1 font-bold text-gray-700 group-hover:text-[#5F8D4E]">
              {product.name}
            </h3>
            <p className="mt-1 text-lg font-black text-[#3A5A2A]">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
