import db from "../../lib/db";

export type StaffListResponse = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  branchId: string;
  branchName: string;
  status: string;
};

export async function getManagersByRestaurantId(
  restaurantId: string
): Promise<StaffListResponse[]> {
  var staff = await db.user.findMany({
    include: {
      branch: true,
    },
    where: {
      role: "MANAGER",
      branch: {
        restaurantId: restaurantId,
      },
    },
  });

  return staff.map((c) => {
    return {
      id: c.id,
      name: c.name,
      email: c.email,
      phoneNumber: c.phoneNumber,
      branchId: c.branch?.id || "",
      branchName: c.branch?.name || "",
      status: c.status,
    };
  });
}
