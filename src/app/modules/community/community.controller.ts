import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { communityService } from "./community.service";
import { Request } from "express";

const createCommunityPost = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await communityService.createCommunityPost(
    data,
    req as Request
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Community post create done",
    data: result,
  });
});

const findCommunityPost = catchAsync(async (req, res) => {
  const result = await communityService.findCommunityPost();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Community post find done",
    data: result,
  });
});

export const communityController = {
  createCommunityPost,
  findCommunityPost,
};
