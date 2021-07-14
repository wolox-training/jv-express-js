const { TOO_LARGE } = require('../../app/errors');
const { WEET_CREATED, MAX_LENGTH_MESSAGE_ERROR } = require('../../config/constants');

exports.createWeetInput = {
  quote: 'In every parting there is an image of death.',
  author: 'George Eliot'
};

exports.createWeetOutput = {
  message: WEET_CREATED,
  data: {
    quote: this.createWeetInput.quote,
    author: this.createWeetInput.author
  }
};

exports.createWeetLargeInput = {
  quote: `In every parting there is an image of death.
          In every parting there is an image of death.
          In every parting there is an image of death.`,
  author: 'George Eliot'
};

exports.createWeetLargeOutput = {
  message: MAX_LENGTH_MESSAGE_ERROR,
  internal_code: TOO_LARGE
};
