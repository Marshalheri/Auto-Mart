import dbConfig from '../dbConfig';
import ApiErrors from '../Services/errorClass';
import UsersHelper from '../Helpers/userHelper';

const { hashPassword, generateToken, userErrorResponse } = UsersHelper;

const UsersModel = {

//This is the function that will create a new user in the database...
  async createNewUserModel (req, res) {
    try {
      const { email, firstName, lastName, isAdmin, address, phoneNumber, password } = req.body;
      const newUserPassword = hashPassword(password);
      const token = generateToken(email) ;
      const createQuery = `INSERT INTO
      users(email, "firstName", "lastName", "isAdmin", address, "phoneNumber", password, token)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING email, "firstName", "lastName", "isAdmin", address, "phoneNumber", token`;
      const values = [email, firstName, lastName, isAdmin, address, phoneNumber, newUserPassword, token];
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
  async loginUser(req, res) {
    try {

    } catch (err) {
      userErrorResponse(err, res);
    }
  }

};

export default UsersModel;
