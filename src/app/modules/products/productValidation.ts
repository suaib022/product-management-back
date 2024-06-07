import { z } from 'zod';

const VariantValidationSchema = z.object({
  type: z.string().nonempty('Variant type is required'),
  value: z.string().nonempty('Variant value is required'),
});

const InventoryValidationSchema = z.object({
  quantity: z.number().min(0, 'Quantity must be a non-negative number'),
  inStock: z.boolean(),
});

const ProductValidationSchema = z.object({
  name: z.string().nonempty('Product name is required'),
  description: z.string().nonempty('Product description is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().nonempty('Category is required'),
  tags: z
    .array(z.string())
    .nonempty('Tags array must contain at least one tag'),
  variants: z
    .array(VariantValidationSchema)
    .nonempty('Variants array must contain at least one variant'),
  inventory: InventoryValidationSchema,
});

export default ProductValidationSchema;
