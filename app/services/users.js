const logger = require('../logger');
const { databaseError } = require('../errors');
const { User } = require('../models');
const { CREATE_USER_ON_DB_ERROR, QUERYING_DATABASE_ERROR } = require('../../config/constants');
const { PAGINATION_OFFSET, PAGINATION_LIMIT } = require('../../config').common.session;

exports.createUser = user => {
  try {
    return User.create(user);
  } catch (error) {
    logger.error(error);
    throw databaseError(CREATE_USER_ON_DB_ERROR);
  }
};

exports.getUserByEmail = mail => {
  try {
    return User.findOne({ where: { mail } });
  } catch (error) {
    logger.error(error);
    throw databaseError(QUERYING_DATABASE_ERROR);
  }
};

exports.getUserByPk = primaryKey => {
  try {
    return User.findByPk(primaryKey);
  } catch (error) {
    logger.error(error);
    throw databaseError(QUERYING_DATABASE_ERROR);
  }
};

exports.getAllUsers = ({ offset = PAGINATION_OFFSET, limit = PAGINATION_LIMIT }) => {
  try {
    return User.findAndCountAll({
      offset,
      limit,
      attributes: ['id', 'name', 'lastName', 'mail', 'role']
    });
  } catch (error) {
    logger.error(error);
    throw databaseError(QUERYING_DATABASE_ERROR);
  }
};

exports.createAdmin = userAdmin => {
  try {
    return User.upsert(userAdmin, { returning: true });
  } catch (error) {
    logger.error(error);
    throw databaseError(QUERYING_DATABASE_ERROR);
  }
};
