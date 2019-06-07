import { hashSync, genSaltSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtKeyObj } from '../Key/jwtKey';

const { jwtKey } = jwtKeyObj;

const token = jwt.sign({ email: 'chizyberto@gmail.com' }, jwtKey);

export const usersModel = {
  userDb: [
    {
      id: 1,
      email: 'chizyberto@gmail.com',
      first_name: 'Chizoba',
      last_name: 'Nnamani',
      password: hashSync('adminpassword', genSaltSync(10)),
      address: '79, osho drive olodi apapa lagos',
      is_admin: true,
      phone_number: '+2348162956658',
      token,
    },
  ],
};
