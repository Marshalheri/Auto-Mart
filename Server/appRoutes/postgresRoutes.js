import { Router } from 'express';

import {
  CarsController, FlagsController, OrdersController, UsersController,
} from '../PostgresDb/Controllers';
import { cloudinary_upload } from '../DataStructureDb/Helpers/cloudinaryUpload';

const router = Router();
const carsController = new CarsController();
const ordersController = new OrdersController();
const usersController = new UsersController();
const flagsController = new FlagsController();
const imageUpload = cloudinary_upload();

router.get('/', (req, res) => {
  res.status(200).json({
    availableUrls: [
      '/auth/signup', '/auth/signin', '/user-all/:user_id', '/user-all',
      '/car', '/car/:car_id', '/car-create', '/car/:car_id/price', '/car/:car_id/status',
      '/car/:car_id', '/order-all', '/order-user-all', '/order-all/:order_id', '/order-create',
      '/order/:order_id/price', '/order/:order_id/status', '/order/:order_id',
      'flag-all', 'flag-all/:flag_id', 'flag-create'
    ],
    message: 'Welcome to the Auto-Mart API',
    status: 200,
  });
});

// These are the routes where the user authentication and creation will be handled...
router.post('/auth/signup', usersController.createNewUser);
router.post('/auth/signin', usersController.loginUser);
router.get('/user-all/:user_id', usersController.getUserById);
router.get('/user-all', usersController.getAllUsers);

// These are the routes that handles the creation and management of ad...
router.get('/car', carsController.getAllCars);
router.get('/car/:car_id', carsController.getCarById);
router.post('/car-create', imageUpload.single('image'), carsController.createNewCarAd);
router.patch('/car/:car_id/price', carsController.updateCarPrice);
router.patch('/car/:car_id/status', carsController.updateCarStatus);
router.delete('/car/:car_id', carsController.deleteCar);

// These are the routes that handles the creation and management of orders...
router.get('/order', ordersController.getAllOrders);
router.get('/order-user-all', ordersController.getAllUserOrders);
router.get('/order-all/:order_id', ordersController.getOrdersById);
router.post('/order-create', ordersController.createNewCarOrder);
router.patch('/order/:order_id/price', ordersController.updateOrderAmount);
router.patch('/order/:order_id/status', ordersController.updateOrderStatus);
router.delete('/order/:order_id', ordersController.deleteOrder);

// These are the routes that handles the creation and management of flags...
router.get('/flag-all', flagsController.getAllFlags);
router.get('/flag-all/:flag_id', flagsController.getFlagsById);
router.post('/flag-create', flagsController.createNewFlag);

export default router;
