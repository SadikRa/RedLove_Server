import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { eventServices } from "./event.service";

const createEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServices.createEvent(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "event deleted successfully!",
    data: result,
  });
});

const getevents = catchAsync(async (req, res) => {
  const result = await eventServices.getevents();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "events retrieved successfully!",
    data: result,
  });
});

const getAevent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServices.getAevent(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "event retrieved successfully!",
    data: result,
  });
});

const deleteevent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServices.deleteevent(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "event deleted successfully!",
    data: result,
  });
});


export const eventController = {
  createEvent,
  getevents,
  getAevent,
  deleteevent
};
