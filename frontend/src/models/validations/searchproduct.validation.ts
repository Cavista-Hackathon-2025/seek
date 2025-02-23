import { z } from "zod"

export const searchProductValidationSchema = z.object({
    product: z.string({ required_error: "Product is required", invalid_type_error: "Invalid name" }),
})

export type searchProductFormDef = z.infer<
  typeof searchProductValidationSchema
>;