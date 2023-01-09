import cloudinary from "cloudinary";
import configs from "../config/config";
import logger from "../utils/logger";

interface UploadResult {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  secure_url: string;
}

// cloudinary configuration
cloudinary.v2.config({ 
  cloud_name: configs.CLOUDINARY_CLOUD_NAME, 
  api_key: configs.CLOUDINARY_API_KEY, 
  api_secret: configs.CLOUDINARY_API_SECRET 
});

export const uploadImage = (imagePath: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(imagePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result?.secure_url);
      }
    });
  });
};