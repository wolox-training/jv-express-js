const logger = require('../logger');
const { databaseError } = require('../errors');
const { Weet } = require('../models');
const { QUERYING_DATABASE_ERROR } = require('../../config/constants');

exports.createWeet = weet => {
  try {
    return Weet.create(weet);
  } catch (error) {
    logger.error(error);
    throw databaseError(QUERYING_DATABASE_ERROR);
  }
};
