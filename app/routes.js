const { healthCheck } = require('./controllers/healthCheck');
const { validateRequest } = require('./middlewares/validatorRequest');
const { createUserValidator } = require('../app/validators/users');
const userController = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateRequest(createUserValidator)], userController.createUser);
};
