const { USER_CREATED, VALIDATE_PASSWORD_MATCHES, VALIDATE_IS_INTEGER } = require('../../config/constants');
const { BAD_REQUEST, DUPLICATED_REGISTER_ERROR } = require('../../app/errors');
const { validateMessage, VALIDATE_EXISTS, USER_ALREADY_EXIST } = require('../../config/constants');

const inputUserExpected = {
  name: 'Jhon',
  lastName: 'Velásquez',
  mail: 'jhon.velasquez@wolox.co',
  password: 'abcd1234'
};

const outputUserExpected = {
  message: USER_CREATED,
  data: {
    name: inputUserExpected.name
  }
};

const invalidEmailExpected = {
  message: USER_ALREADY_EXIST,
  internal_code: DUPLICATED_REGISTER_ERROR
};

const invalidPassword = 'abc123';

const invalidPasswordExpected = {
  message: [
    {
      msg: validateMessage('password', VALIDATE_PASSWORD_MATCHES),
      location: 'body',
      param: 'password',
      value: invalidPassword
    }
  ],
  internal_code: BAD_REQUEST
};

const nonParameterRequired = parameterName => ({
  msg: validateMessage(parameterName, VALIDATE_EXISTS),
  param: parameterName,
  location: 'body'
});

const countMock = 10;
const rowsMock = [
  {
    id: 1,
    name: 'Jhon',
    lastName: 'Velásquez',
    mail: 'jhon.velasquez@wolox.co'
  },
  {
    id: 2,
    name: 'Test',
    lastName: 'User',
    mail: 'test2.user@wolox.co'
  },
  {
    id: 3,
    name: 'Test',
    lastName: 'User',
    mail: 'test3.user@wolox.co'
  },
  {
    id: 4,
    name: 'Test',
    lastName: 'User',
    mail: 'test4.user@wolox.co'
  },
  {
    id: 5,
    name: 'Test',
    lastName: 'User',
    mail: 'test5.user@wolox.co'
  }
];

// eslint-disable-next-line no-unused-vars
const getUsersListMock = pagination =>
  Promise.resolve({
    count: countMock,
    rows: rowsMock
  });

const getUsersBadQueryResponse = (offset, limit) => ({
  message: [
    {
      value: limit,
      msg: `'limit' ${VALIDATE_IS_INTEGER}`,
      param: 'limit',
      location: 'query'
    },
    {
      value: offset,
      msg: `'offset' ${VALIDATE_IS_INTEGER}`,
      param: 'offset',
      location: 'query'
    }
  ],
  internal_code: 'bad_request'
});

module.exports = {
  inputUserExpected,
  outputUserExpected,
  invalidPassword,
  invalidEmailExpected,
  invalidPasswordExpected,
  nonParameterRequired,
  getUsersListMock,
  countMock,
  rowsMock,
  getUsersBadQueryResponse
};
