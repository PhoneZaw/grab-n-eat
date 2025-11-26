import { getClientAuth } from "@/lib/getSession";
import OrderHistory from "./orderHistory";
import { getOrdersByCustomerId } from "@/services/order/orderRead";

export default async function OrderHistoryPage() {
  const user = await getClientAuth();
  const ordersList = await getOrdersByCustomerId(user.id);

  return <OrderHistory ordersList={ordersList} />;
}
