import jwt from 'jsonwebtoken';
import chai, { request } from '../config/testConfig';
import app from '../..';
import { jwtKeyObj } from '../../Key/jwtKey';

const PATH = '/api/v1';
const { jwtKey } = jwtKeyObj;
const carTestPayload = {
  id: 1,
  owner: 1,
  created_on: new Date(),
  state: 'new',
  status: 'available',
  price: 190.0,
  manufacturer: 'Mercedes',
  model: 'Benz 190',
  body_type: 'car',
};

const carTestErrorPayload = {
  id: 1,
  owner: 2,
  created_on: new Date(),
  state: 'new',
  status: 'available',
  price: 190.0,
  manufacturer: 'Mercedes',
  model: 'Benz 190',
  body_type: 'car',
};

const token = jwt.sign({ email: 'chizyberto@gmail.com' }, jwtKey);

describe('CARS ROUTES TEST', () => {
  describe('GET REQUEST ROUTES', () => {
    it('should return an array of cars stored in the database', (done) => {
      chai.request(app)
        .get(`${PATH}/car-all`)
        .end((err, res) => {
          const { body } = res;
          chai.expect(body.data).to.be.instanceof(Array);
          done(err);
        });
    });
    it('should return a body object that contains a data and status key', (done) => {
      chai.request(app)
        .get(`${PATH}/car-all`)
        .end((err, res) => {
          const { body } = res;
          chai.expect(body).to.haveOwnProperty('data' && 'status');
          done(err);
        });
    });
    it('should return data with; created_on, owner, status, state and price keys', (done) => {
      chai.request(app)
        .get(`${PATH}/car-all`)
        .end((err, res) => {
          const { data } = res.body;
          chai.expect(data[0])
            .to.have
            .ownProperty('created_on' && 'owner' && 'price' && 'status' && 'state');
          done(err);
        });
    });
    it('should return all car', (done) => {
      chai.request(app)
        .get(`${PATH}/car-all`)
        .end((err, res) => {
          const { body, status } = res;
          chai.expect(body).to.have.ownProperty('data');
          chai.expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should return a car by its id', (done) => {
      const id = 1;
      chai.request(app)
        .get(`${PATH}/car-all/${id}`)
        .end((err, res) => {
          const { body, status } = res;
          chai.expect(body).to.have.ownProperty('data');
          chai.expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should return a 404 if a car id is invalid', (done) => {
      const id = 2;
      chai.request(app)
        .get(`${PATH}/car-all/${id}`)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(404);
          done(err);
        });
    });
  });// Get cars describe ends here...

  describe('POST REQUEST ROUTES', () => {
    describe('Post To Create New Car', () => {
      it('should throw an error if the request header does not have an authorization token', (done) => {
        chai.request(app)
          .post(`${PATH}/car-create`)
          .send(carTestPayload)
          .end((err, res) => {
            const { status } = res;
            chai.expect(status).to.be.eql(401);
            done(err);
          });
      });
      it('should throw an error if the user does not exist in the database', (done) => {
        chai.request(app)
          .post(`${PATH}/car-create`)
          .send(carTestErrorPayload)
          .end((err, res) => {
            const { status } = res;
            chai.expect(status).to.be.eql(401);
            done(err);
          });
      });
      it('should create car Ad', (done) => {
        chai.request(app)
          .post(`${PATH}/car-create`)
          .set({ authorization: `${token}` })
          .send(carTestPayload)
          .end((err, res) => {
            const { status } = res;
            chai.expect(status).to.be.eql(201);
            done(err);
          });
      });
    }); // Post describe ends here......
  });
});
