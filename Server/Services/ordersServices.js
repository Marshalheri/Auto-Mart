import ApiErrors from '../Helpers/errorClass';
import HandleUserHeader from '../Helpers/authorizer';
import OrdersHelper from '../Helpers/ordersHelper';

const {
  updateOrderPriceHelper,
  getAllOrdersHelper, getAllOrdersByUserIdHelper,
  getOrdersByIdHelper, getSpecificUserOrdersByIdHelper,
} = OrdersHelper;

const OrdersServices = {
  updateOrderPriceService: async ({ auth, order_id, new_price }) => {
    const user = await HandleUserHeader.getUserToken(auth);
  },

  updateOrderStatusService: async ({ auth, order_id, new_status }) => {
    const user = await HandleUserHeader.getUserToken(auth);
  },

  getAllOrdersService: async (authorization) => {
    const user = await HandleUserHeader.getUserToken(authorization);
    let allOrders = [];
    if (user == null || user == undefined) {
      const message = 'Please supply a valid authorization token for this request.';
      throw new ApiErrors(message, 401);
    } else if (user.is_admin == true) {
      allOrders = getAllOrdersHelper();
    } else {
      allOrders = getAllOrdersByUserIdHelper(user.id);
    }
    return allOrders;
  },

  getOrderByIdService: async ({ auth, order_id }) => {
    const user = await HandleUserHeader.getUserToken(auth);
    let specificOrder;
    if (user == null || user == undefined) {
      const message = 'Please supply a valid authorization token for this request.';
      throw new ApiErrors(message, 401);
    } else if (user.is_admin == true) {
      specificOrder = getOrdersByIdHelper(order_id);
    } else {
      specificOrder = getSpecificUserOrdersByIdHelper(user.id, order_id);
    }
    return specificOrder;
  },

  getOrdersResService: (res, message, allOrders) => {
    if (allOrders.length == 0) {
      res.status(200).json({
        message,
        status: 200,
      });
    } else {
      res.status(200).json({
        data: allOrders,
        message: 'Successfully retrieved all orders from the database.',
        status: 200,
      });
    }
  },

  orderErrResService: (err, res) => {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: err.statusCode || err.status,
    });
  },
};

export default OrdersServices;
