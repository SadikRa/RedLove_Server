import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../../shared/prisma";
import { BloodType, Status, UrgencyLevel } from "../../../../generated/prisma";

interface ICreateBloodRequest {
  requesterId: string;
  bloodType: BloodType;
  location: string;
  urgency: UrgencyLevel;
  status?: Status;
  patientName: string;
  hospital?: string;
  unitsNeeded?: number;
  caseDetails?: string;
  contactPerson: string;
}

const createRequest = async (data: ICreateBloodRequest) => {
  const { requesterId } = data;

  return await prisma.$transaction(async (tx) => {
    // Verify requester exists and is active
    const user = await tx.user.findUnique({
      where: {
        id: requesterId,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Requester not found or account is inactive"
      );
    }

    // Create the request
    return await tx.bloodRequest.create({
      data: {
        requesterId,
        bloodType: data.bloodType,
        location: data.location,
        urgency: data.urgency,
        status: data.status ?? Status.PENDING,
        patientName: data.patientName,
        hospital: data.hospital ?? null,
        unitsNeeded: data.unitsNeeded ?? 1,
        caseDetails: data.caseDetails ?? null,
        contactPerson: data.contactPerson,
      },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  });
};

const getRequests = async () => {
  return await prisma.bloodRequest.findMany({
    include: { requester: true },
  });
};

const getARequest = async (id: string) => {
  const request = await prisma.bloodRequest.findUnique({
    where: { id },
    include: { requester: true },
  });

  if (!request) {
    throw new AppError(httpStatus.NOT_FOUND, "Request not found");
  }

  return request;
};


export const requestService = {
  createRequest,
  getRequests,
  getARequest,
  deleteRequest,
};
