"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersModel = void 0;

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jwtKey = require("../Key/jwtKey");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jwtKey = _jwtKey.jwtKeyObj.jwtKey;

var token = _jsonwebtoken["default"].sign({
  email: 'chizyberto@gmail.com'
}, jwtKey);

var usersModel = {
  userDb: [{
    id: 1,
    email: 'chizyberto@gmail.com',
    first_name: 'Chizoba',
    last_name: 'Nnamani',
    password: (0, _bcryptjs.hashSync)('adminpassword', (0, _bcryptjs.genSaltSync)(10)),
    address: '79, osho drive olodi apapa lagos',
    is_admin: true,
    phone_number: '+2348162956658',
    token: token
  }]
};
exports.usersModel = usersModel;