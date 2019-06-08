"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Models = require("../Models");

var _jwtKey = require("../Key/jwtKey");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userDb = _Models.usersModel.userDb;
var jwtKey = _jwtKey.jwtKeyObj.jwtKey;
var UserHelper = {
  // This function checks if a user already exist in the database....
  isUserInDb: function isUserInDb(verifyUser) {
    var isPresent = false;
    userDb.some(function (eachUser) {
      if (eachUser.email === verifyUser.email) {
        isPresent = true;
      }
    });
    return isPresent;
  },
  // This function creates a new user.....
  createNewUser: function createNewUser(body) {
    var newUserId = userDb.length + 1;
    var newUserPassword = (0, _bcryptjs.hashSync)(body.password, (0, _bcryptjs.genSaltSync)(10));
    var newUserPayload = {
      id: newUserId,
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      password: newUserPassword,
      address: body.address,
      is_admin: body.is_admin,
      phone_number: body.phone_number,
      token: _jsonwebtoken["default"].sign({
        email: body.email
      }, jwtKey)
    }; // push the new user data into database

    userDb.push(newUserPayload);
    return newUserPayload;
  },
  // This function returns a user by searching for its id in the database....
  getUserById: function getUserById(user_id) {
    var user = null;
    userDb.some(function (eachUser) {
      if (eachUser.id == user_id) {
        user = eachUser;
      }
    });
    return user;
  },
  // This function returns a user whose email exist in the database....
  getUserByEmail: function getUserByEmail(email) {
    var user = null;
    userDb.some(function (eachUser) {
      if (eachUser.email === email) {
        user = eachUser;
      }
    });
    return user;
  }
};
var _default = UserHelper;
exports["default"] = _default;