import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), register);

export default router;