import { compareSync } from 'bcryptjs';

import dbConfig from '../dbConfig';
import ApiErrors from '../Services/errorClass';
import UsersHelper from '../Helpers/userHelper';
import AuthorizeUser from '../Services/authorizer'
import { Constants } from '../Services';

const { hashPassword, generateToken, userErrorResponse } = UsersHelper;
const { verifyUser } = AuthorizeUser;
const { notAuthorizedMessage, supplyAuthHeader } = Constants;

const UsersModel = {

//This is the function that will create a new user in the database...
  async createNewUserModel (req, res) {
    try {
      const { email, firstName, lastName, isAdmin, address, phoneNumber, password } = req.body;
      const newUserPassword = hashPassword(password);
      const createQuery = `INSERT INTO
      users(email, "firstName", "lastName", "isAdmin", address, "phoneNumber", password)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING email, "firstName", "lastName", "isAdmin", address, "phoneNumber"`;
      const values = [email, firstName, lastName, isAdmin, address, phoneNumber, newUserPassword];
      const { rows } = await dbConfig.query(createQuery, values);
      return res.status(201).json({
        message: `Successfully created ${firstName} ${lastName} as a new user`,
        status: 201,
      });
    } catch (err) {
      userErrorResponse(err, res);
    }
  },

// This is the method that handles the request to login a user that exist on the database....
  async loginUserModel (req, res) {
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
        const token = generateToken({...validUser}) ;
        res.status(200).json({
          data: {
            address: validUser.address,
            email: validUser.email,
            firstName: validUser.firstName,
            lastName: validUser.lastName,
            phoneNumber: validUser.phoneNumber,
            token,
          },
          message: 'Login successful',
          status: 200,
        });
      };
    } catch (err) {
      userErrorResponse(err, res);
    }
  },

//This function returns all users stored in the database...
  async getAllUsersModel (req, res) {
    const { user_id } = req.params;
    const { authorization } = req.headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader()
      } else {
        const user = await verifyUser(authorization, res);
        if (user.isAdmin == true) {
          const getEmailQuery = `SELECT * FROM users`;
          const { rows } = await dbConfig.query(getEmailQuery);
          if (rows.length == 0) {
            const message = `The is no user currently in the database.`;
            res.status(200).json({
              message: message,
              status: 200,
            });
          } else {
            res.status(200).json({
              data: rows,
              status: 200,
            });
          }
        }
        else {
          notAuthorizedMessage();
        }
      }
    } catch (err) {
      userErrorResponse(err, res);
    };
  },

//This function returns a user by its id...
  async getUserByIdModel (req, res) {
    const { user_id } = req.params;
    const { authorization } = req.headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.isAdmin == true) {
          const getIdQuery = `SELECT * FROM users WHERE id = $1`;
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
        }
        else {
          notAuthorizedMessage();
        }
      }
    } catch (err) {
        userErrorResponse(err, res);
    }
  },

//This function returns a user by its email...
  async getUserByEmailModel (email) {
    const getEmailQuery = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await dbConfig.query(getEmailQuery, [email]);
    return rows[0];
  }

};

export default UsersModel;
