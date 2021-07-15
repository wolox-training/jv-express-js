const request = require('supertest');
const logger = require('../app/logger');
const app = require('../app');
const {
  inputUserExpected,
  outputUserExpected,
  invalidPassword,
  invalidEmailExpected,
  invalidPasswordExpected,
  nonParameterRequired,
  getUsersListMock,
  countMock,
  rowsMock,
  getUsersBadQueryResponse
} = require('./mocks/users');
const { User } = require('../app/models/');
const UserService = require('../app/services/users');
const { signinCredentials, getUserByEmailMock, getUserNullEmailMock } = require('./mocks/sessions');
const { BAD_CREDENTIALS, NO_TOKEN_MESSAGE_ERROR } = require('../config/constants');

let testToken = null;

describe('Users', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('POST /users', () => {
    test('User created successfuly', async done => {
      await request(app)
        .post('/users')
        .send(inputUserExpected)
        .expect(201)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).toEqual(outputUserExpected);
          done();
        })
        .catch(err => done(err));
    });

    test('User with an email already in use', async done => {
      await User.create(inputUserExpected);
      await request(app)
        .post('/users')
        .send(inputUserExpected)
        .expect(409)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).toEqual(invalidEmailExpected);
          done();
        })
        .catch(err => done(err));
    });

    test('User with password non-valid', async done => {
      const inputInvalidPassword = { ...inputUserExpected };
      inputInvalidPassword.password = invalidPassword;
      await request(app)
        .post('/users')
        .send(inputInvalidPassword)
        .expect(400)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).toEqual(invalidPasswordExpected);
          done();
        })
        .catch(err => done(err));
    });

    test('User with non required parameters', async done => {
      const reqBody = { ...inputUserExpected };
      const parameterName = 'name';
      delete reqBody[parameterName];
      await request(app)
        .post('/users')
        .send(reqBody)
        .expect(400)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.message[0]).toEqual(nonParameterRequired(parameterName));
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('POST /users/sessions', () => {
    test('Sign in return a token', async done => {
      const getUserByEmailSpy = jest.spyOn(UserService, 'getUserByEmail');
      getUserByEmailSpy.mockImplementation(getUserByEmailMock);
      await request(app)
        .post('/users/sessions')
        .send(signinCredentials)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.data.token).toBeTruthy();
          done();
        })
        .catch(err => done(err));
    });
    test('User sign in with non matched password', async done => {
      const getUserByEmailSpy = jest.spyOn(UserService, 'getUserByEmail');
      getUserByEmailSpy.mockImplementation(getUserByEmailMock);
      const signinCredentialsError = { ...signinCredentials, password: 'errorpassword' };
      await request(app)
        .post('/users/sessions')
        .send(signinCredentialsError)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body.message).toBe(BAD_CREDENTIALS);
          done();
        })
        .catch(err => done(err));
    });
    test('Sign in when user doesn´t exist', async done => {
      const getUserByEmailSpy = jest.spyOn(UserService, 'getUserByEmail');
      getUserByEmailSpy.mockImplementation(getUserNullEmailMock);
      await request(app)
        .post('/users/sessions')
        .send(signinCredentials)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body.message).toBe(BAD_CREDENTIALS);
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('GET /users', () => {
    beforeEach(async () => {
      const getUserByEmailSpy = jest.spyOn(UserService, 'getUserByEmail');
      getUserByEmailSpy.mockImplementation(getUserByEmailMock);
      try {
        await request(app)
          .post('/users')
          .send(inputUserExpected);
        await request(app)
          .post('/users/sessions')
          .send(signinCredentials)
          .then(res => {
            testToken = res.body.data.token;
          });
      } catch (error) {
        logger.error(error.errors);
      }
    });

    test('Paginated user list should be returned', async done => {
      const getAllUsersSpy = jest.spyOn(UserService, 'getAllUsers');
      getAllUsersSpy.mockImplementation(getUsersListMock);
      await request(app)
        .get('/users?offset=0&limit=5')
        .set('Authorization', `Bearer ${testToken}`)
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          expect(res.body.data.users.count).toBe(countMock);
          expect(res.body.data.users.rows).toEqual(rowsMock);
          done();
        })
        .catch(err => done(err));
    });

    test('When is not token must be return unauthorized', async done => {
      const getAllUsersSpy = jest.spyOn(UserService, 'getAllUsers');
      getAllUsersSpy.mockImplementation(getUsersListMock);
      await request(app)
        .get('/users?offset=0&limit=5')
        .set('Accept', 'application/json')
        .expect(401)
        .then(res => {
          expect(res.body.message).toBe(NO_TOKEN_MESSAGE_ERROR);
          done();
        })
        .catch(err => done(err));
    });

    test('When parameters are bad in the query', async done => {
      const getAllUsersSpy = jest.spyOn(UserService, 'getAllUsers');
      getAllUsersSpy.mockImplementation(getUsersListMock);
      const limitValue = 'limit';
      const offsetValue = 'offset';
      await request(app)
        .get(`/users?offset=${offsetValue}&limit=${limitValue}`)
        .set('Authorization', `Bearer ${testToken}`)
        .set('Accept', 'application/json')
        .expect(400)
        .then(res => {
          expect(res.body).toEqual(getUsersBadQueryResponse(offsetValue, limitValue));
          done();
        })
        .catch(err => done(err));
    });
  });
});
