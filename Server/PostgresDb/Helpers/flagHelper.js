
const FlagsHelper = {

  flagErrorResponse(err, res) {
    let error;
    let statusCode;
    if (err.code == '22P02') {
      error = 'Ensure that all values supplied for this request are of a valid data type.';
      statusCode = 400;
    } else if (err.code == '23502') {
      error = `Please the value of ${err.column} cannot be null.`;
      statusCode = 400;
    } else {
      error = err.message;
    }
    res.status(err.statusCode || statusCode || 500).json({
      error,
      status: err.statusCode || statusCode || 500,
    });
  },

  getFlagsResponse(res, rows, user, message) {
    (rows.length == 0)
    ? (res.status(200).json({
      data: rows,
      message: message || 'There is no flag currently stored in the database.',
      status: 200,
    }))
    : (res.status(200).json({
      data: rows,
      message: message || 'Successfully retrieved all flags from the database.',
      status: 200,
    }));
  },

};

export default FlagsHelper;
