const logger = require('../logger');
const { databaseError, duplicatedRegisterError } = require('../errors');
const { User } = require('../models');
const { GET_USER_BY_MAIL_ERROR, USER_ALREADY_EXIST } = require('../../config/constants');

const findUserByEmail = async mail => {
  try {
    const user = await User.findOne({ where: { mail } });
    return user;
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(GET_USER_BY_MAIL_ERROR);
  }
};

exports.createUser = async user => {
  try {
    const existUser = await findUserByEmail(user.mail);
    if (!existUser) return User.create(user);
    throw duplicatedRegisterError(USER_ALREADY_EXIST);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
