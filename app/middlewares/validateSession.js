const logger = require('../logger');
const { unauthorized } = require('../errors');
const { NO_TOKEN_MESSAGE_ERROR, INVALID_TOKEN_MESSAGE_ERROR } = require('../../config/constants');
const { decodeToken } = require('../helpers/sessions');
const { getUserByPk } = require('../services/users');

exports.validateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return next(unauthorized(NO_TOKEN_MESSAGE_ERROR));
    const payload = await decodeToken(token);
    // eslint-disable-next-line require-atomic-updates
    req.headers.user = payload;
    const user = await getUserByPk(payload.id);
    if (!user) return next(unauthorized(INVALID_TOKEN_MESSAGE_ERROR));
    return next();
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
