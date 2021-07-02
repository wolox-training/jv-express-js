const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.SERVICE_ERROR = 'service_error';
exports.serviceError = message => internalError(message, exports.SERVICE_ERROR);

exports.UNPROCESSABLE_ENTITY = 'unprocessable_entity';
exports.unprocessableEntity = message => internalError(message, exports.UNPROCESSABLE_ENTITY);

exports.BAD_REQUEST = 'bad_request';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);

exports.DUPLICATED_REGISTER_ERROR = 'duplicated_register_error';
exports.duplicatedRegisterError = message => internalError(message, exports.DUPLICATED_REGISTER_ERROR);

exports.UNAUTHORIZED = 'unauthorized';
exports.unauthorized = message => internalError(message, exports.UNAUTHORIZED);
