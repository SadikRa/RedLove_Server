// import  Router  from "express";

import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.registerUser);

export const userRouter = router;
