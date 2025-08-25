import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { eventServices } from "./event.service";

const createEvent = catchAsync(async (req, res) => {
  const result = await eventServices.createEvent(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Event created successfully!",
    data: result,
  });
});

const getEvents = catchAsync(async (req, res) => {
  const result = await eventServices.getEvents();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Events retrieved successfully!",
    data: result,
  });
});

const getEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServices.getEvent(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event retrieved successfully!",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServices.deleteEvent(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event deleted successfully!",
    data: result,
  });
});

export const eventController = {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent,
};
