import { Router } from "express";
import {
  createTransactionController,
  getTransactionsController,
} from "../controllers/transaction.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createTransactionSchema } from "../validators/transaction.validator.js";

const router = Router();

router.use(authenticate);

router
  .route("/")
  .post(validate(createTransactionSchema), createTransactionController)
  .get(getTransactionsController);

export default router;