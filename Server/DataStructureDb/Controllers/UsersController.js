import { compareSync } from 'bcryptjs';

import { usersModel } from '../Models';
import ApiErrors from '../Helpers/errorClass';
import UserHelper from '../Helpers/userHelper';

const { userDb } = usersModel;
const {
  isUserInDb, createNewUser, getUserById, getUserByEmail,
} = UserHelper;

export class UserController {
  // This is the method that handles the request for a user to be signed up...
  createNewUser(req, res) {
    try {
      const { body } = req;
      // First check if the email of the new user already exist in the database...
      if (isUserInDb(body) == true) {
        const message = 'Email already exist in the database, please use a different email';
        throw new ApiErrors(message, 400);
      } else {
        const createdUser = createNewUser(body);
        res.status(201).json({
          message: `Successfully created ${createdUser.first_name} ${createdUser.last_name} as a new user`,
          status: 201,
        });
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || err.status,
      });
    }
  }

  // This is the method that handles the request to login a user that exist on the database....
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const validUser = getUserByEmail(email);
      if (validUser == null || validUser == undefined) {
        const message = `There is no user with email: ${email} on the database`;
        throw new ApiErrors(message, 404);
      } else if (!compareSync(password, validUser.password)) {
        const message = 'The password entered is not correct';
        throw new ApiErrors(message, 404);
      } else {
        res.status(200).json({
          data: {
            address: validUser.address,
            email: validUser.email,
            first_name: validUser.first_name,
            last_name: validUser.last_name,
            phone_number: validUser.phone_number,
            token: validUser.token,
          },
          message: 'Login successful',
          status: 200,
        });
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || err.status,
      });
    }
  }

  // This is the method that handles the request to get user by id....
  getUserById(req, res) {
    try {
      const { user_id } = req.params;
      const userById = getUserById(user_id);
      if (userById != null || userById != undefined) {
        res.status(200).json({
          data: userById,
          status: 200,
        });
      } else {
        const message = `The user with id: ${user_id} does not exist.`;
        throw new ApiErrors(message, 404);
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || err.status,
      });
    }
  }

  // This is the method that handles the request to get all the users that exist in the database....
  getAllUsers(req, res) {
    try {
      res.status(200).json({
        data: userDb,
        status: 200,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        status: 500,
      });
    }
  }
}
