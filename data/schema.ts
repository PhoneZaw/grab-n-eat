import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const customerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  status: z.string(),
  orderCount: z.number(),
  cancelOrderCount: z.number(),
})

export type Customer = z.infer<typeof customerSchema>


// Branches
export const branchSchema = z.object({
  id: z.number(),
  name: z.string(),
  phoneNumber: z.string(),
  status: z.string(),
  orderCount: z.number(),
  cancelOrderCount: z.number(),
})

export type Branch = z.infer<typeof branchSchema>

// Restaurant
export const restaurantSchema = z.object({
  id: z.number(),
  name: z.string(),
  phoneNumber: z.string(),
  status: z.string(),
  branches: branchSchema.array(),
  orderCount: z.number(),
  cancelOrderCount: z.number(),
})

export type Restaurant = z.infer<typeof restaurantSchema>



// Category
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  status: z.string(),
  orderCount: z.number(),
  cancelOrderCount: z.number(),
})

export type Category = z.infer<typeof categorySchema>
