import { hashSync, genSaltSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { environment } from '../../myEnvironment';

const { jwtSecret } = environment;

const UsersHelper = {

  // This function hashes the password of the user...
  hashPassword: (password) => {
    const newUserPassword = hashSync(password, genSaltSync(10));
    return newUserPassword;
  },

  // This function generates a token for the user...
  generateToken: ({ id, is_admin }) => {
    const token = jwt.sign({ user_id: id, is_admin }, jwtSecret);
    return token;
  },

  // This handles the response to an error....
  userErrorResponse: (err, res) => {
    let error;
    let statusCode;
    if (err.code == 23505 || err.constraint == 'users_email_key') {
      error = 'Email already exist in the database, please signup with a different email';
      statusCode = 400;
    } else {
      error = err.message;
    }
    res.status(err.statusCode || statusCode || 500).json({
      error,
      status: err.statusCode || statusCode || 500,
    });
  },
};

export default UsersHelper;
