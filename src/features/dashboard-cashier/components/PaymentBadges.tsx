"use client";
import { CreditCardIcon, QrCodeIcon, WalletIcon } from "lucide-react";
import { useState } from "react";

const PaymentBadges = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <div className="mb-6 grid grid-cols-3 gap-3">
      {[
        { id: "cash", icon: WalletIcon, label: "Cash" },
        { id: "qris", icon: QrCodeIcon, label: "QRIS" },
        { id: "debit", icon: CreditCardIcon, label: "Debit" },
      ].map((method) => (
        <button
          key={method.id}
          onClick={() => setPaymentMethod(method.id)}
          className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 py-3 transition-all ${
            paymentMethod === method.id
              ? "border-[#5F8D4E] bg-[#F3F8F0] text-[#3A5A2A]"
              : "border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100"
          }`}
        >
          <method.icon
            className={`size-5 ${paymentMethod === method.id ? "fill-current" : ""}`}
          />
          <span className="text-xs font-bold">{method.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PaymentBadges;
