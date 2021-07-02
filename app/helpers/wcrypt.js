const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { defaultError } = require('../errors');
const { NUM_SALT, HASH_MESSAGE_ERROR, COMPARE_HASH_MESSAGE_ERROR } = require('../../config/constants');

exports.encryptPassword = (value, salt = NUM_SALT) => {
  try {
    return bcrypt.hashSync(value, salt);
  } catch (err) {
    logger.error(err);
    throw defaultError(HASH_MESSAGE_ERROR);
  }
};

exports.comparePassword = (password, encrypted) => {
  try {
    return bcrypt.compareSync(password, encrypted);
  } catch (err) {
    logger.error(err);
    throw defaultError(COMPARE_HASH_MESSAGE_ERROR);
  }
};
