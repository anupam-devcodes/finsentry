import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/app-error.js";
import asyncHandler from "../utils/async-handler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (
    !authorizationHeader ||
    !authorizationHeader.startsWith("Bearer ")
  ) {
    throw new AppError("Authentication required. Please log in.", 401);
  }

  const token = authorizationHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError("Invalid or expired authentication token.", 401);
  }

  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AppError("User associated with this token no longer exists.", 401);
  }

  req.user = user;

  next();
});

export default authenticate;