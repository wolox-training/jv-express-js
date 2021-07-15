const { WEET_CREATED } = require('../../config/constants');
const { maxLength } = require('../../config').common.weet;

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

exports.createLongWeetInput = {
  data: {
    data: [
      {
        quoteText: `In every parting there is an image of death.
        In every parting there is an image of death.
        In every parting there is an image of death.`,
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

exports.createLongWeetOutput = {
  message: WEET_CREATED,
  data: {
    quote: this.createLongWeetInput.data.data[0].quoteText.substring(0, maxLength),
    author: this.createLongWeetInput.data.data[0].quoteAuthor
  }
};

exports.regularUser = {
  name: 'Jhon',
  lastName: 'Velasquez',
  password: 'abcd1234',
  mail: 'weet.velasquez@wolox.co',
  role: 'regular'
};

exports.signinRegularCredentials = {
  mail: 'weet.velasquez@wolox.co',
  password: 'abcd1234'
};
