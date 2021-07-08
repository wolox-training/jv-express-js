const jwt = require('jwt-simple');
const { secret, expiresTime } = require('../../config').common.session;
const logger = require('../logger');
const { defaultError, unauthorized } = require('../errors');
const { JWT_CREATED_MESSAGE_ERROR, INVALID_TOKEN_MESSAGE_ERROR } = require('../../config/constants');

exports.generateToken = payload => {
  try {
    const nbf = Date.now() / 1000;
    const timeAllowed = 60 * expiresTime * 60;
    const exp = nbf + timeAllowed;
    return jwt.encode(
      {
        ...payload,
        exp,
        nbf
      },
      secret
    );
  } catch (error) {
    logger.error(error);
    return defaultError(JWT_CREATED_MESSAGE_ERROR);
  }
};

exports.decodeToken = token => {
  try {
    return jwt.decode(token, secret);
  } catch (error) {
    logger.error(error);
    throw unauthorized(INVALID_TOKEN_MESSAGE_ERROR);
  }
};
