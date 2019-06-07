import { config } from 'dotenv';
import path from 'path';

config({
  path: path.join(__dirname, '/.env'),
});

export const environment = {
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
