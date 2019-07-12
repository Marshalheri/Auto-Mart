import jwt from 'jsonwebtoken';
import chai, { request } from '../config/testConfig';
import app from '../..';
import { jwtKeyObj } from '../../Key/jwtKey';
import { environment } from '../../myEnvironment';

const PATH = '/api/v1';
const { jwtKey } = jwtKeyObj;

const newOrderPayload = {
  carId: 1,
  carPrice: 600,
  orderAmount: 2000,
  status: 'pending',
};

const amountUpdatePayload = {
  id: 1,
  buyer: 1,
  oldPriceOffered: 4242,
};

const statusUpdatePayload = {
  id: 1,
  buyer: 1,
};

const token = environment.testToken;
const errToken = environment.testErrToken;

describe('ORDERS ROUTES TEST', () => {
  describe('GET REQUEST ROUTES', () => {
    it('should return a 401 if authorization header is not set', (done) => {
      chai.request(app)
        .get(`${PATH}/order-all`)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should return an array of orders stored in the database', (done) => {
      chai.request(app)
        .get(`${PATH}/order-all`)
        .set({ authorization: `${token}` })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body.data).to.be.instanceof(Array);
          done(err);
        });
    });
    it('should return a body object that contains a data and status key', (done) => {
      chai.request(app)
        .get(`${PATH}/order-all`)
        .set({ authorization: token })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body).to.haveOwnProperty('data' && 'status');
          done(err);
        });
    });
    it('should return data with; buyer, carId, amount, status, priceOffered, oldPriceOffered', (done) => {
      chai.request(app)
        .get(`${PATH}/order-all`)
        .set({ authorization: token })
        .end((err, res) => {
          const { data } = res.body;
          chai.expect(data[0])
            .to.have
            .ownProperty('buyer' && 'carId' && 'amount' && 'status' && 'priceOffered' && 'oldPriceOffered');
          done(err);
        });
    });
    // it('should return a order by its id', (done) => {
    //   const id = 1;
    //   chai.request(app)
    //     .get(`${PATH}/order-all/${id}`)
    //     .set({ authorization: `${token}` })
    //     .end((err, res) => {
    //       const { body, status } = res;
    //       chai.expect(body).to.have.ownProperty('data');
    //       chai.expect(status).to.be.eql(200);
    //       done(err);
    //     });
    // });
    it('should return a 404 if a order id is invalid', (done) => {
      const id = 0;
      chai.request(app)
        .get(`${PATH}/order-all/${id}`)
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
        .post(`${PATH}/order-create`)
        .send(newOrderPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    // it('should create new order if user exist in the database', (done) => {
    //   chai.request(app)
    //     .post(`${PATH}/order-create`)
    //     .set({ authorization: `${token}` })
    //     .send(newOrderErrorPayload)
    //     .end((err, res) => {
    //       const { status } = res;
    //       chai.expect(status).to.be.eql(201);
    //       done(err);
    //     });
    // });
    it('should throw error if authorization header set to create order Ad is invalid ', (done) => {
      chai.request(app)
        .post(`${PATH}/order-create`)
        .set({ authorization: `${errToken}` })
        .send(newOrderPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(401);
          done(err);
        });
    });
  });// describe for post request ends here....

  describe('PATCH REQUEST ROUTES', () => {
    it('should throw an error if the post request header does not have an authorization token', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`${PATH}/order-update/amount/${id}`)
        .send(amountUpdatePayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw an error if the payload does not have a amount to update', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`${PATH}/order-update/amount/${id}`)
        .set({ authorization: `${token}` })
        .send(amountUpdatePayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw an error if the post request header does not have an authorization token', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`${PATH}/order-update/status/${id}`)
        .send(statusUpdatePayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw an error if the payload does not have a status to update', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`${PATH}/order-update/status/${id}`)
        .set({ authorization: `${token}` })
        .send(statusUpdatePayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
  });
});
