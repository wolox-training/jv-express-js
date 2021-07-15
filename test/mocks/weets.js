const { TOO_LARGE } = require('../../app/errors');
const { WEET_CREATED, MAX_LENGTH_MESSAGE_ERROR } = require('../../config/constants');

exports.createWeetInput = {
  data: {
    data: [
      {
        quoteText: 'In every parting there is an image of death.',
        quoteAuthor: 'George Eliot'
      }
    ]
  }
};

exports.createWeetOutput = {
  message: WEET_CREATED,
  data: {
    quote: this.createWeetInput.data.data[0].quoteText,
    author: this.createWeetInput.data.data[0].quoteAuthor
  }
};

exports.createWeetLargeInput = {
  quote: `In every parting there is an image of death.
          In every parting there is an image of death.
          In every parting there is an image of death.`,
  author: 'George Eliot'
};

exports.weetMockLarge = {
  quote: `In every parting there is an image of death.
          In every parting there is an image of death.
          In every parting there is an image of death.`,
  author: 'George Eliot'
};

exports.createWeetLargeOutput = {
  message: MAX_LENGTH_MESSAGE_ERROR,
  internal_code: TOO_LARGE
};
