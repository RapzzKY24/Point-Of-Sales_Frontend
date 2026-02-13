import { BadgeDollarSignIcon } from "lucide-react";
import { Button } from "../ui/Button";

const ActionButtonPay = () => {
  return (
    <Button className="group relative w-full overflow-hidden rounded-2xl bg-[#3A5A2A] py-7 text-lg font-bold text-white shadow-xl shadow-green-900/20 hover:bg-[#2f4a22] hover:shadow-green-900/30">
      <span className="flex w-full items-center gap-2 px-2">
        <BadgeDollarSignIcon className="text-primary-400/50" />
        <span>Pay Now</span>
      </span>
    </Button>
  );
};

export default ActionButtonPay;
