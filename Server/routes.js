import { Router } from 'express';
import { UsersController, CarsController } from './Controllers';

const router = Router();
const usersController = new UsersController();
const carsController = new CarsController();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Auto-Mart API',
    status: 200,
  });
});

// This is the routes where the user authentication and creation is handled...
router.post('/user-create', usersController.createNewUser);
router.post('/user-login', usersController.loginUser);
router.get('/user-all/:user_id', usersController.getUserById);
router.get('/user-all', usersController.getAllUsers);


// This are the routes that handles the creation of ad...
router.get('/car-all', carsController.getAllCars);
router.get('/car-all/:car_id', carsController.getCarById);
router.post('/car-create', carsController.createNewCarAd);
router.patch('/car-update/price/:car_id', carsController.updateCarPice);
router.patch('/car-update/status/:car_id', carsController.updateCarSoldStatus);


export default router;
