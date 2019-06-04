import chai, { request } from './config/testConfig';
import app from '..';

const PORT = process.env.PORT || 4000;

describe('EXPRESS SERVER SETUP', () => {
  let server;
  beforeEach(() => {
    server = app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  });
  afterEach(() => {
    server.close();
  });
  it('runs on the specified environment port', (done) => {
    const { port } = server.address();
    chai.expect(port).to.equal(PORT);
    done();
  });
  it('responds to the get request on path / and returns status 200', (done) => {
    request(server)
    .get('/api/v1')
    .end((err, res) => {
      const status = res.status;
      chai.expect(status).to.eql(200);
      done(err);
    });
  });
  it('sends the welcome message', (done) => {
    request(server)
      .get('/api/v1')
      .end((err, res) => {
        const { body } = res;
        chai.expect(body).to.have.property('message');
        done(err);
      });
  });
});
