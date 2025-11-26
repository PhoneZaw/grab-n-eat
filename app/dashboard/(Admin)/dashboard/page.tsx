import { getAuth } from "@/lib/getSession";
import AdminDashboard from "./admin-dashboard";
import { getAdminDashboardData } from "@/services/report/adminDashboard";

export default async function ManagerDashboardPage() {
  var user = await getAuth(["ADMIN"], "/dashboard/dashboard");

  var dashboardData = await getAdminDashboardData();

  return <AdminDashboard dashboardData={dashboardData} />;
  return;
}
