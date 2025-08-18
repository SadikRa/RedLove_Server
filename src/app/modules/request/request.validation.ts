import { z } from "zod";
import { BloodType, Status, UrgencyLevel } from "../../../../generated/prisma";

const createRequestValidation = z.object({
  requesterId: z.string().uuid({ message: "Invalid requester ID format" }),
  bloodType: z.nativeEnum(BloodType),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(200),
  urgency: z.nativeEnum(UrgencyLevel),
  status: z.nativeEnum(Status).default(Status.PENDING),
  patientName: z
    .string()
    .min(2, "Patient name must be at least 2 characters")
    .max(100),
  hospital: z.string().max(100).optional(),
  unitsNeeded: z.number().int().positive().default(1),
  caseDetails: z.string().max(500).optional(),
  contactPerson: z
    .string()
    .min(2, "Contact person name must be at least 2 characters")
    .max(100),
});

export const requestValidation = {
  createRequestValidation,
};
