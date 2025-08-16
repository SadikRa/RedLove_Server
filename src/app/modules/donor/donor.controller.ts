import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { donorService } from "./donor.service";

const createDonor = catchAsync(async (req: Request, res: Response) => {
  const result = await donorService.createDonor(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Donor profile created successfully",
    data: result,
  });
});

const getDonor = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await donorService.getDonor(userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donor profile fetched successfully",
    data: result,
  });
});

const deleteDonor = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await donorService.deleteDonor(userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result.message,
    data: result
  });
});

export const donorController = {
  createDonor,
  getDonor,
  deleteDonor,
};
