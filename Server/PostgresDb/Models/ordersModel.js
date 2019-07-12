import dbConfig from '../dbConfig';
import ApiErrors from '../Services/errorClass';
import AuthorizeUser from '../Services/authorizer';
import { Constants } from '../Services';
import OrdersHelper from '../Helpers/orderHelper';
import CarsModel from './carsModel';

const { verifyUser } = AuthorizeUser;
const {
  cannotUpdateAd, cannotFindAd, invalidToken, notAuthorizedMessage,
  supplyAuthHeader, supplyBodyValue,
} = Constants;
const { getOrdersResponse, orderErrorResponse } = OrdersHelper;
const { getCarByIsAdmin } = CarsModel;

const OrdersModel = {

  // This is the method that handles the request to create new order...
  async createNewCarOrderModel(req, res) {
    const { body, headers } = req;
    const { authorization } = headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.userId) {
          const row = await getCarByIsAdmin(user.isAdmin, res, body.carId);
          if (row.length == 0) {
            cannotFindAd(body.carId);
          } else {
            body.carPrice = row[0].price;
            body.buyer = user.userId;
            const {
              buyer, carId, carPrice, orderAmount,
            } = body;
            const createOrderQuery = `INSERT INTO
                orders(buyer, "carId", amount, "priceOffered")
                VALUES($1, $2, $3, $4)
                RETURNING id, buyer, "carId", amount, status, "priceOffered"`;
            const values = [buyer, carId, carPrice, orderAmount];
            const { rows } = await dbConfig.query(createOrderQuery, values);
            res.status(201).json({
              data: rows,
              message: 'Successfully created new order.',
              status: 201,
            });
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      orderErrorResponse(err, res);
    }
  },

  // This is the method that handles the request to update the order amount...
  async updateOrderAmountModel(req, res) {
    const { body, headers, params } = req;
    const { authorization } = headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else if (body.orderAmount == null || body.orderAmount == undefined) {
        const message = 'Please supply order amount to update.';
        supplyBodyValue(message);
      } else {
        const user = await verifyUser(authorization, res);
        if (user.userId) {
          const { order_id } = params;
          body.id = order_id;
          body.buyer = user.userId;
          const { id, buyer, orderAmount } = body;
          const row = await this.retunOrderByIdAndBuyer(order_id, { ...user });
          if (row.length == 0) {
            const message = `Order with id ${order_id} was not found.`;
            throw new ApiErrors(message, 404);
          } else if (row[0].buyer == buyer) {
            const oldPriceOffered = row[0].priceOffered;
            const updateQuery = `UPDATE orders SET "priceOffered" = $3, "oldPriceOffered" = $4 WHERE id = $1 AND buyer = $2
                                    RETURNING id, buyer, "carId", amount, status, "priceOffered", "oldPriceOffered"`;
            const values = [id, buyer, orderAmount, oldPriceOffered];
            const { rows } = await dbConfig.query(updateQuery, values);
            res.status(200).json({
              data: rows[0],
              message: `Successfully updated the order amount to ${orderAmount}.`,
              status: 200,
            });
          } else {
            cannotUpdateAd(buyer);
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      orderErrorResponse(err, res);
    }
  },

  // This is the method that handles the request to update order status...
  async updateOrderStatusModel(req, res) {
    const { body, headers, params } = req;
    const { authorization } = headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else if (body.orderStatus == null || body.orderStatus == undefined) {
        const message = 'Please supply order status to update.';
        supplyBodyValue(message);
      } else {
        const user = await verifyUser(authorization, res);
        if (user.userId) {
          const { order_id } = params;
          body.id = order_id;
          body.buyer = user.userId;
          const { id, buyer, orderStatus } = body;
          const row = await this.retunOrderByIdAndBuyer(order_id, { ...user });
          if (row.length == 0) {
            const message = `Order with id ${order_id} was not found.`;
            throw new ApiErrors(message, 404);
          } else if (row[0].buyer == buyer || user.isAdmin == true) {
            const updateQuery = `UPDATE orders SET "status" = $3 WHERE id = $1 AND buyer = $2
                                    RETURNING id, buyer, "carId", amount, status, "priceOffered", "oldPriceOffered"`;
            const values = [id, buyer, orderStatus];
            const { rows } = await dbConfig.query(updateQuery, values);
            res.status(200).json({
              data: rows[0],
              message: `Successfully updated the order status to ${orderStatus}.`,
              status: 200,
            });
          } else {
            cannotUpdateAd(buyer);
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      orderErrorResponse(err, res);
    }
  },

  // This is the method that handles the request to get all orders...
  async getAllOrdersModels(req, res) {
    const { authorization } = req.headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.userId && user.isAdmin == true) {
          const { rows } = await dbConfig.query('SELECT * FROM orders');
          getOrdersResponse(res, rows, user);
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      orderErrorResponse(err, res);
    }
  },

  // This is the method that handles the request to get all orders of a user...
  async getAllUserOrdersModel(req, res) {
    const { authorization } = req.headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.userId) {
          const { rows } = await dbConfig.query('SELECT id, buyer, "carId", amount, status, "priceOffered",'
                                                  + ' "oldPriceOffered" FROM orders WHERE buyer = $1', [user.userId]);
          const message = `There is no order currently stored in the database for user with id: ${user.userId}.`;
          getOrdersResponse(res, rows, user, message);
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      orderErrorResponse(err, res);
    }
  },

  // This is the method that handles the request to get order by id....
  async getOrdersByIdModel(req, res) {
    const { authorization } = req.headers;
    const { order_id } = req.params;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.userId) {
          const rows = (user.isAdmin == true)
            ? (await this.returnOrderById(order_id))
            : (await this.retunOrderByIdAndBuyer(order_id, { ...user }));
          if (rows.length == 0) {
            const message = `Order with id ${order_id} was not found.`;
            throw new ApiErrors(message, 404);
          } else {
            const message = `Successfully retrieved order with id: ${order_id} from the database.`;
            getOrdersResponse(res, rows, user, message);
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      orderErrorResponse(err, res);
    }
  },

  // This method returns the order whose id is passed to it..,
  async returnOrderById(orderId) {
    const queryText = 'SELECT * FROM orders WHERE id = $1';
    const { rows } = await dbConfig.query(queryText, [orderId]);
    return rows;
  },

  // This method returns an order of a particular user...
  async retunOrderByIdAndBuyer(orderId, { userId }) {
    const queryText = 'SELECT id, buyer, "carId", amount, status, "priceOffered", "oldPriceOffered"'
                    + ' FROM orders WHERE id = $1 AND buyer = $2';
    const values = [orderId, userId];
    const { rows } = await dbConfig.query(queryText, values);
    return rows;
  },
  //
  // async getOrderByIsAdmin(user, res, orderId) {
  //   let returnRows;
  //   try {
  //     if (orderId == null || orderId == undefined) {
  //       const { rows } = (user.isAdmin == true)
  //         ? (await dbConfig.query('SELECT * FROM orders'))
  //         : (await dbConfig.query('SELECT * FROM orders WHERE buyer = $1', [user.userId]));
  //       returnRows = rows;
  //     } else {
  //       const { rows } = (user.isAdmin == true)
  //         ? (await dbConfig.query('SELECT * FROM orders WHERE id = $1', [car_id]))
  //         : (await dbConfig.query('SELECT * FROM orders WHERE status = $1 AND id = $2',
  //           ['available', car_id]));
  //       returnRows = rows;
  //     }
  //     return returnRows;
  //   } catch (err) {
  //     carErrorResponse(err, res);
  //   }
  // },

};

export default OrdersModel;
