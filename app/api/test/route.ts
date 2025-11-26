import { createDefaultOpenHours } from "@/services/openHour/openHourCreate";

export async function GET(request: Request) {
  const data = await createDefaultOpenHours("67387cb3d4a39ec954bae2bd");

  return Response.json("data");
}
