
const OrdersHelper = {

  getOrdersResponse(res, rows, user, message) {
    (rows.length == 0)
      ? (res.status(200).json({
        message: message || 'There is no order currently stored in the database.',
        status: 200,
      }))
      : (res.status(200).json({
        data: rows,
        message: message || 'Successfully retrieved all orders from the database.',
        status: 200,
      }));
  },

  orderErrorResponse(err, res) {
    let message;
    let statusCode;
    if (err.code == '22P02') {
      message = 'Ensure that all values supplied for this request are of a valid data type.';
      statusCode = 400;
    } else if (err.code == '23502') {
      message = `Please the value of ${err.column} cannot be null.`;
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

export default OrdersHelper;
