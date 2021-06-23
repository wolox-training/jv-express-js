const { check } = require('express-validator');
const {
  validateMessage,
  VALIDATE_EXISTS,
  VALIDATE_IS_STRING,
  VALIDATE_NOT_EMPTY,
  VALIDATE_MAIL_MATCHES,
  VALIDATE_PASSWORD_MATCHES
} = require('../../config/constants');

const mailRegex = /^[a-zA-Z0-9_.+-]+@wolox\.(mx|co|cl|com|com\.ar)$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z_.+\-@$!%*#?&])([a-zA-Z0-9_.+\-@$!%*#?&]){8,}$/;

exports.createUserValidator = [
  check('name')
    .exists()
    .withMessage(validateMessage('name', VALIDATE_EXISTS))
    .isString()
    .withMessage(validateMessage('name', VALIDATE_IS_STRING))
    .notEmpty()
    .withMessage(validateMessage('name', VALIDATE_NOT_EMPTY)),
  check('lastName')
    .exists()
    .withMessage(validateMessage('lastName', VALIDATE_EXISTS))
    .isString()
    .withMessage(validateMessage('lastName', VALIDATE_IS_STRING))
    .notEmpty()
    .withMessage(validateMessage('lastName', VALIDATE_NOT_EMPTY)),
  check('mail')
    .exists()
    .withMessage(validateMessage('mail', VALIDATE_EXISTS))
    .isString()
    .withMessage(validateMessage('mail', VALIDATE_IS_STRING))
    .notEmpty()
    .withMessage(validateMessage('mail', VALIDATE_NOT_EMPTY))
    .matches(mailRegex)
    .withMessage(validateMessage('mail', VALIDATE_MAIL_MATCHES)),
  check('password')
    .exists()
    .withMessage(validateMessage('password', VALIDATE_EXISTS))
    .isString()
    .withMessage(validateMessage('password', VALIDATE_IS_STRING))
    .notEmpty()
    .withMessage(validateMessage('password', VALIDATE_NOT_EMPTY))
    .matches(passwordRegex)
    .withMessage(validateMessage('password', VALIDATE_PASSWORD_MATCHES))
];
