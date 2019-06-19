import { hashSync, genSaltSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { jwtKeyObj } from '../../Key/jwtKey';

const { jwtKey } = jwtKeyObj;

const UsersHelper = {

  //This function hashes the password of the user...
  hashPassword: (password) => {
    const newUserPassword = hashSync(password, genSaltSync(10));
    return newUserPassword;
  },

  //This function generates a token for the user...
  generateToken: (email) => {
    const token = jwt.sign({ email: email }, jwtKey);
    return token;
  },

  //This handles the response to an error....
  userErrorResponse: (err, res) => {
    var message;
    var statusCode
    if (err.code == 23505 || err.constraint == 'users_email_key') {
       message = 'Email already exist in the database, please signup with a different email';
       statusCode = 400;
    } else {
      message = err.message;
    }
    res.status(statusCode || 500).json({
      message: message,
      status: statusCode || 500,
    });
  }
};

export default UsersHelper;
