import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';

chai.use(chaiHttp);
chai.should();

export const request = supertest;
export default chai;
