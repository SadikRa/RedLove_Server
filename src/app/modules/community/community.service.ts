import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import { Request } from "express";

const createCommunityPost = async (
  data: { name: string; message: string; email: string },
  req: Request
) => {
  const userEmail = req.user?.email;
  const { name, message, email } = data;

  if (userEmail !== email) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only post using your own account email."
    );
  }

  await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  // Create the community post
  const result = await prisma.community.create({
    data: {
      name,
      message,
      email,
    },
  });

  return result;
};

const findCommunityPost = async () => {
  const result = await prisma.community.findMany({
    orderBy: { createdAt: "desc" },
  });
  return result;
};

export const communityService = {
  createCommunityPost,
  findCommunityPost,
};
