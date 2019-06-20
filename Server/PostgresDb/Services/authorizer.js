import jwt from 'jsonwebtoken';

import { environment } from '../../myEnvironment';
import dbConfig from '../dbConfig';
import ApiErrors from './errorClass';
import UsersHelper from '../Helpers/userHelper';

const { userErrorResponse } = UsersHelper;

const { jwtSecret } = environment;

const AuthorizeUser = {

  async verifyUser (token, res) {
    return new Promise( resolve => {
      try {
        jwt.verify(token, jwtSecret, async (err, payload) => {
          if (err || !payload) {
            resolve(err);
          } else {
            const getIdQuery = `SELECT * FROM users WHERE id = $1`;
            const { rows } = await dbConfig.query(getIdQuery, [payload.userId]);
            if (rows.length == 0) {
              const message = 'Signup or Sign-in to perform this action.';
              throw new ApiErrors(message, 401);
            } else {
              resolve(rows[0]);
            };
          };
        });
      } catch (err) {
        userErrorResponse(err, res);
      }
    });
  }
}


export default AuthorizeUser;
