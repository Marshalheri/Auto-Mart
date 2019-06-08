"use strict";

var _chai = _interopRequireDefault(require("chai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Sample Test File To Print Hello World', function () {
  it('should print out hello world', function () {
    var welcomeMsg = 'Hello World';

    _chai["default"].expect(welcomeMsg).to.be.a('string');
  });
});