/* eslint-disable no-unused-vars */
const request = require('supertest');
const axios = require('axios');
const app = require('../app');
const { regularUser, signinRegularCredentials } = require('./mocks/admin');
const {
  createWeetInput,
  createWeetOutput,
  createWeetLargeInput,
  createWeetLargeOutput
} = require('./mocks/weets');

jest.mock('axios');
describe.only('Weets', () => {
  /* eslint-disable init-declarations */
  let signedInUser;
  let regularToken;
  let response = {};
  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send(regularUser);

    signedInUser = await request(app)
      .post('/users/sessions')
      .send(signinRegularCredentials);
    regularToken = signedInUser.body.data.token;
  });

  describe.only('Weet should be created', () => {
    beforeAll(async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(createWeetInput));
      response = await request(app)
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
      expect(axios.get).toBeCalledTimes(1);
    });
  });

  test.skip('Weet shouldn`t be created', async done => {
    await request(app)
      .post('/weets')
      .set('Authorization', `Bearer ${regularToken}`)
      .expect(413)
      .then(res => {
        expect(res.body).toEqual(createWeetLargeOutput);
        done();
      })
      .catch(err => done(err));
  });
});
