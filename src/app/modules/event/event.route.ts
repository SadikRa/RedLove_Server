import { Router } from "express";
import { eventController } from "./event.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../../../generated/prisma";

const router = Router();

router.post("/", eventController.createEvent);

router.get(
  "/",
  auth(Role.DONOR, Role.ADMIN, Role.RECIPIENT),
  eventController.getevents
);

router.get(
  "/:id",
  auth(Role.DONOR, Role.ADMIN, Role.RECIPIENT),
  eventController.getAevent
);

router.delete(
  "/:id",
  auth(Role.DONOR, Role.ADMIN),
  eventController.deleteevent
);

export const eventRouter = router;
