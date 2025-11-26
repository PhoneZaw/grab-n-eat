import { getAuth } from "@/lib/getSession";
import ManagerDashboard from "./managerDashboard";
import { getManagerDashboardData } from "@/services/report/managerDashboard";

export default async function ManagerDashboardPage() {
  var user = await getAuth(["MANAGER"], "/dashboard/customer");

  if (!user.branchId) return <div>Branch not found</div>;

  const dashboardData = await getManagerDashboardData(user.branchId);

  console.log("Dashboard Data", dashboardData);

  return <ManagerDashboard dashboardData={dashboardData} />;
}
