const { healthCheck } = require('./controllers/healthCheck');
const { validateRequest } = require('./middlewares/validatorRequest');
const { createUserValidator, signupUserValidator } = require('./middlewares/schemas/users');
const { validateUserByEmail } = require('./middlewares/database');
const userController = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [validateRequest(createUserValidator), validateUserByEmail], userController.createUser);
  app.post('/users/sessions', [validateRequest(signupUserValidator)], userController.signIn);
};
