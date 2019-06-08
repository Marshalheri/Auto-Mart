"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errorClass = _interopRequireDefault(require("./errorClass"));

var _Models = require("../Models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var carsDb = _Models.carsModel.carsDb;

var getCarByIdFunc = function getCarByIdFunc(car_id) {
  var car = null;
  carsDb.some(function (eachCar) {
    if (eachCar.id == car_id) {
      car = eachCar;
    }
  });
  return car;
};

var CarsHelper = {
  // This method creates a new car...
  createNewCar: function createNewCar(body) {
    var newCarId = carsDb.length + 1;
    var newCarPayload = {
      id: newCarId,
      owner: body.owner,
      created_on: new Date(),
      state: body.carState,
      status: body.carStatus,
      price: body.carPrice,
      manufacturer: body.carManufacturer,
      model: body.carModel,
      body_type: body.carBodyType
    }; // Push the new car payload into the database....

    carsDb.push(newCarPayload);
    return newCarPayload;
  },
  // This method updates the price of the car...
  updateCarPriceHelper: function updateCarPriceHelper(_ref) {
    var car_id = _ref.car_id,
        carPrice = _ref.carPrice,
        owner = _ref.owner;
    var index = car_id - 1;
    var carToUpdate = getCarByIdFunc(car_id);

    if (carToUpdate.owner != owner) {
      var message = "Car Ad with id ".concat(car_id, " was not found.");
      throw new _errorClass["default"](message, 404);
    } else {
      carToUpdate.price = carPrice;
      carsDb.splice(index, 1, carToUpdate);
      return carToUpdate;
    }
  },
  // This method updates the status of the car...
  updateCarSoldHelper: function updateCarSoldHelper(_ref2) {
    var car_id = _ref2.car_id,
        carStatus = _ref2.carStatus,
        owner = _ref2.owner;
    var index = car_id - 1;
    var carToUpdate = getCarByIdFunc(car_id);

    if (carToUpdate.owner != owner) {
      var message = "Car Ad with id ".concat(car_id, " was not found.");
      throw new _errorClass["default"](message, 404);
    } else {
      carToUpdate.status = carStatus;
      carsDb.splice(index, 1, carToUpdate);
      return carToUpdate;
    }
  },
  // This method gets all cars in the database...
  getAllCarsHelper: function getAllCarsHelper() {
    return carsDb;
  },
  // This method gets all unsold cars in the database...
  getUnsoldCarsHelper: function getUnsoldCarsHelper() {
    var status = 'available';
    var unsoldCarsDb = [];
    carsDb.forEach(function (car) {
      if (car.status === status) {
        unsoldCarsDb.push(car);
      }
    });
    return unsoldCarsDb;
  },
  // This method gets all  cars in the database by body_type...
  getCarsByBodyHelper: function getCarsByBodyHelper(allCars, _ref3) {
    var body_type = _ref3.body_type;
    var sortedCarsDb = [];

    if (body_type != undefined || body_type != null) {
      allCars.forEach(function (car) {
        if (car.body_type == body_type) {
          sortedCarsDb.push(car);
        }
      });
    }

    return sortedCarsDb;
  },
  // This method gets all  cars in the database by price range...
  getCarsByPriceRange: function getCarsByPriceRange(allCars, _ref4) {
    var min_price = _ref4.min_price,
        max_price = _ref4.max_price;
    var sortedCarsDb = [];

    if (min_price != undefined || max_price != undefined) {
      allCars.forEach(function (car) {
        if (car.price >= min_price && car.price <= max_price) {
          sortedCarsDb.push(car);
        }
      });
    }

    return sortedCarsDb;
  },
  // This method gets all  cars in the database by state (used or new)...
  getCarsByState: function getCarsByState(allCars, _ref5) {
    var state = _ref5.state;
    var sortedCarsDb = [];

    if (state != undefined || state != undefined) {
      allCars.forEach(function (car) {
        if (car.state == state) {
          sortedCarsDb.push(car);
        }
      });
    }

    return sortedCarsDb;
  },
  // This method gets all cars in the database by status...
  getCarsByStatusHelper: function getCarsByStatusHelper(allCars, _ref6) {
    var status = _ref6.status;
    var sortedCarsDb = [];

    if (status != undefined || status != undefined) {
      allCars.forEach(function (car) {
        if (car.status == status) {
          sortedCarsDb.push(car);
        }
      });
    }

    return sortedCarsDb;
  },
  // This method gets all cars in the database by manufacturer...
  getCarsByManufacturerHelper: function getCarsByManufacturerHelper(allCars, _ref7) {
    var manufacturer = _ref7.manufacturer;
    var sortedCarsDb = [];

    if (manufacturer != undefined || manufacturer != undefined) {
      allCars.forEach(function (car) {
        if (car.manufacturer == manufacturer) {
          sortedCarsDb.push(car);
        }
      });
    }

    return sortedCarsDb;
  },
  // This method gets a car by its id...
  getCarByIdHelper: function getCarByIdHelper(car_id, sortedCarsDb) {
    var car = null;
    sortedCarsDb.some(function (eachCar) {
      if (eachCar.id == car_id) {
        car = eachCar;
      }
    });
    return car;
  }
};
var _default = CarsHelper;
exports["default"] = _default;