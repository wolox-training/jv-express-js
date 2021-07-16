const { checkSchema } = require('express-validator');
const { validateMessage, VALIDATE_IS_INTEGER } = require('../../../config/constants');

exports.getWeetsValidator = [
  checkSchema({
    limit: {
      in: ['params', 'query'],
      optional: { options: { nullable: true } },
      isInt: true,
      toInt: true,
      errorMessage: validateMessage('limit', VALIDATE_IS_INTEGER)
    },
    page: {
      in: ['params', 'query'],
      optional: { options: { nullable: true } },
      isInt: true,
      toInt: true,
      errorMessage: validateMessage('page', VALIDATE_IS_INTEGER)
    }
  })
];
