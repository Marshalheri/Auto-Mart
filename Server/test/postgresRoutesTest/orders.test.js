import jwt from 'jsonwebtoken';
import chai, { request } from '../config/testConfig';
import app from '../..';
import { jwtKeyObj } from '../../Key/jwtKey';
import { environment } from '../../myEnvironment';

const PATH = '/api/v1';
const { jwtKey } = jwtKeyObj;

const newOrderPayload = {
  car_id: 1,
  car_price: 600,
  order_amount: 2000,
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

const { testToken, testErrToken } = environment;

describe('ORDERS ROUTES TEST', () => {
  describe('GET REQUEST ROUTES', () => {
    it('should return a 400 if authorization header is not set', (done) => {
      chai.request(app)
        .get(`${PATH}/order`)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw error if authorization header set to get order Ad is invalid ', (done) => {
      chai.request(app)
        .get(`${PATH}/order`)
        .set({ authorization: `${testErrToken}` })
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(401);
          done(err);
        });
    });
    it('should return an array of orders stored in the database', (done) => {
      chai.request(app)
        .get(`${PATH}/order`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body.data).to.be.instanceof(Array);
          done(err);
        });
    });
    it('should return a body object that contains a data and status key', (done) => {
      chai.request(app)
        .get(`${PATH}/order`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body).to.haveOwnProperty('data' && 'status');
          done(err);
        });
    });
    it('should return data with; buyer, car_id, amount, status, price_offered, old_price_offered', (done) => {
      chai.request(app)
        .get(`${PATH}/order`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { data } = res.body;
          chai.expect(data[0])
            .to.have
            .ownProperty('buyer' && 'car_id' && 'amount' && 'status' && 'price_offered' && 'old_price_offered');
          done(err);
        });
    });
    it('should return a 400 if authorization header is not set', (done) => {
      chai.request(app)
        .get(`${PATH}/order-user-all`)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw error if authorization header set to get order Ad is invalid ', (done) => {
      chai.request(app)
        .get(`${PATH}/order-user-all`)
        .set({ authorization: `${testErrToken}` })
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(401);
          done(err);
        });
    });
    it('should return an array of orders stored in the database for a particular user.', (done) => {
      chai.request(app)
        .get(`${PATH}/order-user-all`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body.data).to.be.instanceof(Array);
          done(err);
        });
    });
    it('should return a body object that contains a data and status key', (done) => {
      chai.request(app)
        .get(`${PATH}/order-user-all`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { body } = res;
          chai.expect(body).to.haveOwnProperty('data' && 'status');
          done(err);
        });
    });
    it('should return data with; buyer, car_id, amount, status, price_offered, old_price_offered', (done) => {
      chai.request(app)
        .get(`${PATH}/order-user-all`)
        .set({ authorization: `${testToken}` })
        .end((err, res) => {
          const { data } = res.body;
          chai.expect(data[0])
            .to.have
            .ownProperty('buyer' && 'car_id' && 'amount' && 'status' && 'price_offered' && 'old_price_offered');
          done(err);
        });
    });
    it('should return a 404 if a order id is invalid', (done) => {
      const id = 0;
      chai.request(app)
        .get(`${PATH}/order/${id}`)
        .set({ authorization: `${testToken}` })
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
        .post(`${PATH}/order`)
        .send(newOrderPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw error if the car_id does not exist in the database.', (done) => {
      newOrderPayload.car_id = 0;
      chai.request(app)
        .post(`${PATH}/order`)
        .set({ authorization: `${testToken}` })
        .send(newOrderPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(404);
          done(err);
        });
    });
    it('should throw error if authorization header set to create order Ad is invalid ', (done) => {
      chai.request(app)
        .post(`${PATH}/order`)
        .set({ authorization: `${testErrToken}` })
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
        .patch(`${PATH}/order/${id}/price`)
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
        .patch(`${PATH}/order/${id}/price`)
        .set({ authorization: `${testToken}` })
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
        .patch(`${PATH}/order/${id}/status`)
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
        .patch(`${PATH}/order/${id}/status`)
        .set({ authorization: `${testToken}` })
        .send(statusUpdatePayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
  });

describe('DELETE REQUEST ROUTE', () => {
    it('should throw error if authorization header is not set', (done) => {
      const order_id = 2;
      chai.request(app)
        .delete(`${PATH}/order/:${order_id}`)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
    });
    it('should throw error if authorization header set is invalid', (done) => {
      const order_id = 2;
      chai.request(app)
        .delete(`${PATH}/order/:${order_id}`)
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
    //     .delete(`${PATH}/order-delete/:${car_id}`)
    //     .set({authorization: `${testToken}` })
    //     .end((err, res) => {
    //       const { status } = res;
    //       chai.expect(status).to.be.eql(404);
    //       done(err);
    //     });
    // });
  });
});
