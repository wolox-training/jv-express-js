const { checkSchema } = require('express-validator');
const {
  validateMessage,
  VALIDATE_EXISTS,
  VALIDATE_IS_STRING,
  VALIDATE_NOT_EMPTY,
  VALIDATE_MAIL_MATCHES,
  VALIDATE_PASSWORD_MATCHES
} = require('../../../config/constants');

const mailRegex = /^[a-zA-Z0-9_.+-]+@wolox\.(mx|co|cl|com|com\.ar)$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z_.+\-@$!%*#?&])([a-zA-Z0-9_.+\-@$!%*#?&]){8,}$/;

exports.createUserValidator = [
  checkSchema({
    name: {
      in: ['body'],
      exists: { errorMessage: validateMessage('name', VALIDATE_EXISTS) },
      isString: { errorMessage: validateMessage('name', VALIDATE_IS_STRING) },
      notEmpty: {
        value: true,
        errorMessage: validateMessage('name', VALIDATE_NOT_EMPTY)
      }
    },
    lastName: {
      in: ['body'],
      exists: { errorMessage: validateMessage('lastName', VALIDATE_EXISTS) },
      isString: { errorMessage: validateMessage('lastName', VALIDATE_IS_STRING) },
      notEmpty: {
        value: true,
        errorMessage: validateMessage('lastName', VALIDATE_NOT_EMPTY)
      }
    },
    mail: {
      in: ['body'],
      exists: { errorMessage: validateMessage('mail', VALIDATE_EXISTS) },
      isString: { errorMessage: validateMessage('mail', VALIDATE_IS_STRING) },
      notEmpty: { errorMessage: validateMessage('mail', VALIDATE_NOT_EMPTY) },
      matches: {
        options: mailRegex,
        errorMessage: validateMessage('mail', VALIDATE_MAIL_MATCHES)
      }
    },
    password: {
      in: ['body'],
      exists: { errorMessage: validateMessage('password', VALIDATE_EXISTS) },
      isString: { errorMessage: validateMessage('password', VALIDATE_IS_STRING) },
      notEmpty: { errorMessage: validateMessage('password', VALIDATE_NOT_EMPTY) },
      matches: {
        options: passwordRegex,
        errorMessage: validateMessage('password', VALIDATE_PASSWORD_MATCHES)
      }
    }
  })
];

exports.signinUserValidator = [
  checkSchema({
    mail: {
      in: ['body'],
      exists: { errorMessage: validateMessage('mail', VALIDATE_EXISTS) },
      isString: { errorMessage: validateMessage('mail', VALIDATE_IS_STRING) },
      notEmpty: { errorMessage: validateMessage('mail', VALIDATE_NOT_EMPTY) },
      matches: {
        options: mailRegex,
        errorMessage: validateMessage('mail', VALIDATE_MAIL_MATCHES)
      }
    }
  })
];
