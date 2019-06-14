import jwt from 'jsonwebtoken';
import chai, { request } from '../config/testConfig';
import app from '../..';
import { jwtKeyObj } from '../../Key/jwtKey';
import { flagsModel } from '../../Models';
import { usersModel } from '../../Models';

const PATH = '/api/v1';
const { jwtKey } = jwtKeyObj;
const { flagsDb } = flagsModel;
const { userDb } = usersModel;

const { token } = userDb[0];
const errToken = jwt.sign({ email: 'chizyberto@gmail.com' }, jwtKey);

const newFlagPayload = {
  id: 1,
  car_id: 1,
  created_on: new Date(),
  reason: 'The user is not reliable.',
  description: 'I will not rest.',
};

describe('ORDERS ROUTES TEST', () => {
  describe('POST REQUEST ROUTES', () => {
    it('should throw an error if the post request header does not have an authorization token', (done) => {
      chai.request(app)
        .post(`${PATH}/flag-create`)
        .send(newFlagPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(401);
          done(err);
        });
    });
    it('should create new flag if user exist in the database', (done) => {
      chai.request(app)
        .post(`${PATH}/flag-create`)
        .set({ authorization: `${token}` })
        .send(newFlagPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(201);
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
  });
});
