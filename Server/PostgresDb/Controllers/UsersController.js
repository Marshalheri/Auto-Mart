import UsersModel from '../Models/usersModel';

export class UsersController {
  // This is the method that handles the request for a user to be signed up...
  createNewUser(req, res) {
    UsersModel.createNewUserModel(req, res);
  }

  // This is the method that handles the request to login a user that exist on the database....
  loginUser(req, res) {
    UsersModel.loginUserModel(req, res);
  }

  // This is the method that handles the request to get all user...
  getAllUsers(req, res) {
    UsersModel.getAllUsersModel(req, res);
  }

  // This is the method that handles the request to get user by id....
  getUserById(req, res) {
    UsersModel.getUserByIdModel(req, res);
  }
}
