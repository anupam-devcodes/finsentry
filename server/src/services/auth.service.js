import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import AppError from "../utils/app-error.js";
import generateToken from "../utils/generate-token.js";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("An account with this email already exists.", 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    profilePictureUrl: user.profilePictureUrl,
    createdAt: user.createdAt,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password.", 401);
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl,
    },
  };
};