import { Router } from "express";
import {
  createTransactionController,
  deleteTransactionController,
  getTransactionByIdController,
  getTransactionsController,
  updateTransactionController,
} from "../controllers/transaction.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createTransactionSchema,
  getTransactionsQuerySchema,
  updateTransactionSchema,
} from "../validators/transaction.validator.js";

const router = Router();

router.use(authenticate);

router
  .route("/")
  .post(validate(createTransactionSchema), createTransactionController)
  .get(validate(getTransactionsQuerySchema, "query"), getTransactionsController);

router
  .route("/:id")
  .get(getTransactionByIdController)
  .patch(validate(updateTransactionSchema), updateTransactionController)
  .delete(deleteTransactionController);

export default router;