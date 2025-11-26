import { getAuth } from "@/lib/getSession";
import OwnerDashboard from "./ownerDashboard";
import { getOwnerDashboardData } from "@/services/report/ownerDashboard";

export default async function OwnerDashboardPage() {
  var user = await getAuth(["OWNER"], "/dashboard/customer");

  if (!user.restaurantId) return <div>Restaurant not found</div>;

  const dashboardData = await getOwnerDashboardData(user.restaurantId);

  return <OwnerDashboard dashboardData={dashboardData} />;
  return;
}
