import { Router } from "express";
import { eventController } from "./event.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../../../generated/prisma";

const router = Router();

router.post("/", eventController.createEvent);

router.get(
  "/",
  auth(Role.DONOR, Role.ADMIN, Role.RECIPIENT),
  eventController.getEvents
);

router.get(
  "/:id",
  auth(Role.DONOR, Role.ADMIN, Role.RECIPIENT),
  eventController.getEvent
);

router.delete(
  "/:id",
  auth(Role.DONOR, Role.ADMIN),
  eventController.deleteEvent
);

export const eventRouter = router;
