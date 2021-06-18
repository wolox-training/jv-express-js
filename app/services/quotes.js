const axios = require('axios');
const logger = require('../logger');

const getQuote = async (author, genre, count) => {
  const url = 'https://quote-garden.herokuapp.com/api/v3/quotes/random';
  let quote = {};
  const params = {
    author,
    genre,
    count
  };

  try {
    const resService = await axios.get(url, { params });
    quote = {
      author: resService.data.data[0].quoteAuthor,
      text: resService.data.data[0].quoteText
    };
  } catch (error) {
    logger.error('Error in the service');
  }
  return quote;
};

module.exports = {
  getQuote
};
