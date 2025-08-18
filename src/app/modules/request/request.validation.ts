import { z } from "zod";

const createRequestValidation = z.object({
  id: z.string().uuid(),
  requesterId: z.string().uuid(),
  bloodType: z.enum([
    "A_POS",
    "A_NEG",
    "B_POS",
    "B_NEG",
    "AB_POS",
    "AB_NEG",
    "O_POS",
    "O_NEG",
  ]),
  location: z.string().min(3, "Location must be at least 3 characters"),
  urgency: z.enum(["PENDING", "URGENT", "COMPLETED", "CANCELLED"]), // adjust based on your Status enum
  status: z.enum(["PENDING", "URGENT", "COMPLETED", "CANCELLED"]),
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  hospital: z.string().optional(),
  unitsNeeded: z.number().min(1).default(1),
  caseDetails: z.string().optional(),
  contactPerson: z
    .string()
    .min(2, "Contact person name must be at least 2 characters"),
  createdAt: z.date().default(new Date()),
});

export const requestValidation = {
  createRequestValidation,
};
