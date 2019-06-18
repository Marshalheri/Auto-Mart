import ApiErrors from '../Helpers/errorClass';
import HandleUserHeader from '../Helpers/authorizer';
import CarsHelper from '../Helpers/flagsHelper';

const FlagServices = {

  flagErrResService: (err, res) => {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: err.statusCode || err.status,
    });
  },
};

export default FlagServices;
