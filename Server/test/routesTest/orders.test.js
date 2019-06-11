import jwt from 'jsonwebtoken';
import chai, { request } from '../config/testConfig';
import app from '../..';
import { jwtKeyObj } from '../../Key/jwtKey';

const PATH = '/api/v1';
const { jwtKey } = jwtKeyObj;

const token = jwt.sign({ email: 'chizyberto@gmail.com' }, jwtKey);

describe('ORDERS ROUTES TEST', () => {
  describe('GET REQUEST ROUTES', () => {
    it('should return a 401 if authorization header is not set', (done) => {
      chai.request(app)
        .get(`${PATH}/order-all`)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(401);
          done(err);
        });
    });
  });
})
