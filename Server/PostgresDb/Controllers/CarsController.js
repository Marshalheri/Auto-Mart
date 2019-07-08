import CarsModel from '../Models/carsModel';

export class CarsController {
  // This is the method that handles the creation of a new car ad...
  createNewCarAd(req, res) {
    CarsModel.createNewCarAdModel(req, res);
  }

  // This is the method that handles the update of a car price...
  updateCarPrice(req, res) {
    CarsModel.updateCarPriceModel(req, res);
  }

  // This is the method that handles the update of a car status...
  updateCarStatus(req, res) {
    CarsModel.updateCarStatusModel(req, res);
  }


  // This is the method that handles the request to get all car Ads...
  getAllCars(req, res) {
    CarsModel.getAllCarsModel(req, res);
  }

  // This is the method that handles the request to get car Ad by id...
  getCarById(req, res) {
    CarsModel.getCarByIdModel(req, res);
  }

  deleteCar(req, res) {
    CarsModel.deleteCarModel(req, res);
  }
}
