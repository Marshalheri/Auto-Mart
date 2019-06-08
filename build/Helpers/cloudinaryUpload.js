"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloudinary_upload = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _multerStorageCloudinary = _interopRequireDefault(require("multer-storage-cloudinary"));

var _myEnvironment = require("../myEnvironment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cloudinary_cloud_name = _myEnvironment.environment.cloudinary_cloud_name,
    cloudinary_api_key = _myEnvironment.environment.cloudinary_api_key,
    cloudinary_api_secret = _myEnvironment.environment.cloudinary_api_secret;

_cloudinary["default"].config({
  cloudinary_cloud_name: cloudinary_cloud_name,
  cloudinary_api_key: cloudinary_api_key,
  cloudinary_api_secret: cloudinary_api_secret
});

var cloudinary_storage = (0, _multerStorageCloudinary["default"])({
  cloudinary: _cloudinary["default"],
  allowedFormats: ['jpg', 'png', 'jpeg']
});

var cloudinary_upload = function cloudinary_upload() {
  return (0, _multer["default"])({
    cloudinary_storage: cloudinary_storage
  });
};

exports.cloudinary_upload = cloudinary_upload;