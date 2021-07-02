const jwt = require('jwt-simple');
const { moment } = require('../../config/moment');
const { secret } = require('../../config').common.session;
const logger = require('../logger');
const { JWT_EXPIRATION_TIME } = require('../../config/constants');

exports.generateToken = payload => {
  try {
    return jwt.encode(
      {
        ...payload,
        exp: moment()
          .add(JWT_EXPIRATION_TIME, 'hours')
          .valueOf()
      },
      secret
    );
  } catch (error) {
    logger.error(error);
    return new Error('Error creating jwt');
  }
};

exports.decodeToken = token => {
  try {
    return jwt.decode(token, secret);
  } catch (error) {
    logger.error(error);
    throw new Error('Error decoding jwt');
  }
};
