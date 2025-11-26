import { createMenu, MenuCreateRequest } from "@/services/menu/menuCreate";
import { deleteMenu } from "@/services/menu/menuDelete";
import { getMenuListByRestaurantId } from "@/services/menu/menuList";
import { updateMenu } from "@/services/menu/menuUpdate";

export async function GET(
  request: Request,
  { params }: { params: { restaurantId: string } }
): Promise<Response> {
  console.log("Requested restaurantId: ", params.restaurantId);
  const data = await getMenuListByRestaurantId(params.restaurantId);

  console.log(data);

  return new Response(JSON.stringify(data));
}

export async function POST(
  request: Request,
  { params }: { params: { restaurantId: string } }
): Promise<Response> {
  const body = await request.json();

  const data: MenuCreateRequest = {
    name: body.name,
    description: body.description,
    imageUrl: body.imageUrl,
    price: body.price,
    restaurantId: params.restaurantId,
    categories: body.categories,
  };

  await createMenu(data);

  return new Response("Menu Created");
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await deleteMenu(body.id);

  return new Response("Menu Deleted");
}

export async function PUT(request: Request) {
  const body = await request.json();

  await updateMenu(body);

  return new Response("Menu Updated");
}
