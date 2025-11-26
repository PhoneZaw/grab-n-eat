import { getFooterData } from "@/services/footer/getFooter";

export async function GET(request: Request) {
  const data = await getFooterData();

  return Response.json(data);
}
