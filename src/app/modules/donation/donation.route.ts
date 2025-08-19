import { Router } from "express";
import { donationController } from "./donation.controller";

const router = Router();

router.post("/", donationController.createDonation);

export const donationRouter = router;
