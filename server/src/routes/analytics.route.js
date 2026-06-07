import { Router } from "express";
import { getDashboardAnalyticsController } from "../controllers/analytics.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/dashboard", getDashboardAnalyticsController);

export default router;