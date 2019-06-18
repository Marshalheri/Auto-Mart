import dbConfig from '../dbConfig';
import ApiErrors from '../Services/errorClass';
import UsersHelper from '../Helpers/userHelper';

const { hashPassword, generateToken } = UsersHelper;

export class UsersController {

  // This is the method that handles the request for a user to be signed up...
  async createNewUser (req, res) {
    try {
      const { email, firstName, lastName, isAdmin, address, phoneNumber, password } = req.body;
      const newUserPassword = hashPassword(password);
      const token = generateToken(email) ;
      const createText = 'INSERT INTO users(email,firstName,lastName,isAdmin,address,phoneNumber,password,token) RETURNING *';
      const values = [email, firstName, lastName, isAdmin, address, phoneNumber, newUserPassword, token];
      const { rows } = await dbConfig.query(createText, values);
      return res.status(201).json({
        message: `Successfully created ${firstName} ${lastName} as a new user`,
        status: 201,
      });
      console.log('am heeeeee');
    } catch (err) {
      res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || err.status,
      });
      console.log('hataata');
    }
  };
};
