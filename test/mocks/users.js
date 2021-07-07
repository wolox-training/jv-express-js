const { USER_CREATED, VALIDATE_PASSWORD_MATCHES } = require('../../config/constants');
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

module.exports = {
  inputUserExpected,
  outputUserExpected,
  invalidPassword,
  invalidEmailExpected,
  invalidPasswordExpected,
  nonParameterRequired
};
