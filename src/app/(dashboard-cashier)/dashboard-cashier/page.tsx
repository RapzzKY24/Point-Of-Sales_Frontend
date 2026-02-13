import MainContentDashboardCashier from "@/features/dashboard-cashier/pages/MainContentDashboardCashier";

export default function DashboardCashierPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-[#FDFDF7] text-slate-800 font-sans overflow-hidden">
      <main className="flex flex-1 overflow-hidden p-6 gap-6">
        <MainContentDashboardCashier />
      </main>
    </div>
  );
}
