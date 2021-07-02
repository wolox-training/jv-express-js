const request = require('supertest');
const app = require('../app');
const {
  inputUserExpected,
  outputUserExpected,
  invalidPassword,
  invalidEmailExpected,
  invalidPasswordExpected,
  nonParameerRequired
} = require('./mocks/users');
const { User } = require('../app/models/');
const UserService = require('../app/services/users');
const { signinCredentials, getUserByEmailMock, getUserNullEmailMock } = require('./mocks/sessions');
const { BAD_CREDENTIALS } = require('../config/constants');

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
          expect(res.body.message[0]).toEqual(nonParameerRequired(parameterName));
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
      signinCredentials.password = 'errorpassword';
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
});
