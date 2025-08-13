import { Router } from "express";
import { communityController } from "./community.controller";
import validateRequest from "../../middlewares/validateRequest";
import communityValidation from "./community.validation";
import auth from "../../middlewares/auth";
import { Role } from "../../../../generated/prisma";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.DONOR, Role.RECIPIENT),
  validateRequest(communityValidation.createCommunityPost),
  communityController.createCommunityPost
);

router.get("/", communityController.findCommunityPost);

export const communityRouter = router;
