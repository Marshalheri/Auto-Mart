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

  // This method gets order(s) of any user in the database by its id...
  getOrdersByIdHelper: (sortedOrderDb, order_id, is_admin, userId) => {
    let specificOrder;
    if (is_admin == true) {
      sortedOrderDb.forEach((eachOrder) => {
        if (eachOrder.id == order_id) {
          specificOrder = eachOrder;
        }
      });
    } else {
      sortedOrderDb.forEach((eachOrder) => {
        if (eachOrder.id == order_id && eachOrder.buyer == userId) {
          specificOrder = eachOrder;
        } else {
          const message = `No order was found for user with id: ${userId}.`;
          throw new ApiErrors(message, 404);
        }
      });
    }
    return specificOrder;
  }
};

export default OrdersHelper;
