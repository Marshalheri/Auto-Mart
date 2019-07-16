import { compareSync } from 'bcryptjs';

import dbConfig from '../dbConfig';
import ApiErrors from '../Services/errorClass';
import UsersHelper from '../Helpers/userHelper';
import AuthorizeUser from '../Services/authorizer';
import { Constants } from '../Services';

const { hashPassword, generateToken, userErrorResponse } = UsersHelper;
const { verifyUser } = AuthorizeUser;
const { invalidToken, notAuthorizedMessage, supplyAuthHeader } = Constants;

const UsersModel = {

  // This is the function that will create a new user in the database...
  async createNewUserModel(req, res) {
    try {
      const {
        email, first_name, last_name, is_admin, address, phone_number, password,
      } = req.body;
      const newUserPassword = hashPassword(password);
      const createQuery = `INSERT INTO
      users(email, "first_name", "last_name", "is_admin", address, "phone_number", password)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, email, "first_name", "last_name", "is_admin", address, "phone_number"`;
      const values = [email, first_name, last_name, is_admin, address, phone_number, newUserPassword];
      const { rows } = await dbConfig.query(createQuery, values);
      const token = generateToken({ ...rows[0] });
      rows[0].token = token;
      return res.status(201).json({
        data: rows[0],
        message: `Successfully created ${first_name} ${last_name} as a new user`,
        status: 201,
      });
    } catch (err) {
      userErrorResponse(err, res);
      console.log(err);
    }
  },

  // This is the method that handles the request to login a user that exist on the database.....
  async loginUserModel(req, res) {
    try {
      const { email, password } = req.body;
      const validUser = await this.getUserByEmailModel(email);
      if (validUser == null || validUser == undefined) {
        const message = `There is no user with email: ${email} on the database`;
        throw new ApiErrors(message, 404);
      } else if (!compareSync(password, validUser.password)) {
        const message = 'The password entered is not correct';
        throw new ApiErrors(message, 404);
      } else {
        const token = generateToken({ ...validUser });
        res.status(200).json({
          data: {
            token,
            address: validUser.address,
            email: validUser.email,
            first_name: validUser.first_name,
            last_name: validUser.last_name,
            phone_number: validUser.phone_number,
          },
          message: 'Login successful',
          status: 200,
        });
      }
    } catch (err) {
      userErrorResponse(err, res);
    }
  },

  // This function returns all users stored in the database...
  async getAllUsersModel(req, res) {
    const { user_id } = req.params;
    const { authorization } = req.headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.is_admin == true) {
          const getUserQuery = 'SELECT * FROM users';
          const { rows } = await dbConfig.query(getUserQuery);
          if (rows.length == 0) {
            const message = 'There is no user currently in the database.';
            res.status(200).json({
              message,
              status: 200,
            });
          } else {
            res.status(200).json({
              data: rows,
              status: 200,
            });
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      userErrorResponse(err, res);
    }
  },

  // This function returns a user by its id...
  async getUserByIdModel(req, res) {
    const { user_id } = req.params;
    const { authorization } = req.headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.is_admin == true) {
          const getIdQuery = 'SELECT * FROM users WHERE id = $1';
          const { rows } = await dbConfig.query(getIdQuery, [user_id]);
          if (rows.length == 0) {
            const message = `The user with id: ${user_id} does not exist.`;
            throw new ApiErrors(message, 404);
          } else {
            res.status(200).json({
              data: rows[0],
              status: 200,
            });
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      userErrorResponse(err, res);
    }
  },

  // This function returns a user by its email...
  async getUserByEmailModel(email) {
    const getEmailQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await dbConfig.query(getEmailQuery, [email]);
    return rows[0];
  },

};

export default UsersModel;
