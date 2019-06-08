"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errorClass = _interopRequireDefault(require("../Helpers/errorClass"));

var _authorizer = _interopRequireDefault(require("../Helpers/authorizer"));

var _carsHelper = _interopRequireDefault(require("../Helpers/carsHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllCarsHelper = _carsHelper["default"].getAllCarsHelper,
    getUnsoldCarsHelper = _carsHelper["default"].getUnsoldCarsHelper;
var CarServices = {
  getAllCarsService: function () {
    var _getAllCarsService = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(authorization) {
      var user, allCars, message;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _authorizer["default"].getUserToken(authorization);

            case 2:
              user = _context.sent;
              allCars = [];

              if (!(user == null || user == undefined)) {
                _context.next = 8;
                break;
              }

              allCars = getUnsoldCarsHelper();
              _context.next = 14;
              break;

            case 8:
              if (!(user.is_admin === true && user.token === authorization)) {
                _context.next = 12;
                break;
              }

              allCars = getAllCarsHelper();
              _context.next = 14;
              break;

            case 12:
              message = 'You have made a bad request.';
              throw new _errorClass["default"](message, 400);

            case 14:
              return _context.abrupt("return", allCars);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getAllCarsService(_x) {
      return _getAllCarsService.apply(this, arguments);
    }

    return getAllCarsService;
  }(),
  getCarResService: function getCarResService(res, message, allCars) {
    if (allCars.length == 0) {
      res.status(200).json({
        message: message,
        status: 200
      });
    } else {
      res.status(200).json({
        data: allCars,
        message: 'Successfully retrieved all cars from the database.',
        status: 200
      });
    }
  },
  carErrResService: function carErrResService(err, res) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: err.statusCode || err.status
    });
  }
};
var _default = CarServices;
exports["default"] = _default;