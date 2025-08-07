import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthService.registerUser(req?.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});


export const userController = {
  registerUser
}