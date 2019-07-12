import { Router } from 'express';

import {
  CarsController, OrdersController, UsersController,
} from '../PostgresDb/Controllers';
import { cloudinary_upload } from '../DataStructureDb/Helpers/cloudinaryUpload';

const router = Router();
const carsController = new CarsController();
const ordersController = new OrdersController();
const usersController = new UsersController();
const imageUpload = cloudinary_upload();

router.get('/', (req, res) => {
  res.status(200).json({
    availableUrls: [
      '/user-create', '/user-login', '/user-all/:user_id', '/user-all',
      '/car-all', '/car-all/:car_id', '/car-create', '/car-update/price/:car_id', '/car-update/status/:car_id',
      '/car-delete/:car_id', '/order-all', '/order-user-all', '/order-all/:order_id', '/order-create',
      '/order-update/amount/:order_id', '/order-update/status/:order_id',
    ],
    message: 'Welcome to the Auto-Mart API',
    status: 200,
  });
});

// These are the routes where the user authentication and creation will be handled...
router.post('/user-create', usersController.createNewUser);
router.post('/user-login', usersController.loginUser);
router.get('/user-all/:user_id', usersController.getUserById);
router.get('/user-all', usersController.getAllUsers);

// These are the routes that handles the creation and management of ad...
router.get('/car-all', carsController.getAllCars);
router.get('/car-all/:car_id', carsController.getCarById);
router.post('/car-create', imageUpload.single('image'), carsController.createNewCarAd);
router.patch('/car-update/price/:car_id', carsController.updateCarPrice);
router.patch('/car-update/status/:car_id', carsController.updateCarStatus);
router.delete('/car-delete/:car_id', carsController.deleteCar);

// These are the routes that handles the creation and management of orders...
router.get('/order-all', ordersController.getAllOrders);
router.get('/order-user-all', ordersController.getAllUserOrders);
router.get('/order-all/:order_id', ordersController.getOrdersById);
router.post('/order-create', ordersController.createNewCarOrder);
router.patch('/order-update/amount/:order_id', ordersController.updateOrderAmount);
router.patch('/order-update/status/:order_id', ordersController.updateOrderStatus);

export default router;
