const errors = require('../errors');
const logger = require('../logger');
const { encryptPassword } = require('../helpers/wcrypt');
const { USER_CREATED } = require('../../config/constants');
const UserServices = require('../services/users');

const createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;
    const passwordEncrypted = await encryptPassword(userData.password);
    if (passwordEncrypted) userData.password = passwordEncrypted;
    await UserServices.createUser(userData);
    return res.status(201).send({
      message: USER_CREATED,
      data: { name: userData.name }
    });
  } catch (err) {
    logger.info('Error creating user: ', err);
    if (err.errors) {
      const messages = err.errors.map(e => e.message);
      return next(errors.unprocessableEntity(messages));
    }
    return next(errors.unprocessableEntity(err.message));
  }
};

module.exports = {
  createUser
};
