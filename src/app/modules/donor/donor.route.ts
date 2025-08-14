import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { donorValidation } from "./donor.validation";
import auth from "../../middlewares/auth";
import { Role } from "../../../../generated/prisma";
import { donorController } from "./donor.controller";

const router = Router();

router.post(
  "/",
  auth(Role.DONOR, Role.ADMIN, Role.RECIPIENT),
  validateRequest(donorValidation.createDonorValidation),
  donorController.createDonor
);

export const donorRouter = router;
