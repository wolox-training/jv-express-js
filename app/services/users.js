const logger = require('../logger');
const { databaseError } = require('../errors');
const { User } = require('../models');
const { CREATE_USER_ON_DB_ERROR } = require('../../config/constants');

exports.createUser = user => {
  try {
    return User.create(user);
  } catch (error) {
    logger.error(error);
    throw databaseError(CREATE_USER_ON_DB_ERROR);
  }
};
