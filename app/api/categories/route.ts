import {
  createCategory,
  CategoryCreateRequest,
} from "@/services/category/categoryCreate";
import { deleteCategory } from "@/services/category/categoryDelete";
import { getCategoryList } from "@/services/category/categoryList";
import { updateCategory } from "@/services/category/categoryUpdate";

export async function GET(request: Request) {
  const data = await getCategoryList();

  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
  const body = await request.json();

  const data: CategoryCreateRequest = {
    name: body.name,
    type: body.type,
    imageUrl: body.imageUrl,
  };

  await createCategory(data);

  return new Response("Created");
}

export async function DELETE(request: Request) {
  const body = await request.json();

  console.log("Delete request API", body);
  await deleteCategory(body.id);

  return new Response("Deleted");
}

export async function PUT(request: Request) {
  const body = await request.json();

  await updateCategory(body);

  return new Response("Updated");
}
