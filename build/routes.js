"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _swaggerUiExpress = require("swagger-ui-express");

var _Controllers = require("./Controllers");

var _cloudinaryUpload = require("./Helpers/cloudinaryUpload");

var _swagger = _interopRequireDefault(require("../swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
var usersController = new _Controllers.UsersController();
var carsController = new _Controllers.CarsController();
var ordersController = new _Controllers.OrdersController();
var imageUpload = (0, _cloudinaryUpload.cloudinary_upload)();
router.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to the Auto-Mart API',
    status: 200
  });
}); // This is where the swagger file is served....

router.use('/', _swaggerUiExpress.serve);
router.get('/api-docs', (0, _swaggerUiExpress.setup)(_swagger["default"])); // These are the routes where the user authentication and creation will be handled...

router.post('/user-create', usersController.createNewUser);
router.post('/user-login', usersController.loginUser);
router.get('/user-all/:user_id', usersController.getUserById);
router.get('/user-all', usersController.getAllUsers); // These are the routes that handles the creation and management of ad...

router.get('/car-all', carsController.getAllCars);
router.get('/car-all/:car_id', carsController.getCarById);
router.post('/car-create', imageUpload.single('image'), carsController.createNewCarAd);
router.patch('/car-update/price/:car_id', carsController.updateCarPice);
router.patch('/car-update/status/:car_id', carsController.updateCarSoldStatus); // These are the routes that handles the creation and management of orders...

router.get('/order-all', ordersController.getAllOrders);
router.get('/order-all/:order_id', ordersController.getOrdersById);
var _default = router;
exports["default"] = _default;