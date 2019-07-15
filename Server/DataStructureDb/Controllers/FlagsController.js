import { flagsModel } from '../Models';
import ApiErrors from '../Helpers/errorClass';
import HandleUserHeader from '../Helpers/authorizer';
import FlagsHelper from '../Helpers/flagsHelper';
import FlagServices from '../Services/flagsServices';

const { getUserToken } = HandleUserHeader;
const { flagErrResService } = FlagServices;
const { createNewFlagHelper } = FlagsHelper;

export class FlagsController {
  // This is the method that will handle the request to create new flag...
  async createNewFlagModel(req, res) {
    try {
      const { body, headers } = req;
      const { authorization } = headers;
      const queryParam = req.query;
      // const { car_id } = req.qeury;
      const user = await getUserToken(authorization);
      if (user != null || user != undefined) {
        body.car_id = queryParam.car_id;
        const newCreatedFlag = createNewFlagHelper(body);
        res.status(201).json({
          data: newCreatedFlag,
          message: 'Successfully created new flag.',
          status: 201,
        });
      } else {
        const message = 'Signup or Signin to flag/report this Ad.';
        throw new ApiErrors(message, 401);
      }
    } catch (err) {
      flagErrResService(err, res);
    }
  }
}
