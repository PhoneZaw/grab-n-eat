import { z } from "zod";

export const branchCreateSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  latitude: z.union([z.string(), z.number()]).transform((val) => typeof val === "string" ? parseFloat(val) : val),
  longitude: z.union([z.string(), z.number()]).transform((val) => typeof val === "string" ? parseFloat(val) : val),
  restaurantId: z.string().min(1, "Restaurant ID is required"),
  imageUrl: z.string().url("Invalid image URL").optional().nullable(),
});

export type BranchCreateInput = z.infer<typeof branchCreateSchema>;
