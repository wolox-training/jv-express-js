/* eslint-disable no-unused-vars */
const request = require('supertest');
const axios = require('axios');
const app = require('../app');
const { regularUser, signinRegularCredentials } = require('./mocks/weets');
const {
  createWeetInput,
  createWeetOutput,
  createLongWeetInput,
  createLongWeetOutput
} = require('./mocks/weets');

jest.mock('axios');
describe.only('Weets', () => {
  /* eslint-disable init-declarations */
  let signedInUser;
  let regularToken;
  let response = {};
  let responseLong = {};
  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send(regularUser);

    signedInUser = await request(app)
      .post('/users/sessions')
      .send(signinRegularCredentials);
    regularToken = signedInUser.body.data.token;
  });

  describe('Weet should be created', () => {
    beforeAll(async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(createWeetInput));
      response = await request(app)
        .post('/weets')
        .set('Authorization', `Bearer ${regularToken}`);
      axios.get.mockImplementationOnce(() => Promise.resolve(createLongWeetInput));
      responseLong = await request(app)
        .post('/weets')
        .set('Authorization', `Bearer ${regularToken}`);
    });
    afterAll(() => jest.clearAllMocks());
    test('should match status code 201', () => {
      // console.log(response);
      expect(response.status).toBe(201);
    });

    test('should return the list banks', () => {
      expect(response.body).toEqual(createWeetOutput);
    });

    test('mock should be called', () => {
      expect(axios.get).toBeCalledTimes(2);
    });

    describe('Weet long than 140 should be trim and created', () => {
      test('should match status code 201', () => {
        // console.log(response);
        expect(responseLong.status).toBe(201);
      });
      test('should return the list banks', () => {
        expect(responseLong.body).toEqual(createLongWeetOutput);
      });
    });
  });
});
