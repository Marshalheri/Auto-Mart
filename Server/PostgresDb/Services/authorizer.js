import jwt from 'jsonwebtoken';

import { environment } from '../../myEnvironment';
import dbConfig from '../dbConfig';
import ApiErrors from './errorClass';
import UsersHelper from '../Helpers/userHelper';

const { userErrorResponse } = UsersHelper;

const { jwtSecret } = environment;

const AuthorizeUser = {

  async verifyUser(token, res) {
    return new Promise((resolve) => {
      try {
        jwt.verify(token, jwtSecret, async (err, payload) => {
          if (err || !payload) {
            resolve(err);
          } else if (Object.getOwnPropertyNames(payload).length === 0) {
            const message = 'Signup or Sign-in to perform this action.';
            throw new ApiErrors(message, 401);
          } else {
            resolve(payload);
          }
        });
      } catch (err) {
        userErrorResponse(err, res);
      }
    });
  },
};


export default AuthorizeUser;
