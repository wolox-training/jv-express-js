/* eslint-disable no-unused-vars */
const request = require('supertest');
const app = require('../app');
const db = require('../app/models/index');
const quotes = require('../app/services/quotes');
const { regularUser, signinRegularCredentials } = require('./mocks/admin');
const {
  createWeetOutput,
  createWeetLargeInput,
  createWeetLargeOutput,
  weetMock,
  weetMockLarge
} = require('./mocks/weets');

let regularToken = null;

describe.only('Weets', () => {
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

  describe('Create', () => {
    test('Weet should be created', async done => {
      const fnSpy = jest.spyOn(quotes, 'getQuote');
      fnSpy.mockImplementation(weetMock);
      await request(app)
        .post('/weets')
        .set('Authorization', `Bearer ${regularToken}`)
        .expect(201)
        .then(res => {
          expect(res.body).toEqual(createWeetOutput);
          done();
        })
        .catch(err => done(err));
    });
  });

  test.skip('Weet shouldn`t be created', async done => {
    beforeAll(() => {
      const fnSpy = jest.spyOn(quotes, 'getQuote');
      fnSpy.mockClear();
      fnSpy.mockImplementation(weetMockLarge);
    });
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
