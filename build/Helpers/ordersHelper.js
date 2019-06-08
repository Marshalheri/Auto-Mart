"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errorClass = _interopRequireDefault(require("./errorClass"));

var _Models = require("../Models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ordersDb = _Models.ordersModel.ordersDb;
var OrdersHelper = {
  // This method will create a new order...
  createOrderHelper: function createOrderHelper(body) {
    var newOrderId = ordersDb.length + 1;
    var newOrderPayload = {
      id: newOrderId,
      buyer: body.userId,
      car_id: body.carId,
      created_on: new Date(),
      price: body.orderPrice,
      status: body.orderStatus
    };
  },
  // This method will create a new order...
  updateOrderPriceHelper: function updateOrderPriceHelper(body) {
    var newOrderId = ordersDb.length + 1;
    var newOrderPayload = {
      id: newOrderId,
      buyer: body.userId,
      car_id: body.carId,
      created_on: new Date(),
      price: body.orderPrice,
      status: body.orderStatus
    };
  },
  // This method gets all orders in the database...
  getAllOrdersHelper: function getAllOrdersHelper() {
    return ordersDb;
  },
  // This method gets order(s) of any user in the database by its id...
  getOrdersByIdHelper: function getOrdersByIdHelper(sortedOrderDb, order_id, is_admin, userId) {
    var specificOrder;

    if (is_admin == true) {
      sortedOrderDb.forEach(function (eachOrder) {
        if (eachOrder.id == order_id) {
          specificOrder = eachOrder;
        }
      });
    } else {
      sortedOrderDb.forEach(function (eachOrder) {
        if (eachOrder.id == order_id && eachOrder.buyer == userId) {
          specificOrder = eachOrder;
        } else {
          var message = "No order was found for user with id: ".concat(userId, ".");
          throw new _errorClass["default"](message, 404);
        }
      });
    }

    return specificOrder;
  }
};
var _default = OrdersHelper;
exports["default"] = _default;