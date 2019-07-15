import FlagsModel from '../Models/flagsModel';

export class FlagsController {
  // This is the method that handles the request to create new order...
  createNewFlag(req, res) {
    FlagsModel.createNewFlagModel(req, res);
  }

  // This is the method that handles the request to get all flags...
  getAllFlags(req, res) {
    FlagsModel.getAllFlagsModels(req, res);
  }

  // This is the method that handles the request to get flag by id....
  getFlagsById(req, res) {
    FlagsModel.getFlagsByIdModel(req, res);
  }

}
