import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';

import { UsersController, CarsController, OrdersController } from './Controllers';
import { cloudinary_upload } from './Helpers/cloudinaryUpload';
import swaggerDoc from '../swagger.json';

const router = Router();
const usersController = new UsersController();
const carsController = new CarsController();
const ordersController = new OrdersController();
const imageUpload = cloudinary_upload();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Auto-Mart API',
    status: 200,
  });
});

// This is where the swagger file is served....
router.use('/', serve);
router.get('/api-docs', setup(swaggerDoc));

// These are the routes where the user authentication and creation will be handled...
router.post('/user-create', usersController.createNewUser);
router.post('/user-login', usersController.loginUser);
router.get('/user-all/:user_id', usersController.getUserById);
router.get('/user-all', usersController.getAllUsers);


// These are the routes that handles the creation and management of ad...
router.get('/car-all', carsController.getAllCars);
router.get('/car-all/:car_id', carsController.getCarById);
router.post('/car-create', imageUpload.single('image'), carsController.createNewCarAd);
router.patch('/car-update/price/:car_id', carsController.updateCarPice);
router.patch('/car-update/status/:car_id', carsController.updateCarSoldStatus);

// These are the routes that handles the creation and management of orders...
router.get('/order-all', ordersController.getAllOrders);
router.get('/order-all/:order_id', ordersController.getOrdersById);


export default router;
