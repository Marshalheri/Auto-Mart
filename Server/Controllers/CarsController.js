import { usersModel } from '../Models';
import ApiErrors from '../Helpers/errorClass';
import HandleUserHeader from '../Helpers/authorizer';
import CarsHelper from '../Helpers/carsHelper';
import CarServices from '../Services/carsServices';

const { userDb } = usersModel;
const {
  createNewCar, updateCarPriceHelper,
  updateCarSoldHelper, getCarByIdHelper,
  getCarsByBodyHelper, getCarsByPriceRange,
  getCarsByState, getCarsByStatusHelper,
  getCarsByManufacturerHelper,
} = CarsHelper;

export class CarsController {
  // This is the methd that handles the creation of a new car ad...
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
      CarServices.carErrResService(err, res);
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
      CarServices.carErrResService(err, res);
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
      CarServices.carErrResService(err, res);
    }
  }

  // This method handles the request to get all cars...
  async getAllCars(req, res) {
    try {
      const { authorization } = req.headers;
      const allCars = await CarServices.getAllCarsService(authorization);
      const queryParam = req.query;

      // This block returns the cars in the database if no query string is sent by client...
      if (Object.getOwnPropertyNames(queryParam).length === 0) {
        const optMessage = 'There is no car currently stored in the database.';
        CarServices.getCarResService(res, optMessage, allCars);
      }
      // This block returns the cars in the database if query string is sent by client...
      else {
        const returnedCars = (queryParam.body_type)
          ? (
            await getCarsByBodyHelper(allCars, { ...queryParam })
          )
          : (// if the car price range was supplied in the query string....
            (queryParam.max_price || queryParam.min_price)
              ? (await getCarsByPriceRange(allCars, { ...queryParam }))
              : (// if the car state was supplied in the query string...
                (queryParam.state)
                  ? (await getCarsByState(allCars, { ...queryParam }))
                  : (// if the car status was supplied in the query string....
                    (queryParam.status)
                      ? (await getCarsByStatusHelper(allCars, { ...queryParam }))
                      : ( // if the car manufacturer was supplied in the query string....
                        (queryParam.manufacturer)
                          ? (await getCarsByManufacturerHelper(allCars, { ...queryParam }))
                          : (new ApiErrors('The query string supplied is not correct.', 400))
                      )
                  )
              )
          );
        const optMessage = 'There is no car currently stored in the database.';
        CarServices.getCarResService(res, optMessage, returnedCars);
      }
    } catch (err) {
      CarServices.carErrResService(err, res);
    }
  }

  // This method handles the request to get car by id...
  async getCarById(req, res) {
    try {
      const { car_id } = req.params;
      const { authorization } = req.headers;
      const sortedCarsDb = await CarServices.getAllCarsService(authorization);
      const car = getCarByIdHelper(car_id, sortedCarsDb);
      if (car == null || car == undefined) {
        const message = `Car Ad with id ${car_id} was not found.`;
        throw new ApiErrors(message, 404);
      } else {
        res.status(200).json({
          data: car,
          message: `Successfully retrieved car with id: ${car_id} from the database.`,
          status: 200,
        });
      }
    } catch (err) {
      CarServices.carErrResService(err, res);
    }
  }
}
