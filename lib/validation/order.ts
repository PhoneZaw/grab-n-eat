import { z } from "zod";

export const orderItemSchema = z.object({
  branchMenuId: z.string().min(1, "Branch menu ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  unitPrice: z.number().nonnegative("Unit price must be non-negative"),
  specialInstruction: z.string().optional().nullable(),
});

export const orderCreateSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  branchId: z.string().min(1, "Branch ID is required"),
  orderItems: z.array(orderItemSchema).min(1, "Order must have at least one item"),
  promotionCode: z.string().optional().nullable(),
  promotionDiscount: z.number().nonnegative().optional().nullable(),
  specialInstruction: z.string().optional().nullable(),
});

export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
