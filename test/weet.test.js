const request = require('supertest');
const axios = require('axios');
const app = require('../app');
const { regularUser, signinRegularCredentials } = require('./mocks/weets');
const {
  createWeetInput,
  createWeetOutput,
  createLongWeetInput,
  createLongWeetOutput,
  getWeetsListMock,
  badResponseExpectedWeet,
  serviceResponseError
} = require('./mocks/weets');
const WeetService = require('../app/services/weets');

jest.mock('axios');
describe('Weets', () => {
  /* eslint-disable init-declarations */
  let signedInUser;
  let regularToken;
  let response = {};
  let responseLong = {};
  let responseWeetList = {};
  let badResponseWeetList = {};

  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send(regularUser);

    signedInUser = await request(app)
      .post('/users/sessions')
      .send(signinRegularCredentials);
    regularToken = signedInUser.body.data.token;
  });

  describe('Weet should be created', () => {
    beforeEach(async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(createWeetInput));
      response = await request(app)
        .post('/weets')
        .set('Authorization', `Bearer ${regularToken}`);
    });
    afterEach(() => jest.clearAllMocks());
    test('should match status code 201', () => {
      expect(response.status).toBe(201);
    });

    test('should return the weet created', () => {
      expect(response.body).toEqual(createWeetOutput);
    });

    test('mock should be called', () => {
      expect(axios.get).toBeCalledTimes(1);
    });
  });
  describe('Weet service fails on request', () => {
    beforeEach(async () => {
      axios.get.mockImplementationOnce(() => Promise.reject(new Error('fail')));
      response = await request(app)
        .post('/weets')
        .set('Authorization', `Bearer ${regularToken}`);
    });
    afterEach(() => jest.clearAllMocks());
    test('should match status code 503', () => {
      expect(response.status).toBe(503);
    });

    test('should return an detailed error message', () => {
      expect(response.body).toEqual(serviceResponseError);
    });
  });
  describe('Weet long than 140 should be trim and created', () => {
    beforeEach(async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(createLongWeetInput));
      responseLong = await request(app)
        .post('/weets')
        .set('Authorization', `Bearer ${regularToken}`);
    });
    afterEach(() => jest.clearAllMocks());
    test('Should match status code 201', () => {
      expect(responseLong.status).toBe(201);
    });
    test('Should trim weet to 140 charactes', () => {
      expect(responseLong.body).toEqual(createLongWeetOutput);
    });
  });
  describe('Get pagination weets should be return', () => {
    beforeEach(async () => {
      const getWeetsSpy = jest.spyOn(WeetService, 'getWeets');
      getWeetsSpy.mockImplementation(getWeetsListMock);
      badResponseWeetList = await request(app)
        .get('/weets?page=string&limit=5')
        .set('Authorization', `Bearer ${regularToken}`);
      responseWeetList = await request(app)
        .get('/weets?page=0&limit=5')
        .set('Authorization', `Bearer ${regularToken}`);
    });
    afterEach(() => jest.clearAllMocks());
    test('Paginate should match status code 200', () => {
      expect(responseWeetList.status).toBe(200);
    });
    test('Should get paginated with 5  weets', () => {
      expect(responseWeetList.body.data.weets.count).toEqual(5);
    });
    test('Should return a bad request', () => {
      expect(badResponseWeetList.status).toBe(400);
    });
    test('Should return detailed message', () => {
      expect(badResponseWeetList.body).toEqual(badResponseExpectedWeet);
    });
  });
});
