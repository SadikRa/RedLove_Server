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

const getDonor = async () => {
  const donor = await prisma.donorDetail.findMany({
    where: {},
    include: { user: true },
  });

  if (!donor) {
    throw new AppError(httpStatus.NOT_FOUND, "Donor profile not found");
  }

  return donor;
};

const getADonor = async (userId: string) => {
  const donor = await prisma.donorDetail.findUnique({
    where: { userId },
    include: { user: true }, // ✅ if you want user info also
  });

  if (!donor) {
    throw new AppError(httpStatus.NOT_FOUND, "Donor profile not found");
  }

  return donor;
};

const deleteDonor = async (userId: string) => {
  const donor = await prisma.donorDetail.findUnique({ where: { userId } });

  if (!donor) {
    throw new AppError(httpStatus.NOT_FOUND, "Donor profile not found");
  }

  await prisma.donorDetail.delete({ where: { userId } });

  return { message: "Donor profile deleted successfully" };
};

export const donorService = {
  createDonor,
  getDonor,
  getADonor,
  deleteDonor,
};
