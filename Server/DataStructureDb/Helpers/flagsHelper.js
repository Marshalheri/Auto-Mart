import ApiErrors from './errorClass';
import { flagsModel } from '../Models';

const { flagsDb } = flagsModel;

const FlagsHelper = {

  // THis method will create a new flag...
  createNewFlagHelper: (body) => {
    const newFlagId = flagsDb.length + 1;
    const newFlagPayload = {
      id: newFlagId,
      car_id: body.car_id,
      created_on: new Date(),
      reason: body.reason,
      description: body.description,
    };

    // Push the new flag payload into the database....
    flagsDb.push(newFlagPayload);
    return newFlagPayload;
  },
};

export default FlagsHelper;
