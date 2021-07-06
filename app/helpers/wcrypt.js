const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { defaultError } = require('../errors');
const { HASH_MESSAGE_ERROR, COMPARE_HASH_MESSAGE_ERROR } = require('../../config/constants');
const { numSalt } = require('../../config').common.session;

exports.encryptPassword = (value, salt = numSalt) => {
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
