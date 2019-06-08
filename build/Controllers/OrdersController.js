"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrdersController = void 0;

var _Models = require("../Models");

var _errorClass = _interopRequireDefault(require("../Helpers/errorClass"));

var _authorizer = _interopRequireDefault(require("../Helpers/authorizer"));

var _ordersHelper = _interopRequireDefault(require("../Helpers/ordersHelper"));

var _ordersServices = _interopRequireDefault(require("../Services/ordersServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ordersDb = _Models.ordersModel.ordersDb;
var createOrderHelper = _ordersHelper["default"].createOrderHelper,
    getOrdersByIdHelper = _ordersHelper["default"].getOrdersByIdHelper;
var getAllOrdersService = _ordersServices["default"].getAllOrdersService,
    getOrderByIdService = _ordersServices["default"].getOrderByIdService,
    orderErrResService = _ordersServices["default"].orderErrResService,
    getOrdersResService = _ordersServices["default"].getOrdersResService;

var OrdersController =
/*#__PURE__*/
function () {
  function OrdersController() {
    _classCallCheck(this, OrdersController);
  }

  _createClass(OrdersController, [{
    key: "createNewCarOrder",
    // This is the method that handles the request to create new order...
    value: function () {
      var _createNewCarOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var body, headers, token, user;
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
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                orderErrResService(_context.t0, res);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function createNewCarOrder(_x, _x2) {
        return _createNewCarOrder.apply(this, arguments);
      }

      return createNewCarOrder;
    }() // This is the method that handles the request to update order status...

  }, {
    key: "updateOrderStatus",
    value: function () {
      var _updateOrderStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                try {} catch (err) {}

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function updateOrderStatus(_x3, _x4) {
        return _updateOrderStatus.apply(this, arguments);
      }

      return updateOrderStatus;
    }() // This is the method that handles the request to update order price...

  }, {
    key: "updateOrderPrice",
    value: function () {
      var _updateOrderPrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                try {} catch (err) {
                  orderErrResService(err, res);
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateOrderPrice(_x5, _x6) {
        return _updateOrderPrice.apply(this, arguments);
      }

      return updateOrderPrice;
    }() // This is the method that handles the request to get all orders...

  }, {
    key: "getAllOrders",
    value: function () {
      var _getAllOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var authorization, allOrdersData, allOrders, optMessage;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                authorization = req.headers.authorization;
                _context4.next = 4;
                return getAllOrdersService(authorization);

              case 4:
                allOrdersData = _context4.sent;
                allOrders = allOrdersData.allOrders;
                optMessage = 'There is no order currently stored in the database.';
                getOrdersResService(res, optMessage, allOrders);
                _context4.next = 13;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                orderErrResService(_context4.t0, res);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 10]]);
      }));

      function getAllOrders(_x7, _x8) {
        return _getAllOrders.apply(this, arguments);
      }

      return getAllOrders;
    }() // This is the method that handles the request to get order by id....

  }, {
    key: "getOrdersById",
    value: function () {
      var _getOrdersById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var authorization, order_id, allOrdersData, allOrders, is_admin, userId, specificOrder, message;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                authorization = req.headers.authorization;
                order_id = req.params.order_id;
                _context5.next = 5;
                return getAllOrdersService(authorization);

              case 5:
                allOrdersData = _context5.sent;
                allOrders = allOrdersData.allOrders, is_admin = allOrdersData.is_admin, userId = allOrdersData.userId;
                _context5.next = 9;
                return getOrdersByIdHelper(allOrders, order_id, is_admin, userId);

              case 9:
                specificOrder = _context5.sent;

                if (!(specificOrder == null || specificOrder == undefined)) {
                  _context5.next = 15;
                  break;
                }

                message = "Order with id ".concat(order_id, " was not found.");
                throw new _errorClass["default"](message, 404);

              case 15:
                res.status(200).json({
                  data: specificOrder,
                  message: "Successfully retrieved order with id: ".concat(order_id, " from the database."),
                  status: 200
                });

              case 16:
                _context5.next = 21;
                break;

              case 18:
                _context5.prev = 18;
                _context5.t0 = _context5["catch"](0);
                orderErrResService(_context5.t0, res);

              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 18]]);
      }));

      function getOrdersById(_x9, _x10) {
        return _getOrdersById.apply(this, arguments);
      }

      return getOrdersById;
    }()
  }]);

  return OrdersController;
}();

exports.OrdersController = OrdersController;