import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { requestService } from "./request.service";

const createRequest = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await requestService.createRequest(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "request create done",
    data: result,
  });
});

const getRequests = catchAsync(async (req, res) => {
  const result = await requestService.getRequests();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "request profile fetched successfully",
    data: result,
  });
});

const getARequest = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await requestService.getARequest(userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "request profile fetched successfully",
    data: result,
  });
});

const deleteRequest = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await requestService.deleteRequest(userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result.message,
    data: result,
  });
});

export const requestController = {
  createRequest,
  getRequests,
  getARequest,
  deleteRequest,
};
