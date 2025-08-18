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
  role: Role;
}

const registerUser = async (payload: IUserPayload) => {
  const { name, email, password, phone, profileImage, bio, role } = payload;

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
      role: role,
    },
  });

  return createdUser;
};

const getUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const deleteUser = async (id: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  return prisma.user.delete({
    where: { id },
  });
};

export const userService = {
  registerUser,
  getUsers,
  deleteUser,
};
