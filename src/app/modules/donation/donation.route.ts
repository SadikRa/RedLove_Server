import { Router } from "express";
import { donationController } from "./donation.controller";

const router = Router();

router.post("/", donationController.createDonation);

router.get("/", donationController.getDonations);

router.get("/:id", donationController.getADonation);

router.delete("/:id", donationController.deleteDonation);

export const donationRouter = router;
