import { Router } from "express";
import {
  bulkDeleteTransactionsController,
  createTransactionController,
  deleteTransactionController,
  getTransactionByIdController,
  getTransactionsController,
  importTransactionsController,
  scanReceiptController,
  updateTransactionController,
  uploadTransactionReceiptController,
} from "../controllers/transaction.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  bulkDeleteTransactionsSchema,
  createTransactionSchema,
  getTransactionsQuerySchema,
  updateTransactionSchema,
} from "../validators/transaction.validator.js";
import { uploadCsvFile, uploadReceiptImage } from "../middleware/upload.middleware.js";

const router = Router();

router.use(authenticate);

router
  .route("/")
  .post(validate(createTransactionSchema), createTransactionController)
  .get(validate(getTransactionsQuerySchema, "query"), getTransactionsController);

router.post("/import", uploadCsvFile, importTransactionsController);

router.post(
  "/scan-receipt",
  uploadReceiptImage,
  scanReceiptController
);

router.delete(
  "/bulk",
  validate(bulkDeleteTransactionsSchema),
  bulkDeleteTransactionsController
);

router.post(
  "/:id/receipt",
  uploadReceiptImage,
  uploadTransactionReceiptController
);

router
  .route("/:id")
  .get(getTransactionByIdController)
  .patch(validate(updateTransactionSchema), updateTransactionController)
  .delete(deleteTransactionController);

export default router;