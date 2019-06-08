"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsController = void 0;

var _Models = require("../Models");

var _errorClass = _interopRequireDefault(require("../Helpers/errorClass"));

var _authorizer = _interopRequireDefault(require("../Helpers/authorizer"));

var _carsHelper = _interopRequireDefault(require("../Helpers/carsHelper"));

var _carsServices = _interopRequireDefault(require("../Services/carsServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userDb = _Models.usersModel.userDb;
var createNewCar = _carsHelper["default"].createNewCar,
    updateCarPriceHelper = _carsHelper["default"].updateCarPriceHelper,
    updateCarSoldHelper = _carsHelper["default"].updateCarSoldHelper,
    getCarByIdHelper = _carsHelper["default"].getCarByIdHelper,
    getCarsByBodyHelper = _carsHelper["default"].getCarsByBodyHelper,
    getCarsByPriceRange = _carsHelper["default"].getCarsByPriceRange,
    getCarsByState = _carsHelper["default"].getCarsByState,
    getCarsByStatusHelper = _carsHelper["default"].getCarsByStatusHelper,
    getCarsByManufacturerHelper = _carsHelper["default"].getCarsByManufacturerHelper;

var CarsController =
/*#__PURE__*/
function () {
  function CarsController() {
    _classCallCheck(this, CarsController);
  }

  _createClass(CarsController, [{
    key: "createNewCarAd",
    // This is the methd that handles the creation of a new car ad...
    value: function () {
      var _createNewCarAd = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var body, headers, token, user, newCreatedCar, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                body = req.body, headers = req.headers;
                token = headers.authorization;
                _context.next = 5;
                return _authorizer["default"].getUserToken(token);

              case 5:
                user = _context.sent;

                if (!(user != null || user != undefined)) {
                  _context.next = 12;
                  break;
                }

                body.owner = user.id;
                newCreatedCar = createNewCar(body);
                res.status(201).json({
                  data: newCreatedCar,
                  message: 'Successfully created new car Ad.',
                  status: 201
                });
                _context.next = 14;
                break;

              case 12:
                message = 'Signup or Signin to create an Ad.';
                throw new _errorClass["default"](message, 401);

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);

                _carsServices["default"].carErrResService(_context.t0, res);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 16]]);
      }));

      function createNewCarAd(_x, _x2) {
        return _createNewCarAd.apply(this, arguments);
      }

      return createNewCarAd;
    }() // This is the method that handles the request to update the price of a car...

  }, {
    key: "updateCarPice",
    value: function () {
      var _updateCarPice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var body, headers, params, token, user, updatedCarPrice, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                body = req.body, headers = req.headers, params = req.params;
                token = headers.authorization;
                _context2.next = 5;
                return _authorizer["default"].getUserToken(token);

              case 5:
                user = _context2.sent;

                if (!(user != null || user != undefined)) {
                  _context2.next = 15;
                  break;
                }

                body.car_id = params.car_id;
                body.owner = user.id;
                _context2.next = 11;
                return updateCarPriceHelper(body);

              case 11:
                updatedCarPrice = _context2.sent;

                if (updatedCarPrice != null || updatedCarPrice != undefined) {
                  res.status(200).json({
                    data: updatedCarPrice,
                    message: "Successfully updated the price of the Ad to ".concat(updatedCarPrice.price, "."),
                    status: 200
                  });
                }

                _context2.next = 17;
                break;

              case 15:
                message = 'You are not authorized to update the price of the Ad.';
                throw new _errorClass["default"](message, 401);

              case 17:
                _context2.next = 22;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](0);

                _carsServices["default"].carErrResService(_context2.t0, res);

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 19]]);
      }));

      function updateCarPice(_x3, _x4) {
        return _updateCarPice.apply(this, arguments);
      }

      return updateCarPice;
    }() // This is the method that handles the update of the car sold status...

  }, {
    key: "updateCarSoldStatus",
    value: function () {
      var _updateCarSoldStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var body, headers, params, token, user, updatedCarSold, message;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                body = req.body, headers = req.headers, params = req.params;
                token = headers.authorization;
                _context3.next = 5;
                return _authorizer["default"].getUserToken(token);

              case 5:
                user = _context3.sent;

                if (!(user != null || user != undefined)) {
                  _context3.next = 15;
                  break;
                }

                body.car_id = params.car_id;
                body.owner = user.id;
                _context3.next = 11;
                return updateCarSoldHelper(body);

              case 11:
                updatedCarSold = _context3.sent;

                if (updatedCarSold != null || updatedCarSold != undefined) {
                  res.status(200).json({
                    data: updatedCarSold,
                    message: "Successfully updated the status of the Ad to ".concat(updatedCarSold.status, "."),
                    status: 200
                  });
                }

                _context3.next = 17;
                break;

              case 15:
                message = 'You are not authorized to update the status of the Ad.';
                throw new _errorClass["default"](message, 401);

              case 17:
                _context3.next = 22;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](0);

                _carsServices["default"].carErrResService(_context3.t0, res);

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 19]]);
      }));

      function updateCarSoldStatus(_x5, _x6) {
        return _updateCarSoldStatus.apply(this, arguments);
      }

      return updateCarSoldStatus;
    }() // This method handles the request to get all cars...

  }, {
    key: "getAllCars",
    value: function () {
      var _getAllCars = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var authorization, allCars, queryParam, optMessage, returnedCars, _optMessage;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                authorization = req.headers.authorization;
                _context4.next = 4;
                return _carsServices["default"].getAllCarsService(authorization);

              case 4:
                allCars = _context4.sent;
                queryParam = req.query; // This block returns the cars in the database if no query string is sent by client...

                if (!(Object.getOwnPropertyNames(queryParam).length === 0)) {
                  _context4.next = 11;
                  break;
                }

                optMessage = 'There is no car currently stored in the database.';

                _carsServices["default"].getCarResService(res, optMessage, allCars);

                _context4.next = 49;
                break;

              case 11:
                if (!queryParam.body_type) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 14;
                return getCarsByBodyHelper(allCars, _objectSpread({}, queryParam));

              case 14:
                _context4.t0 = _context4.sent;
                _context4.next = 46;
                break;

              case 17:
                if (!(queryParam.max_price || queryParam.min_price)) {
                  _context4.next = 23;
                  break;
                }

                _context4.next = 20;
                return getCarsByPriceRange(allCars, _objectSpread({}, queryParam));

              case 20:
                _context4.t1 = _context4.sent;
                _context4.next = 45;
                break;

              case 23:
                if (!queryParam.state) {
                  _context4.next = 29;
                  break;
                }

                _context4.next = 26;
                return getCarsByState(allCars, _objectSpread({}, queryParam));

              case 26:
                _context4.t2 = _context4.sent;
                _context4.next = 44;
                break;

              case 29:
                if (!queryParam.status) {
                  _context4.next = 35;
                  break;
                }

                _context4.next = 32;
                return getCarsByStatusHelper(allCars, _objectSpread({}, queryParam));

              case 32:
                _context4.t3 = _context4.sent;
                _context4.next = 43;
                break;

              case 35:
                if (!queryParam.manufacturer) {
                  _context4.next = 41;
                  break;
                }

                _context4.next = 38;
                return getCarsByManufacturerHelper(allCars, _objectSpread({}, queryParam));

              case 38:
                _context4.t4 = _context4.sent;
                _context4.next = 42;
                break;

              case 41:
                _context4.t4 = new _errorClass["default"]('The query string supplied is not correct.', 400);

              case 42:
                _context4.t3 = _context4.t4;

              case 43:
                _context4.t2 = _context4.t3;

              case 44:
                _context4.t1 = _context4.t2;

              case 45:
                _context4.t0 = _context4.t1;

              case 46:
                returnedCars = _context4.t0;
                _optMessage = 'There is no car currently stored in the database.';

                _carsServices["default"].getCarResService(res, _optMessage, returnedCars);

              case 49:
                _context4.next = 54;
                break;

              case 51:
                _context4.prev = 51;
                _context4.t5 = _context4["catch"](0);

                _carsServices["default"].carErrResService(_context4.t5, res);

              case 54:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 51]]);
      }));

      function getAllCars(_x7, _x8) {
        return _getAllCars.apply(this, arguments);
      }

      return getAllCars;
    }() // This method handles the request to get car by id...

  }, {
    key: "getCarById",
    value: function () {
      var _getCarById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var car_id, authorization, sortedCarsDb, car, message;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                car_id = req.params.car_id;
                authorization = req.headers.authorization;
                _context5.next = 5;
                return _carsServices["default"].getAllCarsService(authorization);

              case 5:
                sortedCarsDb = _context5.sent;
                car = getCarByIdHelper(car_id, sortedCarsDb);

                if (!(car == null || car == undefined)) {
                  _context5.next = 12;
                  break;
                }

                message = "Car Ad with id ".concat(car_id, " was not found.");
                throw new _errorClass["default"](message, 404);

              case 12:
                res.status(200).json({
                  data: car,
                  message: "Successfully retrieved car with id: ".concat(car_id, " from the database."),
                  status: 200
                });

              case 13:
                _context5.next = 18;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](0);

                _carsServices["default"].carErrResService(_context5.t0, res);

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 15]]);
      }));

      function getCarById(_x9, _x10) {
        return _getCarById.apply(this, arguments);
      }

      return getCarById;
    }()
  }]);

  return CarsController;
}();

exports.CarsController = CarsController;