import { usersModel } from '../Models';
import ApiErrors from '../Helpers/errorClass';
import HandleUserHeader from '../Helpers/authorizer';
import CarsHelper from '../Helpers/carsHelper';

const { userDb } = usersModel;
const {
  createNewCar, updateCarPriceHelper,
  updateCarSoldHelper, getAllCarsHelper,
  getCarByIdHelper,
} = CarsHelper;

export class CarsController {
  // This is the methd that handles the ceatin of a new car ad...
  async createNewCarAd(req, res) {
    try {
      const { body, headers } = req;
      const token = headers.authorization;
      const user = await HandleUserHeader.getUserToken(token);
      if (user != null || user != undefined) {
        body.owner = user.id;
        const newCreatedCar = createNewCar(body);
        res.status(201).json({
          data: newCreatedCar,
          message: 'Successfully created new car Ad.',
          status: 201,
        });
      } else {
        const message = 'Signup or Signin to create an Ad.';
        throw new ApiErrors(message, 401);
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || err.status,
      });
    }
  }

  // This is the method that handles the request to update the price of a car...
  async updateCarPice(req, res) {
    try {
      const { body, headers, params } = req;
      const token = headers.authorization;
      const user = await HandleUserHeader.getUserToken(token);
      if (user != null || user != undefined) {
        body.car_id = params.car_id;
        body.owner = user.id;
        const updatedCarPrice = await updateCarPriceHelper(body);
        if (updatedCarPrice != null || updatedCarPrice != undefined) {
          res.status(200).json({
            data: updatedCarPrice,
            message: `Successfully updated the price of the Ad to ${updatedCarPrice.price}.`,
            status: 200,
          });
        }
      } else {
        const message = 'You are not authorized to update the price of the Ad.';
        throw new ApiErrors(message, 401);
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || err.status,
      });
    }
  }

  // This is the method that handles the update of the car sold status...
  async updateCarSoldStatus(req, res) {
    try {
      const { body, headers, params } = req;
      const token = headers.authorization;
      const user = await HandleUserHeader.getUserToken(token);
      if (user != null || user != undefined) {
        body.car_id = params.car_id;
        body.owner = user.id;
        const updatedCarSold = await updateCarSoldHelper(body);
        if (updatedCarSold != null || updatedCarSold != undefined) {
          res.status(200).json({
            data: updatedCarSold,
            message: `Successfully updated the status of the Ad to ${updatedCarSold.status}.`,
            status: 200,
          });
        }
      } else {
        const message = 'You are not authorized to update the status of the Ad.';
        throw new ApiErrors(message, 401);
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || err.status,
      });
    }
  }

  // This method handles the request to get all cars...
  async getAllCars(req, res) {
    try {
      const allCars = getAllCarsHelper();
      if (allCars == []) {
        res.status(200).json({
          message: 'There is no car currently stored in the database.',
          status: 200,
        });
      } else {
        res.status(200).json({
          data: allCars,
          message: 'Successfully retrieved all cars from the database.',
          status: 200,
        });
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || err.status,
      });
    }
  }

  // This method handles the request to get car by id...
  async getCarById(req, res) {
    try {
      const { car_id } = req.params;
      const car = getCarByIdHelper(car_id);
      res.status(200).json({
        data: car,
        message: `Successfully retrieved car with id: ${car_id} from the database.`,
        status: 200,
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || err.status,
      });
    }
  }
}
