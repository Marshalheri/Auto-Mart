"use strict";

var _testConfig = _interopRequireWildcard(require("./config/testConfig"));

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var PORT = 4000;
describe('EXPRESS SERVER SETUP', function () {
  var server;
  beforeEach(function () {
    server = _["default"].listen(PORT, function () {
      return console.log("Server started on port: ".concat(PORT));
    });
  });
  afterEach(function () {
    server.close();
  });
  it('runs on the specified environment port', function (done) {
    var _server$address = server.address(),
        port = _server$address.port;

    _testConfig["default"].expect(port).to.equal(PORT);

    done();
  });
  it('responds to the get request on path / and returns status 200', function (done) {
    (0, _testConfig.request)(server).get('/api/v1').end(function (err, res) {
      var status = res.status;

      _testConfig["default"].expect(status).to.eql(200);

      done(err);
    });
  });
  it('sends the welcome message', function (done) {
    (0, _testConfig.request)(server).get('/api/v1').end(function (err, res) {
      var body = res.body;

      _testConfig["default"].expect(body).to.have.property('message');

      done(err);
    });
  });
});