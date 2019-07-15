import dbConfig from '../dbConfig';
import ApiErrors from '../Services/errorClass';
import AuthorizeUser from '../Services/authorizer';
import { Constants } from '../Services';
import FlagsHelper from '../Helpers/flagHelper';
import CarsModel from './carsModel';

const { verifyUser } = AuthorizeUser;
const {
  cannotUpdateAd, cannotFind, invalidToken, notAuthorizedMessage,
  supplyAuthHeader, supplyBodyValue,
} = Constants;
const { flagErrorResponse, getFlagsResponse } = FlagsHelper;
const { getCarByIsAdmin } = CarsModel;

const FlagsModel = {

  // This is the method that handles the request to create new flag...
  async createNewFlagModel(req, res) {
    const { body, headers } = req;
    const { authorization } = headers;
    const queryParam = req.query;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        body.carId = queryParam.car_id;
        if (user.user_id) {
          const row = await getCarByIsAdmin(user.is_admin, res, body.car_id);
          if (row.length == 0) {
            const message = `The car with id: ${body.car_id} was not found.`;
            cannotFind(message);
          } else {
            body.creator = user.user_id;
            const {
              creator, car_id, reason, description,
            } = body;
            const createFlagQuery = `INSERT INTO
                flags(creator, "car_id", reason, description)
                VALUES($1, $2, $3, $4)
                RETURNING id, creator, "car_id", reason, description`;
            const values = [creator, car_id, reason, description];
            const { rows } = await dbConfig.query(createFlagQuery, values);
            res.status(201).json({
              data: rows,
              message: 'Successfully created new flag.',
              status: 201,
            });
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      flagErrorResponse(err, res);
    }
  },

  // This is the method that handles the request to get all flags...
  async getAllFlagsModels(req, res) {
    const { authorization } = req.headers;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.is_admin == true) {
          const { rows } = await dbConfig.query('SELECT * FROM flags');
          getFlagsResponse(res, rows, user);
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      flagErrorResponse(err, res);
    }
  },

  // This is the method that handles the request to get flag by id....
  async getFlagsByIdModel(req, res) {
    const { authorization } = req.headers;
    const { flag_id } = req.params;
    try {
      if (authorization == null || authorization == undefined) {
        supplyAuthHeader();
      } else {
        const user = await verifyUser(authorization, res);
        if (user.is_admin == true) {
          const rows = await this.returnFlagById(flag_id);
          if (rows.length == 0) {
            const message = `Flag with id ${flag_id} was not found.`;
            throw new ApiErrors(message, 404);
          } else {
            const message = `Successfully retrieved flag with id: ${flag_id} from the database.`;
            getFlagsResponse(res, rows, user, message);
          }
        } else {
          (user.name == 'JsonWebTokenError')
            ? (invalidToken(user)) : (notAuthorizedMessage());
        }
      }
    } catch (err) {
      flagErrorResponse(err, res);
    }
  },

  // This method returns the flag whose id is passed to it..,
  async returnFlagById(flag_id) {
    const queryText = 'SELECT * FROM flags WHERE id = $1';
    const { rows } = await dbConfig.query(queryText, [flag_id]);
    return rows;
  },
  
};

export default FlagsModel;
