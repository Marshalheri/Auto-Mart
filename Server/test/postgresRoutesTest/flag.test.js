import jwt from 'jsonwebtoken';
import chai, { request } from '../config/testConfig';
import app from '../..';
import { jwtKeyObj } from '../../Key/jwtKey';
import { environment } from '../../myEnvironment';

const PATH = '/api/v1';
const { jwtKey } = jwtKeyObj;

const newFlagPayload = {
  creator: 1,
  car_id: 600,
  reason: 'pricing',
  description: 'its too expensive.',
};

const token = environment.testToken || process.env.TESTTOKEN;
const errToken = environment.testErrToken || process.env.TESTERRORTOKEN;

describe('FLAGS ROUTES TEST', () => {
  describe('GET REQUEST ROUTES', () => {
    it('should return a 400 if authorization header is not set', (done) => {
      chai.request(app)
        .get(`${PATH}/flag-all`)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw error if authorization header set to get flag Ad is invalid ', (done) => {
      chai.request(app)
        .get(`${PATH}/flag-all`)
        .set({ authorization: `${errToken}` })
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(401);
          done(err);
        });
    });
    it('should return an array of flags stored in the database', (done) => {
      chai.request(app)
        .get(`${PATH}/flag-all`)
        .set({ authorization: `${token}` })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body.data).to.be.instanceof(Array);
          done(err);
        });
    });
    it('should return a body object that contains a data and status key', (done) => {
      chai.request(app)
        .get(`${PATH}/flag-all`)
        .set({ authorization: token })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body).to.haveOwnProperty('data' && 'status');
          done(err);
        });
    });
    it('should return data with; creator, car_id, reason, description', (done) => {
      chai.request(app)
        .get(`${PATH}/flag-all`)
        .set({ authorization: token })
        .end((err, res) => {
          const { data } = res.body;
          chai.expect(data[0])
            .to.have
            .ownProperty('creator' && 'car_id' && 'reason' && 'description');
          done(err);
        });
    });
    it('should return a 404 if a flag id is invalid', (done) => {
      const id = 0;
      chai.request(app)
        .get(`${PATH}/flag-all/${id}`)
        .set({ authorization: `${token}` })
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(404);
          done(err);
        });
    });
  });// describe for get request ends here...

  describe('POST REQUEST ROUTES', () => {
    it('should throw an error if the post request header does not have an authorization token', (done) => {
      chai.request(app)
        .post(`${PATH}/flag-create`)
        .send(newFlagPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw error if authorization header set to create flag Ad is invalid ', (done) => {
      chai.request(app)
        .post(`${PATH}/flag-create`)
        .set({ authorization: `${errToken}` })
        .send(newFlagPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(401);
          done(err);
        });
    });
    it('should throw error if the car_id does not exist in the database.', (done) => {
      newFlagPayload.car_id = 0;
      chai.request(app)
        .post(`${PATH}/order-create`)
        .set({ authorization: `${token}` })
        .send(newFlagPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(404);
          done(err);
        });
    });
  });// describe for post request ends here....

});
