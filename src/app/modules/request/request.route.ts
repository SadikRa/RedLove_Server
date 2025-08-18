import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "../../../../generated/prisma";
import validateRequest from "../../middlewares/validateRequest";
import { requestValidation } from "./request.validation";
import { requestController } from "./request.controller";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.RECIPIENT),
  validateRequest(requestValidation.createRequestValidation),
  requestController.createRequest
);

export const requestRouter = router;
