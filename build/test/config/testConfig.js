"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.request = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _supertest = _interopRequireDefault(require("supertest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var request = _supertest["default"];
exports.request = request;
var _default = _chai["default"];
exports["default"] = _default;