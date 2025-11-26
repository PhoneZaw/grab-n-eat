import { createReview } from "@/services/review/createReview";

export async function POST(req: Request) {
  const body = await req.json();
  const { orderCode, rating, review } = body;

  console.log("Create Review API - Body", body);
  try {
    await createReview({ orderCode, rating, review });
    return new Response("Review created", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 400 });
  }
}
