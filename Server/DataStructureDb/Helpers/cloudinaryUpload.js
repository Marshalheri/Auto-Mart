import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import { environment } from '../../myEnvironment';

const {
  cloudinary_cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret,
} = environment;

cloudinary.config({
  cloudinary_cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret,
});

const cloudinary_storage = cloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png', 'jpeg'],
});

export const cloudinary_upload = () => multer({ cloudinary_storage });
