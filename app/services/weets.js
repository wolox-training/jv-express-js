const logger = require('../logger');
const { databaseError } = require('../errors');
const { Weet } = require('../models');
const { QUERYING_DATABASE_ERROR } = require('../../config/constants');
const { WEET_PAGINATION_OFFSET, WEET_PAGINATION_LIMIT } = require('../../config').common.weet;

exports.createWeet = weet => {
  try {
    return Weet.create(weet);
  } catch (error) {
    logger.error(error);
    throw databaseError(QUERYING_DATABASE_ERROR);
  }
};

exports.getWeets = ({ page = WEET_PAGINATION_OFFSET, limit = WEET_PAGINATION_LIMIT }) => {
  try {
    return Weet.findAndCountAll({
      page,
      limit,
      attributes: ['id', 'quote', 'author', 'userId']
    });
  } catch (error) {
    logger.error(error);
    throw databaseError(QUERYING_DATABASE_ERROR);
  }
};
