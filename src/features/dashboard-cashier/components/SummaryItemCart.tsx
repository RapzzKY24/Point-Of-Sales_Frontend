type PropsSummaryItemCart = {
  totalAmount: number;
};

const SummaryItemCart = ({ totalAmount }: PropsSummaryItemCart) => {
  return (
    <div className="bg-white p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10">
      <div className="mb-6 space-y-3">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">$17.57</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Tax (11%)</span>
          <span className="font-medium text-gray-900">$1.93</span>
        </div>
        <div className="my-2 border-t border-dashed border-gray-200"></div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-3xl font-black text-[#3A5A2A]">
            {totalAmount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryItemCart;
