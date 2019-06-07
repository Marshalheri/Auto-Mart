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

  // This method gets all unsold cars in the database...
  getUnsoldCarsHelper: () => {
    const status = 'available';
    const unsoldCarsDb = [];
    carsDb.forEach((car) => {
      if (car.status === status) {
        unsoldCarsDb.push(car);
      }
    });
    return unsoldCarsDb;
  },

  // This method gets all  cars in the database by body_type...
  getCarsByBodyHelper: (allCars, { body_type }) => {
    const sortedCarsDb = [];
    if (body_type != undefined || body_type != null) {
      allCars.forEach((car) => {
        if (car.body_type == body_type) {
          sortedCarsDb.push(car);
        }
      });
    }
    return sortedCarsDb;
  },

  // This method gets all  cars in the database by price range...
  getCarsByPriceRange: (allCars, { min_price, max_price }) => {
    const sortedCarsDb = [];
    if (min_price != undefined || max_price != undefined) {
      allCars.forEach((car) => {
        if (car.price >= min_price && car.price <= max_price) {
          sortedCarsDb.push(car);
        }
      });
    }
    return sortedCarsDb;
  },

  // This method gets all  cars in the database by state (used or new)...
  getCarsByState: (allCars, { state }) => {
    const sortedCarsDb = [];
    if (state != undefined || state != undefined) {
      allCars.forEach((car) => {
        if (car.state == state) {
          sortedCarsDb.push(car);
        }
      });
    }
    return sortedCarsDb;
  },

  // This method gets all cars in the database by status...
  getCarsByStatusHelper: (allCars, { status }) => {
    const sortedCarsDb = [];
    if (status != undefined || status != undefined) {
      allCars.forEach((car) => {
        if (car.status == status) {
          sortedCarsDb.push(car);
        }
      });
    }
    return sortedCarsDb;
  },

  // This method gets all cars in the database by manufacturer...
  getCarsByManufacturerHelper: (allCars, { manufacturer }) => {
    const sortedCarsDb = [];
    if (manufacturer != undefined || manufacturer != undefined) {
      allCars.forEach((car) => {
        if (car.manufacturer == manufacturer) {
          sortedCarsDb.push(car);
        }
      });
    }
    return sortedCarsDb;
  },

  // This method gets a car by its id...
  getCarByIdHelper: (car_id, sortedCarsDb) => {
    let car = null;
    sortedCarsDb.some((eachCar) => {
      if (eachCar.id == car_id) {
        car = eachCar;
      }
    });

    return car;
  },

};

export default CarsHelper;
