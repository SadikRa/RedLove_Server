import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../../shared/prisma";
import { BloodType } from "../../../../generated/prisma";



const createEvent = async (data: ) => {
  const { userId } = data;

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "User not found or account is deleted"
      );
    }

    const existingDonor = await tx.donorDetail.findUnique({
      where: { userId },
    });

    if (existingDonor) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Donor profile already exists for this user"
      );
    }

    return await tx.donorDetail.create({
      data: {
        userId,
        bloodType: data.bloodType,
        healthInfo: data.healthInfo || null,
        availability: data.availability ?? true,
        canTravel: data.canTravel ?? false,
        location: data.location,
        lastDonationDate: data.lastDonationDate
          ? new Date(data.lastDonationDate)
          : null,
      },
    });
  });
};


export const eventServices = {
 createEvent,
  getevents,
  getAevent,
  deleteevent
};
