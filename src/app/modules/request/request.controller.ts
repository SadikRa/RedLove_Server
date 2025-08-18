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

export const requestController = {
  createRequest,
};
