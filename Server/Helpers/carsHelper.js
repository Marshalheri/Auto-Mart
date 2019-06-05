import ApiErrors from './errorClass';
import { carsModel } from '../Models';

const { carsDb } = carsModel;

const getCarByIdFunc = (car_id) => {
  let car = null;
  carsDb.some((eachCar) => {
    if (eachCar.id == car_id) {
      car = eachCar;
    }
  });
  return car;
};

const CarsHelper = {
  // This method creates a new car...
  createNewCar: (body) => {
    const newCarId = carsDb.length + 1;
    const newCarPayload = {
      id: newCarId,
      owner: body.owner,
      created_on: new Date(),
      state: body.carState,
      status: body.carStatus,
      price: body.carPrice,
      manufacturer: body.carManufacturer,
      model: body.carModel,
      body_type: body.carBodyType,
    };

    // Push the new car payload into the database....
    carsDb.push(newCarPayload);
    return newCarPayload;
  },

  // This method updates the price of the car...
  updateCarPriceHelper: ({ car_id, carPrice, owner }) => {
    const index = car_id - 1;

    const carToUpdate = getCarByIdFunc(car_id);

    if (carToUpdate.owner != owner) {
      const message = `Car Ad with id ${car_id} was not found.`;
      throw new ApiErrors(message, 404);
    } else {
      carToUpdate.price = carPrice;
      carsDb.splice(index, 1, carToUpdate);
      return carToUpdate;
    }
  },

  // This method updates the status of the car...
  updateCarSoldHelper: ({ car_id, carStatus, owner }) => {
    const index = car_id - 1;

    const carToUpdate = getCarByIdFunc(car_id);

    if (carToUpdate.owner != owner) {
      const message = `Car Ad with id ${car_id} was not found.`;
      throw new ApiErrors(message, 404);
    } else {
      carToUpdate.status = carStatus;
      carsDb.splice(index, 1, carToUpdate);
      return carToUpdate;
    }
  },

  // This method gets all cars in the database...
  getAllCarsHelper: () => carsDb,

  // This method gets a car by its id...
  getCarByIdHelper: (car_id) => {
    let car = null;
    carsDb.some((eachCar) => {
      if (eachCar.id == car_id) {
        car = eachCar;
      } else {
        const message = `Car Ad with id ${car_id} was not found.`;
        throw new ApiErrors(message, 404);
      }
    });

    return car;
  },

};

export default CarsHelper;
