import { getManagersByRestaurantId } from "@/services/staff/staffList";

export async function GET(
  req: Request,
  { params }: { params: { restaurantId: string } }
): Promise<Response> {
  const data = await getManagersByRestaurantId(params.restaurantId);

  return new Response("Data");
}
