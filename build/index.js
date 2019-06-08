"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _appConfig = _interopRequireDefault(require("./config/appConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 3000;
var appConfig = new _appConfig["default"]();
appConfig.configure(app); // This is where i use express to serve my html files in the UI folder.....

app.use(_express["default"]["static"](_path["default"].join(__dirname, 'UI')));
app.listen(PORT, function () {
  console.log("listening on port: ".concat(PORT));
});
var _default = app;
exports["default"] = _default;