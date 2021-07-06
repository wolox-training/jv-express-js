const { healthCheck } = require('./controllers/healthCheck');
const { validateRequest } = require('./middlewares/validatorRequest');
const { createUserValidator, signinUserValidator } = require('./middlewares/schemas/users');
const { validateUserByEmail } = require('./middlewares/database');
const userController = require('./controllers/users');
const { validateSession } = require('../app/middlewares/validateSession');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [validateRequest(createUserValidator), validateUserByEmail], userController.createUser);
  app.post('/users/sessions', [validateRequest(signinUserValidator)], userController.signIn);
  app.get('/users', [validateSession], userController.getUsers);
};
