import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { donationServices } from "./donation.service";

const createDonation = catchAsync(async (req, res) => {
  const result = await donationServices.createDonation(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "donation create done",
    data: result,
  });
});

export const donationController = {
  createDonation,
};
