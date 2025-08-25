import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../../shared/prisma";

interface ICreateEvent {
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  organizer: string;
  maxDonors?: number;
  location: string;
}

const createEvent = async (data: ICreateEvent) => {
    
  return await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      organizer: data.organizer,
      maxDonors: data.maxDonors,
      location: data.location,
    },
  });
};

const getEvents = async () => {
  const events = await prisma.event.findMany({
    where: {},
    orderBy: { createdAt: 'desc' },
  });

  return events;
};

const getEvent = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }

  return event;
};

const deleteEvent = async (id: string) => {
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }

  await prisma.event.delete({ where: { id } });

  return { message: "Event deleted successfully" };
};

export const eventServices = {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent,
};