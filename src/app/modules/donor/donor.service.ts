import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../../shared/prisma";
import { BloodType } from "../../../../generated/prisma";

interface ICreateDonor {
  userId: string;
  bloodType: BloodType;
  healthInfo?: string | null;
  availability?: boolean;
  canTravel?: boolean;
  location: string;
  lastDonationDate?: Date;
}

const createDonor = async (data: ICreateDonor) => {
  console.log(data);
  const { userId } = data;

  // Transaction for data consistency
  return await prisma.$transaction(async (tx) => {
    // Check user exists and is not deleted
    const user = await tx.user.findUnique({
      where: {
        id: userId,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "User not found or account is deleted"
      );
    }

    // Check if donor profile already exists
    const existingDonor = await tx.donorDetail.findUnique({
      where: { userId },
    });

    if (existingDonor) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Donor profile already exists for this user"
      );
    }

    // Create donor profile
    return await tx.donorDetail.create({
      data: {
        userId,
        bloodType: data.bloodType,
        healthInfo: data.healthInfo || null,
        availability: data.availability ?? true,
        canTravel: data.canTravel ?? false,
        location: data.location,
        lastDonationDate: data.lastDonationDate
          ? new Date(data.lastDonationDate) // ✅ Convert string to Date
          : null,
      },
    });
  });
};

export const donorService = {
  createDonor,
};
