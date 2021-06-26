const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { defaultError } = require('../errors');
const { NUM_SALT } = require('../../config/constants');

exports.encryptPassword = (value, salt = NUM_SALT) => {
  try {
    return bcrypt.hashSync(value, salt);
  } catch (err) {
    logger.error(err);
    throw defaultError(err);
  }
};
