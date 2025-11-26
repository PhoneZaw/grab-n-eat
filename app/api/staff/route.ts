import { createManager } from "@/services/staff/staffCreate";
import { deleteStaff } from "@/services/staff/staffDelete";
import { updateStaff } from "@/services/staff/updateStaff";

export async function POST(request: Request) {
  const body = await request.json();

  console.log(body);

  await createManager(body);

  return new Response("Created");
}

export async function PUT(request: Request) {
  const body = await request.json();

  await updateStaff(body);

  return new Response("Updated");
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await deleteStaff(body.id);

  return new Response("Deleted");
}
