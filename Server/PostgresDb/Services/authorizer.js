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
        var authToken = token.replace(/Bearer| /gi, ''); //returns the token with out the Bearer string...
        console.log(authToken);
        jwt.verify(authToken, jwtSecret, async (err, payload) => {
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
