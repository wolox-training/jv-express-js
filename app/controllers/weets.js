const logger = require('../logger');
const { getQuote } = require('../services/quotes');
const Weetservices = require('../services/weets');
const { WEET_CREATED } = require('../../config/constants');
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
    await Weetservices.createWeet(weet);
    return res.status(201).send({
      message: WEET_CREATED,
      data: { author: weet.author, quote: weet.quote }
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
