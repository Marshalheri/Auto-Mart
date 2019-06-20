import { Router } from 'express';

import {
  UsersController
} from '../PostgresDb/Controllers';
import { cloudinary_upload } from '../DataStructureDb/Helpers/cloudinaryUpload';

const router = Router();
const userController = new UsersController();

router.get('/', (req, res) => {
  res.status(200).json({
    availableUrls: [
      '/user-create', '/user-login', '/user-all/:user_id', '/user-all',
      '/car-all', '/car-all/:car_id', '/car-create', '/car-update/price/:car_id', '/car-update/status/:car_id',
      '/car-delete/:car_id', '/order-all', '/order-all/:order_id', '/order-create',
      '/order-update/amount/:order_id', '/order-update/status/:order_id',
    ],
    message: 'Welcome to the Auto-Mart API',
    status: 200,
  });
});

// These are the routes where the user authentication and creation will be handled...
router.post('/user-create', userController.createNewUser);
router.post('/user-login', userController.loginUser);
router.get('/user-all/:user_id', userController.getUserById);
router.get('/user-all', userController.getAllUsers);

export default router;
