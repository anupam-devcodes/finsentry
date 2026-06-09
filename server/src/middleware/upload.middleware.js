import multer from "multer";
import AppError from "../utils/app-error.js";

const storage = multer.memoryStorage();

const csvFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["text/csv", "application/vnd.ms-excel"];
  const isCsvMimeType = allowedMimeTypes.includes(file.mimetype);
  const isCsvExtension = file.originalname.toLowerCase().endsWith(".csv");

  if (isCsvMimeType || isCsvExtension) {
    cb(null, true);
  } else {
    cb(new AppError("Only CSV files are allowed.", 400), false);
  }
};

const imageFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const isAllowedImage = allowedMimeTypes.includes(file.mimetype);

  if (isAllowedImage) {
    cb(null, true);
  } else {
    cb(new AppError("Only JPG, PNG, and WEBP images are allowed.", 400), false);
  }
};

const csvUpload = multer({
  storage,
  fileFilter: csvFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

const imageUpload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadCsvFile = csvUpload.single("file");

export const uploadReceiptImage = imageUpload.single("file");