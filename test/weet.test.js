/* eslint-disable no-unused-vars */
const request = require('supertest');
const app = require('../app');
const db = require('../app/models/index');
const { regularUser, signinRegularCredentials } = require('./mocks/admin');
const {
  createWeetInput,
  createWeetOutput,
  createWeetLargeInput,
  createWeetLargeOutput
} = require('./mocks/weets');

describe('Weets', () => {
  let regularToken = null;
  beforeEach(async done => {
    jest.resetModules();
    await db.User.create(regularUser);

    await request(app)
      .post('/users/sessions')
      .send(signinRegularCredentials)
      .then(res => {
        regularToken = res.body.data.token;
        done();
      })
      .catch(err => done(err));
  });

  test('Weet should be created', async done => {
    await request(app)
      .post('/weets')
      .send(createWeetInput)
      .set('Authorization', `Bearer ${regularToken}`)
      .expect(201)
      .then(res => {
        expect(res.body).toEqual(createWeetOutput);
        done();
      })
      .catch(err => done(err));
  });
  test('Weet shouldn`t be created', async done => {
    await request(app)
      .post('/weets')
      .send(createWeetLargeInput)
      .set('Authorization', `Bearer ${regularToken}`)
      .expect(413)
      .then(res => {
        expect(res.body).toEqual(createWeetLargeOutput);
        done();
      })
      .catch(err => done(err));
  });
});
