const axios = require('axios');
const logger = require('../logger');
const { serviceGardenError } = require('../errors');

const config = require('../../config').external.gardenApi;

const getQuote = async () => {
  try {
    const { data } = await axios.get(config.url);
    const quote = {
      author: data.data[0].quoteAuthor,
      text: data.data[0].quoteText
    };
    return quote;
  } catch (error) {
    logger.error(error);
    throw serviceGardenError('Garden service cannot get a quote');
  }
};

module.exports = {
  getQuote
};
