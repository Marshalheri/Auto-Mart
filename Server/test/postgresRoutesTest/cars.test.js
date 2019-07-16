import jwt from 'jsonwebtoken';
import chai, { request } from '../config/testConfig';
import app from '../..';
import { jwtKeyObj } from '../../Key/jwtKey';
import { environment } from '../../myEnvironment';

const PATH = '/api/v1';
const { jwtKey } = jwtKeyObj;

const carTestPayload = {
  id: 1,
  owner: 1,
  createdOn: new Date(),
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
  createdOn: new Date(),
  state: 'new',
  status: 'available',
  price: 190.0,
  manufacturer: 'Mercedes',
  model: 'Benz 190',
  body_type: 'car',
};

const { testToken, testErrToken } = environment;

describe('CARS ROUTES TEST', () => {
  describe('GET REQUEST ROUTES', () => {
    it('should return an array of cars stored in the database', (done) => {
      chai.request(app)
        .get(`${PATH}/car`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body.data).to.be.instanceof(Array);
          done(err);
          console.log(err);
        });
    });
    it('should return a body object that contains a data and status key', (done) => {
      chai.request(app)
        .get(`${PATH}/car`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body).to.haveOwnProperty('data' && 'status');
          done(err);
        });
    });
    it('should return data with; createdOn, owner, status, state and price keys', (done) => {
      chai.request(app)
        .get(`${PATH}/car`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { data } = res.body;
          chai.expect(data[0])
            .to.have
            .ownProperty('createdOn' && 'owner' && 'price' && 'status' && 'state');
          done(err);
        });
    });
    it('should return cars with status sold if user is admin', (done) => {
      chai.request(app)
        .get(`${PATH}/car`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body, status } = res;
          const { data } = body;
          //this function returns a status of sold for a car.
          var carStatus;
          data.some((eachData) => {
            if (eachData.status == 'sold') {
              carStatus = eachData.status;
            };
          });
          chai.expect(carStatus).to.be.eql('sold');
          chai.expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should return only cars with status available if user is not admin', (done) => {
      chai.request(app)
        .get(`${PATH}/car`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body, status } = res;
          const { data } = body;
          //this function returns a status of available for a car.
          var carStatus;
          data.some((eachData) => {
            if (eachData.status == 'available') {
              carStatus = eachData.status;
            };
          });
          chai.expect(carStatus).to.be.eql('available');
          chai.expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should return a car by its id', (done) => {
      const id = 3;
      chai.request(app)
        .get(`${PATH}/car/${id}`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body, status } = res;
          chai.expect(body).to.have.ownProperty('data');
          chai.expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should return a 404 if a car id is invalid', (done) => {
      const id = 0;
      chai.request(app)
        .get(`${PATH}/car/${id}`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(404);
          done(err);
        });
    });
    it('should return cars by specific status', (done) => {
      const carStatus = 'available';
      chai.request(app)
        .get(`${PATH}/car?status=${carStatus}`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body, status } = res;
          chai.expect(body).to.have.ownProperty('data');
          chai.expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should return cars by specific state', (done) => {
      const carState = 'new';
      chai.request(app)
        .get(`${PATH}/car?state=${carState}`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body, status } = res;
          chai.expect(body).to.have.ownProperty('data');
          chai.expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should return cars by specific body type', (done) => {
      const bodyType = 'car';
      chai.request(app)
        .get(`${PATH}/car?bodyType=${bodyType}`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body, status } = res;
          chai.expect(body).to.have.ownProperty('data');
          chai.expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should return an empty array if manufacturer supplied in query string does not exist', (done) => {
      const manufacturer = 'xxxxxx';
      chai.request(app)
        .get(`${PATH}/car?manufacturer=${manufacturer}`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body, status } = res;
          const { data } = body;
          var length = data.length;
          chai.expect(length).to.eql(0);
          chai.expect(status).to.be.eql(200);
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
            chai.expect(status).to.be.eql(400);
            done(err);
          });
      });
      it('should throw error if authorization header set to create car Ad is invalid ', (done) => {
        chai.request(app)
          .post(`${PATH}/car-create`)
          .set({ authorization: `${testErrToken}` })
          .send(carTestPayload)
          .end((err, res) => {
            const { status } = res;
            chai.expect(status).to.be.eql(401);
            done(err);
          });
      });
    });
  }); // Post describe ends here......

  describe('DELETE REQUEST ROUTE', () => {
    it('should throw error if authorization header is not set', (done) => {
      const car_id = 2;
      chai.request(app)
        .delete(`${PATH}/car/:${car_id}`)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw error if authorization header set is invalid', (done) => {
      const car_id = 2;
      chai.request(app)
        .delete(`${PATH}/car/:${car_id}`)
        .set({ authorization: `${testErrToken}` })
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(401);
          done(err);
        });
    });
    // it('should throw error if car id set is not found', (done) => {
    //   const car_id = 0;
    //   chai.request(app)
    //     .delete(`${PATH}/car-delete/:${car_id}`)
    //     .set({authorization: `${testToken}` })
    //     .end((err, res) => {
    //       const { status } = res;
    //       chai.expect(status).to.be.eql(404);
    //       done(err);
    //     });
    // });
  });
});
