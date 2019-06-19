import UsersModel from '../Models/usersModel';

export class UsersController {

  // This is the method that handles the request for a user to be signed up...
    createNewUser (req, res) {
      UsersModel.createNewUserModel(req, res);
  }
};
