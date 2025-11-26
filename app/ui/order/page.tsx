import { getOrderDetailByCode } from "@/services/order/orderRead";
import OrderTracking from "./orderTracking";
import { getReviewByOrderCode } from "@/services/review/getReview";
import { getClientAuth } from "@/lib/getSession";

export default async function Order({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  var user = await getClientAuth(
    "/order-history?orderCode=" + searchParams.orderCode
  );

  if (!searchParams.orderCode) {
    console.log("no order code");
    return <div>Order not found</div>;
  }
  const order = await getOrderDetailByCode(searchParams.orderCode);

  console.log("Order", order);

  if (!order) {
    return <div>Order not found</div>;
  }

  const review = await getReviewByOrderCode(order.id);

  return <OrderTracking order={order} reviewData={review} />;
}
