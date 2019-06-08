import ApiErrors from './errorClass';
import { ordersModel } from '../Models';

const { ordersDb } = ordersModel;

const OrdersHelper = {

  // This method will create a new order...
  createOrderHelper: (body) => {
    const newOrderId = ordersDb.length + 1;
    const newOrderPayload = {
      id: newOrderId,
      buyer: body.userId,
      car_id: body.carId,
      created_on: new Date(),
      price: body.orderPrice,
      status: body.orderStatus,
    };
  },

  // This method will create a new order...
  updateOrderPriceHelper: (body) => {
    const newOrderId = ordersDb.length + 1;
    const newOrderPayload = {
      id: newOrderId,
      buyer: body.userId,
      car_id: body.carId,
      created_on: new Date(),
      price: body.orderPrice,
      status: body.orderStatus,
    };
  },

  // This method gets all orders in the database...
  getAllOrdersHelper: () => ordersDb,

  // This method gets all orders of a user in the database...
  getAllOrdersByUserIdHelper: (userId) => {
    const userOrders = [];
    ordersDb.forEach((eachOrder) => {
      if (eachOrder.buyer == userId) {
        userOrders.push(eachOrder);
      }
    });
    return userOrders;
  },

  // This method gets order of any user in the database by its id...
  getOrdersByIdHelper: (order_id) => {
    let specificOrder;
    ordersDb.forEach((eachOrder) => {
      if (eachOrder.id == order_id) {
        specificOrder = eachOrder;
      }
    });
    return specificOrder;
  },

  // This method gets order of specific user in the database by its id...
  getSpecificUserOrdersByIdHelper: (user_id, order_id) => {
    let specificOrder;
    ordersDb.forEach((eachOrder) => {
      if (eachOrder.buyer == user_id && eachOrder.id == order_id) {
        specificOrder = eachOrder;
      }
    });
    return specificOrder;
  },
};

export default OrdersHelper;
