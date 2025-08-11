import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const isUserExists = await prisma.user.findUnique({
    where: { email: payload.email, isDeleted: false },
  });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Account not found");
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isUserExists.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  const { password, ...userData } = isUserExists;

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_secret as Secret,
    config.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.refresh_token_secret as Secret,
    config.refresh_token_expires_in as string
  );
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const authServices = {
  loginUser,
};
