"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Models = require("../Models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userDb = _Models.usersModel.userDb;
var HandleUserHeader = {
  getUserToken: function () {
    var _getUserToken = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(userToken) {
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(userToken == null || userToken == undefined)) {
                _context.next = 4;
                break;
              }

              user = null;
              _context.next = 6;
              break;

            case 4:
              _context.next = 6;
              return userDb.some(function (eachUser) {
                if (eachUser.token == userToken) {
                  user = eachUser;
                } else {
                  user = null;
                }
              });

            case 6:
              return _context.abrupt("return", user);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getUserToken(_x) {
      return _getUserToken.apply(this, arguments);
    }

    return getUserToken;
  }()
};
var _default = HandleUserHeader;
exports["default"] = _default;