import { z } from "zod";

const createDonorValidation = z.object({
  userId: z.string(),
  bloodType: z.enum(
    ["O_POS", "O_NEG", "A_POS", "A_NEG", "AB_POS", "AB_NEG", "B_POS", "B_NEG"],
    { message: "Invalid blood type." }
  ),
  healthInfo: z
    .string()
    .max(500, "Health info cannot exceed 500 characters")
    .optional(),
  availability: z.boolean().default(true),
  canTravel: z.boolean().default(false),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100),
  lastDonationDate: z.coerce.date().optional(),
});

export const donorValidation = {
  createDonorValidation,
};
