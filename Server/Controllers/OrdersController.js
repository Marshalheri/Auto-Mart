import { ordersModel } from '../Models';
import ApiErrors from '../Helpers/errorClass';
import HandleUserHeader from '../Helpers/authorizer';
import OrdersHelper from '../Helpers/ordersHelper';
import OrdersServices from '../Services/ordersServices';

const { ordersDb } = ordersModel;
const { createOrderHelper } = OrdersHelper;
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
      const allOrders = await getAllOrdersService(authorization);
      const optMessage = 'There is no order currently stored in the database.';
      getOrdersResService(res, optMessage, allOrders);
    } catch (err) {
      orderErrResService(err, res);
    }
  }

  // This is the method that handles the request to get order by id....
  async getOrdersById(req, res) {
    try {
      const { headers, params } = req;
      const searchParams = {
        auth: headers.authorization,
        id: params.order_id,
      };
      const specificOrder = await getOrderByIdService({ ...searchParams });
      if (specificOrder == null || specificOrder == undefined) {
        const message = `Order with id ${searchParams.id} was not found.`;
        throw new ApiErrors(message, 404);
      } else {
        res.status(200).json({
          data: specificOrder,
          message: `Successfully retrieved order with id: ${searchParams.id} from the database.`,
          status: 200,
        });
      }
    } catch (err) {
      orderErrResService(err, res);
    }
  }
}
