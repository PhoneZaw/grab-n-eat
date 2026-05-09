import { z } from "zod";

export const restaurantCreateSchema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  email: z.string().email("Invalid email address"),
});

export type RestaurantCreateInput = z.infer<typeof restaurantCreateSchema>;
