import cloudinary from "../config/cloudinary.config.js";
import AppError from "../utils/app-error.js";

const convertBufferToDataUri = (file) => {
  const base64File = file.buffer.toString("base64");

  return `data:${file.mimetype};base64,${base64File}`;
};

export const uploadImageToCloudinary = async (file, folder = "finsentry") => {
  if (!file) {
    throw new AppError("Image file is required.", 400);
  }

  const fileDataUri = convertBufferToDataUri(file);

  const result = await cloudinary.uploader.upload(fileDataUri, {
    folder,
    resource_type: "image",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};