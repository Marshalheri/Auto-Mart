

const CarsHelper = {

  getCarResponse: (res, rows, queryParam) => {
    let queryName;
    let queryValue;
    if (queryParam) {
      queryName = Object.getOwnPropertyNames(queryParam)[0];
      queryValue = Object.values(queryParam)[0];
    }
    if (rows.length == 0) {
      var message = (queryParam == null || queryParam == undefined)
        ? ('There is no car currently stored in the database.')
        : (`There is no car of ${queryName} = ${queryValue} currently stored in the database.`);
      res.status(200).json({
        message,
        status: 200,
      });
    } else {
      var message = (queryParam == null || queryParam == undefined)
        ? ('Successfully retrieved all cars from the database.')
        : (`Successfully retrieved all cars of ${queryName} = ${queryValue} from the database.`);
      res.status(200).json({
        data: rows,
        message,
        status: 200,
      });
    }
  },

  // This handles the response to an error....
  carErrorResponse: (err, res) => {
    let message;
    let statusCode;
    if (err.code == '22P02') {
      message = 'Ensure that all values supplied for this request are of a valid data type.';
      statusCode = 400;
    } else {
      message = err.message;
    }
    res.status(err.statusCode || statusCode || 500).json({
      message,
      status: err.statusCode || statusCode || 500,
    });
  },
};

export default CarsHelper;
