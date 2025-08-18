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

router.get(
  "/",
  auth(Role.DONOR, Role.ADMIN, Role.RECIPIENT),
  donorController.getDonor 
);

router.get(
  "/:id",
  auth(Role.DONOR, Role.ADMIN, Role.RECIPIENT),
  donorController.getADonor 
);

router.get(
  "/",
  auth(Role.DONOR, Role.ADMIN),
  donorController.deleteDonor 
);

export const donorRouter = router;
