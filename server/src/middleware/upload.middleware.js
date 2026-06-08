import multer from "multer";
import AppError from "../utils/app-error.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["text/csv", "application/vnd.ms-excel"];
  const isCsvMimeType = allowedMimeTypes.includes(file.mimetype);
  const isCsvExtension = file.originalname.toLowerCase().endsWith(".csv");

  if (isCsvMimeType || isCsvExtension) {
    cb(null, true);
  } else {
    cb(new AppError("Only CSV files are allowed.", 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export const uploadCsvFile = upload.single("file");