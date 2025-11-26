import { getAuth } from "@/lib/getSession";
import OrderReportTable from "./orderReportTable";
import { getOrderReportData, OrderReport } from "@/services/report/orderReport";

export default async function OrderReportPage() {
  const session = await getAuth(
    ["OWNER", "MANAGER"],
    "/dashboard/order-report"
  );

  var orders: OrderReport[] = [];

  if (session.role === "OWNER") {
    orders = await getOrderReportData();
  } else if (session.role === "MANAGER") {
    if (!session.branchId) throw new Error("Branch not found");

    orders = await getOrderReportData(session.branchId);
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Order Report</h2>
        </div>
        <div className="flex justify-center items-center gap-4">
          {/* Date Filter */}
        </div>
      </div>
      <div className="overflow-hidden w-full">
        <OrderReportTable orders={orders} />
      </div>
    </div>
  );
}
