const logger = require('../logger');
const { getQuote } = require('../services/quotes');
const Weetservices = require('../services/weets');
const { maxLength } = require('../../config').common.weet;
const { WEET_CREATED, MAX_LENGTH_MESSAGE_ERROR } = require('../../config/constants');
const { payloadTooLarge } = require('../errors');

exports.createWeet = async (req, res, next) => {
  try {
    // const { quote, author } = typeof req.body.quote === 'undefined' ? await getQuote() : req.body;
    const { quote, author } = await getQuote();
    const userId = req.user.id;
    const weet = { userId, author, quote };
    logger.info(
      `Create Weet start: 
      method: ${req.method},
      endpointt: ${req.path}
      weet: ${JSON.stringify(weet)}`
    );
    if (!(quote.length <= maxLength)) return next(payloadTooLarge(MAX_LENGTH_MESSAGE_ERROR));
    await Weetservices.createWeet(weet);
    return res.status(201).send({
      message: WEET_CREATED,
      data: { author, quote }
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
