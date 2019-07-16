import dbConfig from '../dbConfig';
import ApiErrors from '../Services/errorClass';
import AuthorizeUser from '../Services/authorizer';
import { Constants } from '../Services';
import CarsHelper from '../Helpers/carHelper';

const { verifyUser } = AuthorizeUser;
const {
  cannotUpdateAd, cannotFind, invalidToken, notAuthorizedMessage,
  supplyAuthHeader, supplyBodyValue,
} = Constants;
const { carErrorResponse, getCarResponse } = CarsHelper;


const CarsModel = {

  // This is the methd that handles the creation of a new car ad...
  async createNewCarAdModel(req, res) {
    const { body, headers } = req;
    const { authorization } = headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.user_id) {
          body.owner = user.user_id;
          const {
            owner, state, status, price, manufacturer, model, body_type, images,
          } = body;
          const createCarQuery = `INSERT INTO
            cars(owner, state, status, price, manufacturer, model, "body_type", images)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING owner, state, status, price, manufacturer, model, "body_type", images`;
          const values = [owner, state, status, price, manufacturer, model, body_type, images];
          const { rows } = await dbConfig.query(createCarQuery, values);
          res.status(201).json({
            data: rows[0],
            message: 'Successfully created new car Ad.',
            status: 201,
          });
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      carErrorResponse(err, res);
      console.log("cre... id" + err);
      console.log("cre...id5q" + {...req});
      console.log("cre...id5s" + {...res});
    }
  },

  // This is the method that handles the request to update the price of a car...
  async updateCarPriceModel(req, res) {
    const { body, headers, params } = req;
    const { authorization } = headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else if (body.price == null || body.price == undefined) {
        const message = 'Please supply price to update.';
        supplyBodyValue(message);
      } else {
        const user = await verifyUser(authorization, res);
        if (user.user_id) {
          body.id = params.car_id;
          body.owner = user.user_id;
          const { id, owner, price } = body;
          const rows = await this.getCarByIsAdmin(user.is_admin, res, id);
          if (rows.length >= 1 && rows[0].owner == owner) {
            const updateQuery = `UPDATE cars SET price = $3 WHERE id = $1 AND owner = $2
                                    RETURNING owner, state, status, price, manufacturer, model, "body_type", images`;
            const values = [id, owner, price];
            const { rows } = await dbConfig.query(updateQuery, values);
            res.status(200).json({
              data: rows[0],
              message: `Successfully updated the price of the Ad to ${price}.`,
              status: 200,
            });
          } else {
            cannotUpdateAd(owner);
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      carErrorResponse(err, res);
    }
  },

  // This is the method that handles the update of the car sold status...
  async updateCarStatusModel(req, res) {
    const { body, headers, params } = req;
    const { authorization } = headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.user_id) {
          body.id = params.car_id;
          body.owner = user.user_id;
          const { id, owner, status } = body;
          const rows = await this.getCarByIsAdmin(user.is_admin, res, id);
          if (rows.length >= 1 && rows[0].owner == owner) {
            const updateQuery = `UPDATE cars SET status = $3 WHERE id = $1 AND owner = $2
                                  RETURNING owner, state, status, price, manufacturer, model, "body_type", images`;
            const values = [id, owner, status];
            const { rows } = await dbConfig.query(updateQuery, values);
            res.status(200).json({
              data: rows[0],
              message: `Successfully updated the status of the Ad to ${status}.`,
              status: 200,
            });
          } else {
            cannotUpdateAd(owner);
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      carErrorResponse(err, res);
    }
  },

  // This method handles the request to get all cars...
  async getAllCarsModel(req, res) {
    const { body, headers, query } = req;
    const { authorization } = headers;
    const queryParam = query;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.user_id) {
          // This block returns the cars in the database if no query string is sent by client...
          if (Object.getOwnPropertyNames(queryParam).length === 0) {
            const rows = await this.getCarByIsAdmin(user.is_admin, res);
            getCarResponse(res, rows);
          }
          // This block returns the cars in the database if query string is sent by client...
          else {
            const rows = (queryParam.body_type)
              ? (await this.getCarsByQueryParam(user.is_admin, { ...queryParam }, res))
              : (// if the car state was supplied in the query string...
                (queryParam.state)
                  ? (await this.getCarsByQueryParam(user.is_admin, { ...queryParam }, res))
                  : (// if the car status was supplied in the query string....
                    (queryParam.status)
                      ? (await this.getCarsByQueryParam(user.is_admin, { ...queryParam }, res))
                      : (// if the car manufacturer was supplied in the query string....
                        (queryParam.manufacturer)
                          ? (await this.getCarsByQueryParam(user.is_admin, { ...queryParam }, res))
                          : (// if the car price range was supplied in the query string....
                            (queryParam.max_price || queryParam.min_price)
                              ? (await this.getCarsByQueryParam(user.is_admin, { ...queryParam }, res))
                              : (new ApiErrors('The query string supplied is not correct.', 500))
                          )
                      )
                  )
              );
            getCarResponse(res, rows, queryParam);
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      carErrorResponse(err, res);
    }
  },

  async getCarByIdModel(req, res) {
    const { car_id } = req.params;
    const { authorization } = req.headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.user_id) {
          const rows = await this.getCarByIsAdmin(user.is_admin, res, car_id);
          if (rows.length == 0) {
            cannotFind(car_id);
          } else {
            res.status(200).json({
              data: rows[0],
              status: 200,
            });
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      carErrorResponse(err, res);
      console.log("car... id" + err);
      console.log("car...id5q" + {...req});
      console.log("car...id5s" + {...res});
    }
  },

  async getCarsByQueryParam(is_admin, queryParam, res) {
    const colToQuery = Object.getOwnPropertyNames(queryParam);
    const value = Object.values(queryParam);
    let returnRows;
    try {
      if (colToQuery.length > 1) {
        const { rows } = (is_admin == true)
          ? (await dbConfig.query('SELECT * FROM cars WHERE price >= $1 AND price <= $2',
            [value[1], value[0]]))
          : (await dbConfig.query('SELECT * FROM cars WHERE status = $1 AND price >= $2 AND price <= $3',
            ['available', value[1], value[0]]));
        returnRows = rows;
      } else {
        const { rows } = (is_admin == true)
          ? (await dbConfig.query(`SELECT * FROM cars WHERE "${colToQuery[0]}" = $1`, [value[0]]))
          : (await dbConfig.query(`SELECT * FROM cars WHERE status = $1 AND "${colToQuery[0]}" = $2`,
            ['available', value[0]]));
        returnRows = rows;
      }
      return returnRows;
    } catch (err) {
      carErrorResponse(err, res);
    }
  },

  async getCarByIsAdmin(is_admin, res, car_id) {
    let returnRows;
    try {
      if (car_id == null || car_id == undefined) {
        const { rows } = (is_admin == true)
          ? (await dbConfig.query('SELECT * FROM cars'))
          : (await dbConfig.query('SELECT * FROM cars WHERE status = $1', ['available']));
        returnRows = rows;
      } else {
        const { rows } = (is_admin == true)
          ? (await dbConfig.query('SELECT * FROM cars WHERE id = $1', [car_id]))
          : (await dbConfig.query('SELECT * FROM cars WHERE status = $1 AND id = $2',
            ['available', car_id]));
        returnRows = rows;
      }
      return returnRows;
    } catch (err) {
      carErrorResponse(err, res);
    }
  },

  // This method handles the request to delete a car by id...
  async deleteCarModel(req, res) {
    try {
      const { car_id } = req.params;
      const { authorization } = req.headers;
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.is_admin == true) {
          const rows = await this.getCarByIsAdmin(user.is_admin, res, car_id);
          if (rows.length >= 1) {
            const deleteQuery = 'DELETE FROM cars WHERE id = $1';
            const { rows } = await dbConfig.query(deleteQuery, [car_id]);
            res.status(200).json({
              data: rows,
              message: `Successfully deleted car with id: ${car_id} from the database.`,
              status: 200,
            });
          } else {
            const message = `The car with id: ${car_id} was not found.`;
            cannotFind(message);
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      carErrorResponse(err, res);
    }
  },
};

export default CarsModel;
