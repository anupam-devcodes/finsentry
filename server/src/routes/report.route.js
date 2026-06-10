import express from "express";

import {
  generateMonthlyReportController,
  sendMonthlyReportController,
} from "../controllers/report.controller.js";
import { monthlyReportRequestSchema } from "../validators/report.validator.js";
import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/monthly/generate",
  validate(monthlyReportRequestSchema),
  generateMonthlyReportController
);

router.post(
  "/monthly/send",
  validate(monthlyReportRequestSchema),
  sendMonthlyReportController
);

export default router;