import ApiErrors from './errorClass';
import { ordersModel } from '../Models';

const { ordersDb } = ordersModel;

const getOrderByIdFunc = (order_id) => {
  let order = null;
  ordersDb.some((eachOrder) => {
    if (eachOrder.id == order_id) {
      order = eachOrder;
    }
  });
  return order;
};

const OrdersHelper = {

  // This method will create a new order...
  createNewOrderHelper: (body) => {
    const newOrderId = ordersDb.length + 1;
    const newOrderPayload = {
      id: newOrderId,
      buyer: body.buyer,
      car_id: body.carId,
      created_on: new Date(),
      amount: body.orderAmount,
      status: (body.orderStatus) ? (body.orderStatus) : ('pending'),
    };

    // Push the new order payload into the database....
    ordersDb.push(newOrderPayload);
    return newOrderPayload;
  },

  // This method will create a new order...
  updateOrderAmountHelper: ({ order_id, new_amount, buyer }) => {
    const newOrderId = ordersDb.length + 1;

    const orderToUpdate = getOrderByIdFunc(order_id);

    if (orderToUpdate.buyer != buyer) {
      const message = `Order with id ${car_id} was not found.`;
      throw new ApiErrors(message, 404);
    } else {
      orderToUpdate.amount = new_amount;
      carsDb.splice(index, 1, orderToUpdate);
      return orderToUpdate;
    }
  },

  // This method gets all orders in the database...
  getAllOrdersHelper: () => ordersDb,

  // This method gets order(s) of a specific user in the database...
  getOrdersByUserIdHelper: (sortedOrderDb, userId) => {
    const specificUserOrder = [];

    sortedOrderDb.forEach((eachOrder) => {
      if (eachOrder.buyer == userId) {
        specificUserOrder.push(eachOrder);
      }
    });
    return specificUserOrder;
  },

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
  },
};

export default OrdersHelper;
