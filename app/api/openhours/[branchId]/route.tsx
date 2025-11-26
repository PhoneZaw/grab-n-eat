import { getOpenHourListByBranchId } from "@/services/openHour/openHourList";
import { updateOpenHour } from "@/services/openHour/openHourUpdate";

export async function GET(
  request: Request,
  { params }: { params: { branchId: string } }
): Promise<Response> {
  console.log("GET request params: ", params);
  const data = await getOpenHourListByBranchId(params.branchId);
  return Response.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();

  console.log("PUT request body: ", body);

  await updateOpenHour(body);

  return new Response("Open Hours Updated");
}
