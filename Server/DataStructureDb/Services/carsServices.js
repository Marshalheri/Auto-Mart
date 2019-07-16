import ApiErrors from '../Helpers/errorClass';
import HandleUserHeader from '../Helpers/authorizer';
import CarsHelper from '../Helpers/carsHelper';

const { getAllCarsHelper, getUnsoldCarsHelper, deleteCarByIdHelper } = CarsHelper;

const CarServices = {
  getAllCarsService: async (authorization) => {
    const user = await HandleUserHeader.getUserToken(authorization);
    let allCars = [];
    if (user == null || user == undefined) {
      allCars = getUnsoldCarsHelper();
    } else if (user.is_admin === true && user.token === authorization) {
      allCars = getAllCarsHelper();
    } else {
      const message = 'You have made a bad request.';
      throw new ApiErrors(message, 400);
    }
    return allCars;
  },

  deleteCarByIdService: async (authorization, car_id) => {
    const user = await HandleUserHeader.getUserToken(authorization);
    let deleteServiceData;
    if (user == null || user == undefined) {
      const message = 'Please supply a valid admin authorization header to delete an Ad.';
      throw new ApiErrors(message, 401);
    } else if (user.is_admin === true && user.token === authorization) {
      deleteServiceData = deleteCarByIdHelper(car_id);
    }
    return deleteServiceData;
  },

  getCarResService: (res, message, allCars) => {
    if (allCars.length == 0) {
      res.status(200).json({
        message,
        status: 200,
      });
    } else {
      res.status(200).json({
        data: allCars,
        message: 'Successfully retrieved all cars from the database.',
        status: 200,
      });
    }
  },

  carErrResService: (err, res) => {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: err.statusCode || err.status,
    });
  },
};


export default CarServices;
