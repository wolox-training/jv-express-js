const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.SERVICE_GARDEN_ERROR = 'service_garden_error';
exports.serviceGardenError = message => internalError(message, exports.SERVICE_GARDEN_ERROR);
