import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServices.deleteDonation(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation deleted successfully!",
    data: result,
  });
});

export const eventController = {
  createEvent,
};
