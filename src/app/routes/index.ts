import express from "express";
import { userRouter } from "../modules/user/user.route";
import { authRouter } from "../modules/auth/auth.route";
import { communityRouter } from "../modules/community/community.router";
import { donorRouter } from "../modules/donor/donor.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/community",
    route: communityRouter,
  },
  {
    path: "/donor",
    route: donorRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
