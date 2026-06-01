import { registerUser } from "../services/auth.service.js";
import asyncHandler from "../utils/async-handler.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: {
      user,
    },
  });
});