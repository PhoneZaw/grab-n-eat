import { z } from "zod";

export const menuCreateSchema = z.object({
  name: z.string().min(1, "Menu item name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid image URL"),
  price: z.union([z.string(), z.number()]).transform((val) => typeof val === "string" ? parseFloat(val) : val),
  restaurantId: z.string().min(1, "Restaurant ID is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

export type MenuCreateInput = z.infer<typeof menuCreateSchema>;
