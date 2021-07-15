const { healthCheck } = require('./controllers/healthCheck');
const { validateRequest } = require('./middlewares/validatorRequest');
const {
  createUserValidator,
  signinUserValidator,
  getUsersValidator
} = require('./middlewares/schemas/users');
const { validateUserByEmail } = require('./middlewares/database');
const userController = require('./controllers/users');
const { validateSession, validateIsAdmin } = require('../app/middlewares/validateSession');
const weetController = require('./controllers/weets');
const { getWeetsValidator } = require('./middlewares/schemas/weets');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [validateRequest(createUserValidator), validateUserByEmail], userController.createUser);
  app.post('/users/sessions', [validateRequest(signinUserValidator)], userController.signIn);
  app.get('/users', [validateRequest(getUsersValidator), validateSession], userController.getUsers);

  app.post(
    '/admin/users',
    [validateRequest(createUserValidator), validateSession, validateIsAdmin],
    userController.createOrUpdateAdminUser
  );

  app.post('/weets', validateSession, weetController.createWeet);
  app.get('/weets', [validateRequest(getWeetsValidator), validateSession], weetController.getWeets);
};
