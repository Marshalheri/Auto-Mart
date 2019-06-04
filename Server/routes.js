import { Router } from 'express';
import { UsersController } from './Controllers';

const router = Router();
const usersController = new UsersController();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Auto-Mart API',
    status: 200
  });
});

//This is the routes where the user authentication and creation is handled...
router.post('/create-user', usersController.createNewUser);
router.post('/login-user', usersController.loginUser);
router.get('/all-users/:user_id', usersController.getUserById);
router.get('/all-users', usersController.getAllUsers);

export default router;
