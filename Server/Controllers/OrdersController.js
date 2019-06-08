import { ordersModel } from '../Models';
import ApiErrors from '../Helpers/errorClass';
import HandleUserHeader from '../Helpers/authorizer';
import OrdersHelper from '../Helpers/ordersHelper';
import OrdersServices from '../Services/ordersServices';

const { ordersDb } = ordersModel;
const { createOrderHelper, getOrdersByIdHelper } = OrdersHelper;
const {
  getAllOrdersService, getOrderByIdService,
  orderErrResService, getOrdersResService,
} = OrdersServices;

export class OrdersController {
  // This is the method that handles the request to create new order...
  async createNewCarOrder(req, res) {
    try {
      const { body, headers } = req;
      const token = headers.authorization;
      const user = await HandleUserHeader.getUserToken(token);
    } catch (err) {
      orderErrResService(err, res);
    }
  }

  // This is the method that handles the request to update order status...
  async updateOrderStatus(req, res) {
    try {

    } catch (err) {

    }
  }

  // This is the method that handles the request to update order price...
  async updateOrderPrice(req, res) {
    try {

    } catch (err) {
      orderErrResService(err, res);
    }
  }

  // This is the method that handles the request to get all orders...
  async getAllOrders(req, res) {
    try {
      const { authorization } = req.headers;
      const allOrdersData = await getAllOrdersService(authorization);
      const { allOrders } = allOrdersData;
      const optMessage = 'There is no order currently stored in the database.';
      getOrdersResService(res, optMessage, allOrders);
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
