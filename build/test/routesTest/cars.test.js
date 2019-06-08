"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _testConfig = _interopRequireWildcard(require("../config/testConfig"));

var _ = _interopRequireDefault(require("../.."));

var _jwtKey = require("../../Key/jwtKey");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PATH = '/api/v1';
var jwtKey = _jwtKey.jwtKeyObj.jwtKey;
var carTestPayload = {
  id: 1,
  owner: 1,
  created_on: new Date(),
  state: 'new',
  status: 'available',
  price: 190.0,
  manufacturer: 'Mercedes',
  model: 'Benz 190',
  body_type: 'car'
};
var carTestErrorPayload = {
  id: 1,
  owner: 2,
  created_on: new Date(),
  state: 'new',
  status: 'available',
  price: 190.0,
  manufacturer: 'Mercedes',
  model: 'Benz 190',
  body_type: 'car'
};

var token = _jsonwebtoken["default"].sign({
  email: 'chizyberto@gmail.com'
}, jwtKey);

describe('CARS ROUTES TEST', function () {
  describe('GET REQUEST ROUTES', function () {
    it('should return an array of cars stored in the database', function (done) {
      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all")).end(function (err, res) {
        var body = res.body;

        _testConfig["default"].expect(body.data).to.be["instanceof"](Array);

        done(err);
      });
    });
    it('should return a body object that contains a data and status key', function (done) {
      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all")).end(function (err, res) {
        var body = res.body;

        _testConfig["default"].expect(body).to.haveOwnProperty('data' && 'status');

        done(err);
      });
    });
    it('should return data with; created_on, owner, status, state and price keys', function (done) {
      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all")).end(function (err, res) {
        var data = res.body.data;

        _testConfig["default"].expect(data[0]).to.have.ownProperty('created_on' && 'owner' && 'price' && 'status' && 'state');

        done(err);
      });
    });
    it('should return only cars with status available if user is not admin', function (done) {
      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all")).end(function (err, res) {
        var body = res.body,
            status = res.status;
        var data = body.data;
        var carStatus = data[0].status;
        var length = data.length;

        _testConfig["default"].expect(length).to.be.eql(1);

        _testConfig["default"].expect(carStatus).to.be.eql('available');

        _testConfig["default"].expect(status).to.be.eql(200);

        done(err);
      });
    });
    it('should return a car by its id', function (done) {
      var id = 1;

      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all/").concat(id)).end(function (err, res) {
        var body = res.body,
            status = res.status;

        _testConfig["default"].expect(body).to.have.ownProperty('data');

        _testConfig["default"].expect(status).to.be.eql(200);

        done(err);
      });
    });
    it('should return a 404 if a car id is invalid', function (done) {
      var id = 2;

      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all/").concat(id)).end(function (err, res) {
        var status = res.status;

        _testConfig["default"].expect(status).to.be.eql(404);

        done(err);
      });
    });
    it('should return cars by specific status', function (done) {
      var carStatus = 'available';

      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all?status=").concat(carStatus)).end(function (err, res) {
        var body = res.body,
            status = res.status;

        _testConfig["default"].expect(body).to.have.ownProperty('data');

        _testConfig["default"].expect(status).to.be.eql(200);

        done(err);
      });
    });
    it('should return cars by specific state', function (done) {
      var carState = 'new';

      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all?state=").concat(carState)).end(function (err, res) {
        var body = res.body,
            status = res.status;

        _testConfig["default"].expect(body).to.have.ownProperty('data');

        _testConfig["default"].expect(status).to.be.eql(200);

        done(err);
      });
    });
    it('should return cars by specific body type', function (done) {
      var bodyType = 'car';

      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all?body_type=").concat(bodyType)).end(function (err, res) {
        var body = res.body,
            status = res.status;

        _testConfig["default"].expect(body).to.have.ownProperty('data');

        _testConfig["default"].expect(status).to.be.eql(200);

        done(err);
      });
    });
    it('should return an empty array if manufacturer supplied in query string does not exist', function (done) {
      var manufacturer = 'xxxxxx';

      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/car-all?manufacturer=").concat(manufacturer)).end(function (err, res) {
        var body = res.body,
            status = res.status;

        _testConfig["default"].expect(body).to.not.have.ownProperty('data');

        _testConfig["default"].expect(status).to.be.eql(200);

        done(err);
      });
    });
  }); // Get cars describe ends here...

  describe('POST REQUEST ROUTES', function () {
    describe('Post To Create New Car', function () {
      it('should throw an error if the request header does not have an authorization token', function (done) {
        _testConfig["default"].request(_["default"]).post("".concat(PATH, "/car-create")).send(carTestPayload).end(function (err, res) {
          var status = res.status;

          _testConfig["default"].expect(status).to.be.eql(401);

          done(err);
        });
      });
      it('should throw an error if the user does not exist in the database', function (done) {
        _testConfig["default"].request(_["default"]).post("".concat(PATH, "/car-create")).send(carTestErrorPayload).end(function (err, res) {
          var status = res.status;

          _testConfig["default"].expect(status).to.be.eql(401);

          done(err);
        });
      });
      it('should throw error if authorization header set to create car Ad is invalid ', function (done) {
        _testConfig["default"].request(_["default"]).post("".concat(PATH, "/car-create")).set({
          authorization: "".concat(token)
        }).send(carTestPayload).end(function (err, res) {
          var status = res.status;

          _testConfig["default"].expect(status).to.be.eql(401);

          done(err);
        });
      });
    }); // Post describe ends here......
  });
});