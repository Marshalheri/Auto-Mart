import { hashSync, genSaltSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { usersModel } from '../Models';
import { jwtKeyObj } from '../Key/jwtKey';

const { userDb } = usersModel;
const { jwtKey } = jwtKeyObj;

const UserHelper = {
  // This function checks if a user already exist in the database....
  isUserInDb: (verifyUser) => {
    let isPresent = false;
    userDb.some((eachUser) => {
      if (eachUser.email === verifyUser.email) {
        isPresent = true;
      }
    });
    return isPresent;
  },

  // This function creates a new user.....
  createNewUser: (body) => {
    const newUserId = userDb.length + 1;
    const newUserPassword = hashSync(body.password, genSaltSync(10));
    const newUserPayload = {
      id: newUserId,
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      password: newUserPassword,
      address: body.address,
      is_admin: body.is_admin,
      phone_number: body.phone_number,
      token: jwt.sign({ email: body.email }, jwtKey),
    };

    // push the new user data into database
    userDb.push(newUserPayload);
    return newUserPayload;
  },

  // This function returns a user by searching for its id in the database....
  getUserById: (user_id) => {
    let user = null;
    userDb.some((eachUser) => {
      if (eachUser.id == user_id) {
        user = eachUser;
      }
    });
    return user;
  },

  // This function returns a user whose email exist in the database....
  getUserByEmail: (email) => {
    let user = null;
    userDb.some((eachUser) => {
      if (eachUser.email === email) {
        user = eachUser;
      }
    });
    return user;
  },
};


export default UserHelper;
