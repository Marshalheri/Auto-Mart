import dbConfig from '../dbConfig';
import ApiErrors from '../Services/errorClass';
import AuthorizeUser from '../Services/authorizer';
import { Constants } from '../Services';
import OrdersHelper from '../Helpers/orderHelper';
import CarsModel from './carsModel';

const { verifyUser } = AuthorizeUser;
const {
  cannotUpdateAd, cannotFind, invalidToken, notAuthorizedMessage,
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
        if (user.user_id) {
          const row = await getCarByIsAdmin(user.is_admin, res, body.car_id);
          if (row.length == 0) {
            console.log(row)
            const message = `The car with id: ${body.car_id} was not found.`;
            cannotFind(message);
          } else {
            body.car_price = row[0].price;
            body.buyer = user.user_id;
            const {
              buyer, car_id, car_price, amount, status,
            } = body;
            var price_offered = amount
            const createOrderQuery = `INSERT INTO
                orders(buyer, "car_id", amount, "price_offered", status, price)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING id, buyer, "car_id", created_on, status, price,"price_offered"`;
            const values = [buyer, car_id, amount, price_offered, status, car_price];
            const { rows } = await dbConfig.query(createOrderQuery, values);
            res.status(201).json({
              data: rows[0],
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
      console.log("err order: " +err)
      console.log("order body: " + req.body);
    }
  },

  // This is the method that handles the request to update the order amount...
  async updateOrderAmountModel(req, res) {
    const { body, headers, params } = req;
    const { authorization } = headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else if (body.amount == null || body.amount == undefined) {
        const message = 'Please supply order amount to update.';
        supplyBodyValue(message);
      } else {
        const user = await verifyUser(authorization, res);
        if (user.user_id) {
          const { order_id } = params;
          body.id = order_id;
          body.buyer = user.user_id;
          const { id, buyer, amount } = body;
          const row = await this.returnOrderByIdAndBuyer(order_id, { ...user });
          if (row.length == 0) {
            const message = `Order with id ${order_id} was not found.`;
            throw new ApiErrors(message, 404);
          } else if (row[0].buyer == buyer) {
            const old_price_offered = row[0].price_offered;
            const updateQuery = `UPDATE orders SET "price_offered" = $3, "old_price_offered" = $4 WHERE id = $1 AND buyer = $2
                                    RETURNING id, buyer, "car_id", status, price, "price_offered", "old_price_offered", "new_price_offered"`;
            const values = [id, buyer, amount, old_price_offered, amount];
            const { rows } = await dbConfig.query(updateQuery, values);
            res.status(200).json({
              data: rows[0],
              message: `Successfully updated the order amount to ${order_amount}.`,
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
      console.log("err order patch: " +err)
      console.log("order body patch: " + req.body);
    }
  },

  // This is the method that handles the request to update order status...
  async updateOrderStatusModel(req, res) {
    const { body, headers, params } = req;
    const { authorization } = headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else if (body.order_status == null || body.order_status == undefined) {
        const message = 'Please supply order status to update.';
        supplyBodyValue(message);
      } else {
        const user = await verifyUser(authorization, res);
        if (user.user_id) {
          const { order_id } = params;
          body.id = order_id;
          body.buyer = user.user_id;
          const { id, buyer, order_status } = body;
          const row = await this.returnOrderByIdAndBuyer(order_id, { ...user });
          if (row.length == 0) {
            const message = `Order with id ${order_id} was not found.`;
            throw new ApiErrors(message, 404);
          } else if (row[0].buyer == buyer || user.is_admin == true) {
            const updateQuery = `UPDATE orders SET "status" = $3 WHERE id = $1 AND buyer = $2
                                    RETURNING id, buyer, "car_id", amount, status, "price_offered", "oldPrice_offered"`;
            const values = [id, buyer, order_status];
            const { rows } = await dbConfig.query(updateQuery, values);
            res.status(200).json({
              data: rows[0],
              message: `Successfully updated the order status to ${order_status}.`,
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
        if (user.user_id && user.is_admin == true) {
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
    var message;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.user_id) {
          const { rows } = await dbConfig.query('SELECT id, buyer, "car_id", amount, status, "price_offered",'
                                                  + ' "oldPrice_offered" FROM orders WHERE buyer = $1', [user.user_id]);
          if (rows.length == 0) {
             message = `There is no order currently stored in the database for user with id: ${user.user_id}.`;
          } else {
            message = `Successfully retrieved all orders from the database for user with id: ${user.user_id}.`;
          }
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
        if (user.user_id) {
          const rows = (user.is_admin == true)
            ? (await this.returnOrderById(order_id))
            : (await this.returnOrderByIdAndBuyer(order_id, { ...user }));
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
  async returnOrderById(order_id) {
    const queryText = 'SELECT * FROM orders WHERE id = $1';
    const { rows } = await dbConfig.query(queryText, [order_id]);
    return rows;
  },

  // This method returns an order of a particular user...
  async returnOrderByIdAndBuyer(order_id, { user_id }) {
    const queryText = 'SELECT id, buyer, "car_id", amount, status, "price_offered", "oldPrice_offered"'
                    + ' FROM orders WHERE id = $1 AND buyer = $2';
    const values = [order_id, user_id];
    const { rows } = await dbConfig.query(queryText, values);
    return rows;
  },

  // This method handles the request to delete an order by id...
  async deleteOrderModel(req, res) {
    try {
      const { order_id } = req.params;
      const { authorization } = req.headers;
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.user_id) {
          const row = await this.returnOrderByIdAndBuyer(order_id, { ...user });
          if (row.length >= 1) {
            const deleteQuery = 'DELETE FROM orders WHERE id = $1';
            const { rows } = await dbConfig.query(deleteQuery, [order_id]);
            res.status(200).json({
              message: `Successfully deleted order with id: ${order_id} from the database.`,
              status: 200,
            });
          } else {
            const message = `The order with id: ${order_id} was not found.`;
            cannotFind(message);
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
};

export default OrdersModel;
