"use strict";

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _testConfig = _interopRequireWildcard(require("../config/testConfig"));

var _ = _interopRequireDefault(require("../.."));

var _jwtKey = require("../../Key/jwtKey");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PATH = '/api/v1';
var jwtKey = _jwtKey.jwtKeyObj.jwtKey;

var token = _jsonwebtoken["default"].sign({
  email: 'chizyberto@gmail.com'
}, jwtKey);

var userTestPayload = {
  id: 1,
  email: 'chizyberto@gmail.com',
  first_name: 'Chizoba',
  last_name: 'Nnamani',
  password: (0, _bcryptjs.hashSync)('adminpassword', (0, _bcryptjs.genSaltSync)(10)),
  address: '79, osho drive olodi apapa lagos',
  is_admin: true,
  phone_number: '+2348162956658',
  token: token
};
describe('USERS ROUTES TEST', function () {
  describe('GET REQUEST ROUTES', function () {
    it('should return an array of users stored in the database', function (done) {
      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/user-all")).end(function (err, res) {
        var body = res.body;

        _testConfig["default"].expect(body.data).to.be["instanceof"](Array);

        done(err);
      });
    });
    it('should return a body object that contains a data and status key', function (done) {
      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/user-all")).end(function (err, res) {
        var body = res.body;

        _testConfig["default"].expect(body).to.haveOwnProperty('data' && 'status');

        done(err);
      });
    });
    it('should return a user by its id', function (done) {
      var id = 1;

      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/user-all/").concat(id)).end(function (err, res) {
        var body = res.body,
            status = res.status;

        _testConfig["default"].expect(body).to.have.ownProperty('data');

        _testConfig["default"].expect(status).to.be.eql(200);

        done(err);
      });
    });
    it('should return a 404 if a user id is invalid', function (done) {
      var id = 2;

      _testConfig["default"].request(_["default"]).get("".concat(PATH, "/user-all/").concat(id)).end(function (err, res) {
        var status = res.status;

        _testConfig["default"].expect(status).to.be.eql(404);

        done(err);
      });
    });
  }); // Get users describe ends here...

  describe('POST REQUEST ROUTES', function () {
    describe('Post To Create New User', function () {
      it('should throw an erro if a user with the request email already exist', function (done) {
        _testConfig["default"].request(_["default"]).post("".concat(PATH, "/user-create")).send(userTestPayload).end(function (err, res) {
          var status = res.status;

          _testConfig["default"].expect(status).to.be.eql(400);

          done(err);
        });
      });
      it('should create a new user', function (done) {
        userTestPayload.email = 'testuser1@gmail.com';

        _testConfig["default"].request(_["default"]).post("".concat(PATH, "/user-create")).send(userTestPayload).end(function (err, res) {
          var _res$body = res.body,
              message = _res$body.message,
              status = _res$body.status;

          _testConfig["default"].expect(message).to.include('Successfully');

          _testConfig["default"].expect(status).to.be.eql(201);

          done(err);
        });
      });
    });
    describe('Post To Login User', function () {
      it('should throw an error if login credentials does not exist in database', function (done) {
        var loginData = {
          email: 'testerroremail@gmail.com',
          password: 'adminpassword'
        };

        _testConfig["default"].request(_["default"]).post("".concat(PATH, "/user-login")).send(loginData).end(function (err, res) {
          var status = res.status;

          _testConfig["default"].expect(status).to.be.eql(404);

          done(err);
        });
      });
      it('should login in user with a valid email and password', function (done) {
        var loginData = {
          email: 'chizyberto@gmail.com',
          password: 'adminpassword'
        };

        _testConfig["default"].request(_["default"]).post("".concat(PATH, "/user-login")).send(loginData).end(function (err, res) {
          var body = res.body,
              status = res.status;

          _testConfig["default"].expect(body.data).to.not.eql(null);

          _testConfig["default"].expect(status).to.be.eql(200);

          done(err);
        });
      });
      it('should contain a token value in its response data object', function (done) {
        var loginData = {
          email: 'chizyberto@gmail.com',
          password: 'adminpassword'
        };

        _testConfig["default"].request(_["default"]).post("".concat(PATH, "/user-login")).send(loginData).end(function (err, res) {
          var data = res.body.data;

          _testConfig["default"].expect(data).to.have.ownProperty('token');

          done(err);
        });
      });
    }); // Login describe ends here....
  }); // Post describe ends here......
});