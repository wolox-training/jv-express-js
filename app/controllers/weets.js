const logger = require('../logger');
const { getQuote } = require('../services/quotes');
const WeetServices = require('../services/weets');
const { WEET_CREATED, GET_WEETS_SUCCESSFULLY } = require('../../config/constants');
const { maxLength } = require('../../config').common.weet;

exports.createWeet = async (req, res, next) => {
  try {
    const { quote, author } = await getQuote();
    const userId = req.user.id;
    const weet = { userId, author, quote: quote.substring(0, maxLength) };
    logger.info(
      `Create Weet start: 
      method: ${req.method},
      endpointt: ${req.path}
      weet: ${JSON.stringify(weet)}`
    );
    // if (!(quote.length <= maxLength)) return next(payloadTooLarge(MAX_LENGTH_MESSAGE_ERROR));
    await WeetServices.createWeet(weet);
    return res.status(201).send({
      message: WEET_CREATED,
      data: { author: weet.author, quote: weet.quote }
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.getWeets = async (req, res, next) => {
  try {
    const { page, limit } = await req.query;
    logger.info(
      `GetWeets start: 
      method: ${req.method},
      endpointt: ${req.path},
      pagination: [${page} - ${limit}]`
    );
    const weets = await WeetServices.getWeets({ page, limit });
    return res.status(200).send({
      message: GET_WEETS_SUCCESSFULLY,
      data: { weets }
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
