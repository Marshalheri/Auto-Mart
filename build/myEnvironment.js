"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.environment = void 0;

var _dotenv = require("dotenv");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)({
  path: _path["default"].join(__dirname, '/.env')
});
var environment = {
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
};
exports.environment = environment;