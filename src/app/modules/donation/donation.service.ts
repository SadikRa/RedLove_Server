import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

interface IDonation {
  requestId?: string; 
  donorId: string;
  location: string;
}

const createDonation = async (data: IDonation) => {
  const { requestId, donorId, location } = data;

  return await prisma.$transaction(async (tx) => {
    const donor = await tx.user.findUnique({
      where: {
        id: donorId,
        isDeleted: false,
      },
    });

    if (!donor) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Donor not found or account is inactive"
      );
    }

    if (requestId) {
      const request = await tx.bloodRequest.findUnique({
        where: { id: requestId },
      });

      if (!request) {
        throw new AppError(httpStatus.NOT_FOUND, "Blood request not found");
      }
    }

    const donation = await tx.donation.create({
      data: {
        donorId,
        requestId: requestId ?? null,
        location,
      },
      include: {
        donor: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
        ...(requestId && {
          request: {
            include: {
              requester: {
                select: {
                  id: true,
                  name: true,
                  phone: true,
                  email: true,
                },
              },
            },
          },
        }),
      },
    });

    return donation;
  });
};

const getDonations = async () => {
  const donations = await prisma.donation.findMany({});
  return donations;
};

const getADonation = async (id: string) => {
  const donation = await prisma.donation.findUnique({
    where: { id },
  });

  if (!donation) {
    throw new AppError(httpStatus.NOT_FOUND, "Donation not found!");
  }

  return donation;
};

const deleteDonation = async (id: string) => {
  await prisma.donation.findUniqueOrThrow({
    where: { id },
  });

  const deleted = await prisma.donation.delete({
    where: { id },
  });

  return deleted;
};

export const donationServices = {
  createDonation,
  deleteDonation,
  getADonation,
  getDonations,
};
