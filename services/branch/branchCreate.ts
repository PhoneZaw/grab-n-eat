import db from "@/lib/db";
import { createDefaultOpenHours } from "../openHour/openHourCreate";
import { branchCreateSchema, BranchCreateInput } from "@/lib/validation/branch";

export type BranchCreateRequest = BranchCreateInput;

export async function createBranch(data: BranchCreateRequest) {
  const validation = branchCreateSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(`Validation failed: ${validation.error.message}`);
  }

  const validatedData = validation.data;

  try {
    return await db.$transaction(async (tx) => {
      const response = await tx.branch.create({
        data: {
          name: validatedData.name,
          description: validatedData.description,
          address: validatedData.address,
          contactNumber: validatedData.contactNumber,
          imageUrl: validatedData.imageUrl,
          latitude: validatedData.latitude,
          longitude: validatedData.longitude,
          restaurantId: validatedData.restaurantId,
          status: "ACTIVE",
        },
      });

      const menus = await tx.menu.findMany({
        where: {
          restaurantId: validatedData.restaurantId,
        },
      });

      if (menus.length !== 0) {
        await tx.branchMenu.createMany({
          data: menus.map((m) => {
            return {
              branchId: response.id,
              menuId: m.id,
              price: m.price,
              isActive: true,
            };
          }),
        });
      }

      // Create opening hours for the branch
      // Note: createDefaultOpenHours should ideally accept the tx client to be fully atomic
      await createDefaultOpenHours(response.id);
      
      return response;
    });
  } catch (error) {
    console.error("Failed to create branch:", error);
    throw error;
  }
}
