"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errorClass = _interopRequireDefault(require("../Helpers/errorClass"));

var _authorizer = _interopRequireDefault(require("../Helpers/authorizer"));

var _ordersHelper = _interopRequireDefault(require("../Helpers/ordersHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateOrderPriceHelper = _ordersHelper["default"].updateOrderPriceHelper,
    getAllOrdersHelper = _ordersHelper["default"].getAllOrdersHelper;
var OrdersServices = {
  updateOrderPriceService: function () {
    var _updateOrderPriceService = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var auth, order_id, new_price, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              auth = _ref.auth, order_id = _ref.order_id, new_price = _ref.new_price;
              _context.next = 3;
              return _authorizer["default"].getUserToken(auth);

            case 3:
              user = _context.sent;

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function updateOrderPriceService(_x) {
      return _updateOrderPriceService.apply(this, arguments);
    }

    return updateOrderPriceService;
  }(),
  updateOrderStatusService: function () {
    var _updateOrderStatusService = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(_ref2) {
      var auth, order_id, new_status, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              auth = _ref2.auth, order_id = _ref2.order_id, new_status = _ref2.new_status;
              _context2.next = 3;
              return _authorizer["default"].getUserToken(auth);

            case 3:
              user = _context2.sent;

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function updateOrderStatusService(_x2) {
      return _updateOrderStatusService.apply(this, arguments);
    }

    return updateOrderStatusService;
  }(),
  getAllOrdersService: function () {
    var _getAllOrdersService = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(authorization) {
      var user, allOrders, is_admin, message, allOrdersData;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _authorizer["default"].getUserToken(authorization);

            case 2:
              user = _context3.sent;
              allOrders = [];
              is_admin = false;

              if (!(user == null || user == undefined)) {
                _context3.next = 10;
                break;
              }

              message = 'Please supply a valid authorization token for this request.';
              throw new _errorClass["default"](message, 401);

            case 10:
              if (user.is_admin == true) {
                allOrders = getAllOrdersHelper();
                is_admin = true;
              }

            case 11:
              allOrdersData = {
                allOrders: allOrders,
                is_admin: is_admin,
                userId: user.id
              };
              return _context3.abrupt("return", allOrdersData);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getAllOrdersService(_x3) {
      return _getAllOrdersService.apply(this, arguments);
    }

    return getAllOrdersService;
  }(),
  getOrdersResService: function getOrdersResService(res, message, allOrders) {
    if (allOrders.length == 0) {
      res.status(200).json({
        message: message,
        status: 200
      });
    } else {
      res.status(200).json({
        data: allOrders,
        message: 'Successfully retrieved all orders from the database.',
        status: 200
      });
    }
  },
  orderErrResService: function orderErrResService(err, res) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: err.statusCode || err.status
    });
  }
};
var _default = OrdersServices;
exports["default"] = _default;