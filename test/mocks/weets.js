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

const countMock = 5;
const rowsMock = [
  {
    id: 1,
    quote:
      'I have discovered the art of deceiving diplomats. I tell them the truth and they never believe me',
    author: 'Camillo di Cavour',
    userId: 1
  },
  {
    id: 2,
    quote:
      'I have discovered the art of deceiving diplomats. I tell them the truth and they never believe me',
    author: 'Camillo di Cavour',
    userId: 1
  },
  {
    id: 3,
    quote:
      'I have discovered the art of deceiving diplomats. I tell them the truth and they never believe me',
    author: 'Camillo di Cavour',
    userId: 1
  },
  {
    id: 4,
    quote:
      'I have discovered the art of deceiving diplomats. I tell them the truth and they never believe me',
    author: 'Camillo di Cavour',
    userId: 1
  },
  {
    id: 5,
    quote:
      'I have discovered the art of deceiving diplomats. I tell them the truth and they never believe me',
    author: 'Camillo di Cavour',
    userId: 1
  }
];

exports.getWeetsListMock = () =>
  Promise.resolve({
    count: countMock,
    rows: rowsMock
  });

exports.badResponseExpectedWeet = {
  message: [
    {
      value: 'string',
      msg: "'page' must be an integer",
      param: 'page',
      location: 'query'
    }
  ],
  internal_code: 'bad_request'
};
