import { config } from 'dotenv';
import path from 'path';

config();

export const environment = {
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  jwtSecret: process.env.JWTSECRET,
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgPassword: process.env.PGPASSWORD,
  pgDatabase: process.env.PGDATABASE,
  pgPort: process.env.PGPORT,
  testToken: process.env.TESTTOKEN,
  testErrToken: process.env.TESTERRORTOKEN,
};
