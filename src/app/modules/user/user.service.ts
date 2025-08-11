import httpStatus from "http-status";
import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import prisma from "../../../shared/prisma";
import { Role } from "../../../../generated/prisma";

interface IUserPayload {
  name?: string;
  email: string;
  password: string;
  phone: string;
  profileImage?: string;
  bio?: string;
}

const registerUser = async (payload: IUserPayload) => {
  const { name, email, password, phone, profileImage, bio } = payload;

  if (!email || !password || !phone) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email, password, and phone are required."
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email format.");
  }

  const isAccountExists = await prisma.user.findUnique({
    where: { email },
  });

  if (isAccountExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Account already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      name: name ?? null,
      email,
      password: hashedPassword,
      phone,
      profileImage: profileImage ?? null,
      bio: bio ?? null,
      role: Role.DONOR,
    },
  });

  return createdUser;
};

export const userService = {
  registerUser,
};
