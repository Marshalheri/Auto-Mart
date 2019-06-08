"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AppConfig =
/*#__PURE__*/
function () {
  function AppConfig() {
    _classCallCheck(this, AppConfig);
  }

  _createClass(AppConfig, [{
    key: "configure",
    value: function configure(app) {
      app.use((0, _bodyParser.json)());
      app.use((0, _bodyParser.urlencoded)({
        extended: true
      }));
      app.use((0, _morgan["default"])('dev'));
      app.use('/api/v1', _routes["default"]);
      app.use('*', function (req, res) {
        res.status(404).json({
          success: false,
          meessage: 'Resource not found.',
          possibleCauses: ['Maybe you the url wrong'],
          solution: 'Check that the address you entered is correct.'
        });
      });
    }
  }]);

  return AppConfig;
}();

exports["default"] = AppConfig;