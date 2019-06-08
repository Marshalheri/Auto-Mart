"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersController = void 0;

var _bcryptjs = require("bcryptjs");

var _Models = require("../Models");

var _errorClass = _interopRequireDefault(require("../Helpers/errorClass"));

var _userHelper = _interopRequireDefault(require("../Helpers/userHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userDb = _Models.usersModel.userDb;

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, [{
    key: "createNewUser",
    // This is the method that handles the request for a user to be signed up...
    value: function createNewUser(req, res) {
      try {
        var body = req.body; // First check if the email of the new user already exist in the database...

        if (_userHelper["default"].isUserInDb(body) == true) {
          var message = 'Email already exist in the database, please use a different email';
          throw new _errorClass["default"](message, 400);
        } else {
          var createdUser = _userHelper["default"].createNewUser(body);

          res.status(201).json({
            message: "Successfully created ".concat(createdUser.first_name, " ").concat(createdUser.last_name, " as a new user"),
            status: 201
          });
        }
      } catch (err) {
        res.status(err.statusCode || 500).json({
          message: err.message,
          status: err.statusCode || err.status
        });
      }
    } // This is the method that handles the request to login a user that exist on the database....

  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, email, password, validUser, message, _message;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                validUser = _userHelper["default"].getUserByEmail(email);

                if (!(validUser == null || validUser == undefined)) {
                  _context.next = 8;
                  break;
                }

                message = "There is no user with email: ".concat(email, " on the database");
                throw new _errorClass["default"](message, 404);

              case 8:
                if ((0, _bcryptjs.compareSync)(password, validUser.password)) {
                  _context.next = 13;
                  break;
                }

                _message = 'The password entered is not correct';
                throw new _errorClass["default"](_message, 404);

              case 13:
                res.status(200).json({
                  data: {
                    address: validUser.address,
                    email: validUser.email,
                    first_name: validUser.first_name,
                    last_name: validUser.last_name,
                    phone_number: validUser.phone_number,
                    token: validUser.token
                  },
                  message: 'Login successful',
                  status: 200
                });

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);
                res.status(_context.t0.statusCode || 500).json({
                  message: _context.t0.message,
                  status: _context.t0.statusCode || _context.t0.status
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 16]]);
      }));

      function loginUser(_x, _x2) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }() // This is the method that handles the request to get user by id....

  }, {
    key: "getUserById",
    value: function getUserById(req, res) {
      try {
        var user_id = req.params.user_id;

        var userById = _userHelper["default"].getUserById(user_id);

        if (userById != null || userById != undefined) {
          res.status(200).json({
            data: userById,
            status: 200
          });
        } else {
          var message = "The user with id: ".concat(user_id, " does not exist.");
          throw new _errorClass["default"](message, 404);
        }
      } catch (err) {
        res.status(err.statusCode || 500).json({
          message: err.message,
          status: err.statusCode || err.status
        });
      }
    } // This is the method that handles the request to get all the users that exist in the database....

  }, {
    key: "getAllUsers",
    value: function getAllUsers(req, res) {
      try {
        res.status(200).json({
          data: userDb,
          status: 200
        });
      } catch (err) {
        res.status(500).json({
          error: err.message,
          status: 500
        });
      }
    }
  }]);

  return UsersController;
}();

exports.UsersController = UsersController;