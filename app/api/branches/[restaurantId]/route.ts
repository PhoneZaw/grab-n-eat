import db from "@/lib/db";
import { getBranchListByRestaurantId } from "@/services/branch/branchList";

export async function GET(
  request: Request,
  { params }: { params: { restaurantId: string } }
) {
  const data = await getBranchListByRestaurantId(params.restaurantId);

  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
  const body = await request.json();

  const nearbyRestaurants = await db.$runCommandRaw({
    geoNear: "Branch",
    near: { type: "Point", coordinates: [body.latitude, body.longitude] },
    spherical: true,
    maxDistance: 5000,
  });

  return new Response(JSON.stringify(nearbyRestaurants));
}