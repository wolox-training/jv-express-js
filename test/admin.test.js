const request = require('supertest');
const app = require('../app');
const db = require('../app/models/index');
const { adminUser, regularUser, signinRegularCredentials, signinAdminCredentials } = require('./mocks/admin');

const { getBadResponsePrivileges } = require('./mocks/admin');
const { inputUserExpected, outputUserExpected, outputUserUpdatedExpected } = require('./mocks/users');

describe.skip('Admin', () => {
  describe('POST /admin/users', () => {
    let regularToken = null;
    let adminToken = null;
    beforeEach(async done => {
      await db.User.create(regularUser);
      await db.User.create(adminUser);

      await request(app)
        .post('/users/sessions')
        .send(signinRegularCredentials)
        .then(res => {
          regularToken = res.body.data.token;
          done();
        })
        .catch(err => done(err));

      await request(app)
        .post('/users/sessions')
        .send(signinAdminCredentials)
        .then(res => {
          adminToken = res.body.data.token;
          done();
        })
        .catch(err => done(err));
    });
    test('When user is a regular role must be unauthorized', async done => {
      await request(app)
        .post('/admin/users')
        .set('Authorization', `Bearer ${regularToken}`)
        .send(inputUserExpected)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(getBadResponsePrivileges);
          done();
        })
        .catch(err => done(err));
    });

    test('Admin user created successfully', async done => {
      await request(app)
        .post('/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(inputUserExpected)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          expect(res.body).toEqual(outputUserExpected);
          done();
        })
        .catch(err => done(err));
    });

    test('Regular to Admin user updated successfully', async done => {
      await request(app)
        .post('/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(regularUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toEqual(outputUserUpdatedExpected);
          done();
        })
        .catch(err => done(err));
    });
  });
});
