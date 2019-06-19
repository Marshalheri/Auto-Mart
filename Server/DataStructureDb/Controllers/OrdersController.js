import { ordersModel } from '../Models';
import ApiErrors from '../Helpers/errorClass';
import HandleUserHeader from '../Helpers/authorizer';
import OrdersHelper from '../Helpers/ordersHelper';
import OrdersServices from '../Services/ordersServices';

const { ordersDb } = ordersModel;
const { getUserToken } = HandleUserHeader;
const {
  createNewOrderHelper, updateOrderAmountHelper,
  getOrdersByUserIdHelper, getOrdersByIdHelper,
} = OrdersHelper;
const {
  getAllOrdersService, getOrderByIdService,
  orderErrResService, getOrdersResService,
} = OrdersServices;

export class OrdersController {
  // This is the method that handles the request to create new order...
  async createNewCarOrder(req, res) {
    try {
      const { body, headers } = req;
      const { authorization } = headers;
      const user = await getUserToken(authorization);
      if (user != null || user != undefined) {
        body.buyer = user.id;
        const newCreatedOrder = createNewOrderHelper(body);
        res.status(201).json({
          data: newCreatedOrder,
          message: 'Successfully created new order.',
          status: 201,
        });
      } else {
        const message = 'Signup or Signin to create an order for this Ad.';
        throw new ApiErrors(message, 401);
      }
    } catch (err) {
      orderErrResService(err, res);
    }
  }

  // This is the method that handles the request to update order status...
  async updateOrderStatus(req, res) {
    try {
      const { body, headers, params } = req;
    } catch (err) {

    }
  }

  // This is the method that handles the request to update order price...
  async updateOrderAmount(req, res) {
    try {
      const { body, headers, params } = req;
      const token = headers.authorization;
      const user = await getUserToken(token);
      if (user != null || user != undefined) {
        body.order_id = params.order_id;
        body.buyer = user.id;
        const updatedOrderAmount = await updateOrderAmountHelper(body);
        if (updatedOrderAmount != null || updatedOrderAmount != undefined) {
          res.status(200).json({
            data: updatedOrderAmount,
            message: `Successfully updated the order amount of the Ad to ${updatedOrderAmount.amount}.`,
            status: 200,
          });
        }
      }
    } catch (err) {
      orderErrResService(err, res);
    }
  }

  // This is the method that handles the request to get all orders...
  async getAllOrders(req, res) {
    try {
      const { authorization } = req.headers;
      const allOrdersData = await getAllOrdersService(authorization);
      const { allOrders, is_admin, userId } = allOrdersData;
      let returnedOrders = [];
      let optMessage;
      if (is_admin == true) {
        returnedOrders = allOrders;
        optMessage = 'There is no order currently stored in the database.';
      } else {
        returnedOrders = getOrdersByUserIdHelper(allOrders, userId);
        optMessage = `There is no order currently stored in the database for user with id: ${userId}.`;
      }
      getOrdersResService(res, optMessage, returnedOrders);
    } catch (err) {
      orderErrResService(err, res);
    }
  }

  // This is the method that handles the request to get order by id....
  async getOrdersById(req, res) {
    try {
      const { authorization } = req.headers;
      const { order_id } = req.params;

      const allOrdersData = await getAllOrdersService(authorization);
      const { allOrders, is_admin, userId } = allOrdersData;
      const specificOrder = await getOrdersByIdHelper(allOrders, order_id, is_admin, userId);
      if (specificOrder == null || specificOrder == undefined) {
        const message = `Order with id ${order_id} was not found.`;
        throw new ApiErrors(message, 404);
      } else {
        res.status(200).json({
          data: specificOrder,
          message: `Successfully retrieved order with id: ${order_id} from the database.`,
          status: 200,
        });
      }
    } catch (err) {
      orderErrResService(err, res);
    }
  }
}
