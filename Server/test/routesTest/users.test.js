import chai, { request } from '../config/testConfig';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../..';
import { jwtKeyObj } from '../../Key/jwtKey'


const PATH = '/api/v1';
const { jwtKey } = jwtKeyObj;
const userTestPayload = {
  id: 1,
  email: 'chizyberto@gmail.com',
  first_name: 'Chizoba',
  last_name: 'Nnamani',
  password: hashSync('adminpassword', genSaltSync(10)),
  address: '79, osho drive olodi apapa lagos',
  is_admin: true,
  phone_number: '+2348162956658',
  token: jwt.sign({ email: 'chizyberto@gmail.com'}, jwtKey)
};

describe('USERS ROUTES TEST', () => {
  describe('GET REQUEST ROUTES', () => {
    it('should return an array of users stored in the database', (done) => {
      chai.request(app)
      .get(`${PATH}/all-users`)
      .end((err, res) => {
        const { body } = res;
        chai.expect(body.data).to.be.instanceof(Array);
        done(err);
      });
    });
    it('should return a body object that contains a data and status key', (done) => {
      chai.request(app)
      .get(`${PATH}/all-users`)
      .end((err, res) => {
        const { body } = res;
        chai.expect(body).to.haveOwnProperty('data' && 'status');
        done(err);
      });
    });
    it('should return a user by its id', (done) => {
      let id = 1;
      chai.request(app)
      .get(`${PATH}/all-users/${id}`)
      .end((err, res) => {
        const { body, status } = res;
        chai.expect(body).to.have.ownProperty('data');
        chai.expect(status).to.be.eql(200);
        done(err);
      });
    });
    it('should return a 404 if a user id is invalid', (done) => {
      let id = 2;
      chai.request(app)
      .get(`${PATH}/all-users/${id}`)
      .end((err, res) => {
        const { status } = res;
        chai.expect(status).to.be.eql(404);
        done(err);
      });
    });
  }); //Get users describe ends here...

  describe('POST REQUEST ROUTES', () => {
    describe('Post To Create New User', () => {
      it('should throw an erro if a user with the request email already exist', (done) => {
        chai.request(app)
        .post(`${PATH}/create-user`)
        .send(userTestPayload)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(400);
          done(err);
        });
      });
      it('should create a new user', (done) => {
        userTestPayload.email = 'testuser1@gmail.com';
        chai.request(app)
        .post(`${PATH}/create-user`)
        .send(userTestPayload)
        .end((err, res) => {
          const { message, status } = res.body;
          chai.expect(message).to.include('Successfully');
          chai.expect(status).to.be.eql(201);
          done(err);
        });
      });
    });
    describe('Post To Login User', () => {
      it('should throw an error if login credentials does not exist in database', (done) => {
        let loginData = {
          email: 'testerroremail@gmail.com',
          password: 'adminpassword'
        };
        chai.request(app)
        .post(`${PATH}/login-user`)
        .send(loginData)
        .end((err, res) => {
          const { status } = res;
          chai.expect(status).to.be.eql(404);
          done(err);
        });
      });
      it('should login in user with a valid email and password', (done) => {
        let loginData = {
          email: 'chizyberto@gmail.com',
          password: 'adminpassword'
        };
        chai.request(app)
        .post(`${PATH}/login-user`)
        .send(loginData)
        .end((err, res) => {
          const { body, status } = res;
          chai.expect(body.data).to.not.eql(null);
          chai.expect(status).to.be.eql(200);
          done(err);
      });
    });
    it('should contain a token value in its response data object', (done) => {
      let loginData = {
        email: 'chizyberto@gmail.com',
        password: 'adminpassword'
      };
      chai.request(app)
      .post(`${PATH}/login-user`)
      .send(loginData)
      .end((err, res) => {
        const { data } = res.body;
        chai.expect(data).to.have.ownProperty('token');
        done(err);
    });
  });
  }); //Login describe ends here....
}); //Post describe ends here......
});
