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
  }
};

export default UsersHelper;
