import SearchBar from "@/components/shared/SearchBar";
import CategoryBadges from "../components/CategoryBadges";
import ProductGrid from "../components/ProductGrid";
import HeaderCartItemList from "../components/HeaderCartItemList";
import CartItemList from "../components/CartItemList";
import SummaryItemCart from "../components/SummaryItemCart";
import PaymentBadges from "../components/PaymentBadges";
import ActionButtonPay from "@/components/shared/ActionButtonPay";

const MainContentDashboardCashier = () => {
  return (
    <>
      {/* LEFT COLUMN: Catalog */}
      <section className="flex flex-1 flex-col gap-6 overflow-hidden rounded-3xl">
        {/* Categories Filter (Horizontal Scroll) */}
        <CategoryBadges />

        {/* Search & Actions */}
        <SearchBar />

        {/* Product Grid */}
        <ProductGrid />
      </section>

      {/* RIGHT COLUMN: Cart */}
      <aside className="hidden w-[400px] flex-col rounded-3xl bg-white shadow-xl shadow-gray-200/50 ring-1 ring-gray-100 lg:flex">
        {/* Header */}
        <HeaderCartItemList />

        {/* Items List */}
        <CartItemList />

        {/* Summary Section */}
        <div className="bg-white p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10">
          <SummaryItemCart totalAmount={70000} />
          {/* Payment Toggle */}
          <PaymentBadges />

          {/* Main Action */}
          <ActionButtonPay />
        </div>
      </aside>
    </>
  );
};

export default MainContentDashboardCashier;
