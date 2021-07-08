const { User } = require('../models');
const { GET_USER_BY_MAIL_ERROR, USER_ALREADY_EXIST } = require('../../config/constants');
const { databaseError, duplicatedRegisterError } = require('../errors');
const logger = require('../logger');

exports.validateUserByEmail = async (req, res, next) => {
  try {
    const { mail } = req.body;
    const user = await User.findOne({ where: { mail } });
    if (!user) return next();
    return next(duplicatedRegisterError(USER_ALREADY_EXIST));
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(GET_USER_BY_MAIL_ERROR);
  }
};
