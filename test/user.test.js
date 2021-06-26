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
});
