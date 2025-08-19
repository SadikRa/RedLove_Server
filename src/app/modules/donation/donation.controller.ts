import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { donationServices } from "./donation.service";
import { Request, Response } from "express";

const createDonation = catchAsync(async (req, res) => {
  const result = await donationServices.createDonation(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "donation create done",
    data: result,
  });
});

const getDonations = catchAsync(async (req: Request, res: Response) => {
  const result = await donationServices.getDonations();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donations retrieved successfully!",
    data: result,
  });
});

const getADonation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await donationServices.getADonation(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation retrieved successfully!",
    data: result,
  });
});

const deleteDonation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await donationServices.deleteDonation(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation deleted successfully!",
    data: result,
  });
});

export const donationController = {
  createDonation,
  getADonation,
  deleteDonation,
  getDonations,
};
