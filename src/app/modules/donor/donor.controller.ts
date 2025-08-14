import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { donorService } from "./donor.service";

const createDonor = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await donorService.createDonor(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Donor profile created successfully",
    data: result,
  });
});

export const donorController = {
  createDonor,
};
