// Configuration bcrypt
exports.NUM_SALT = 10;

// Messages - Users states
exports.USER_CREATED = 'User created successfuly';

// Messages - Validate SignUp users
exports.validateMessage = (keyName, msg) => `'${keyName}' ${msg}`;
exports.VALIDATE_EXISTS = 'is required';
exports.VALIDATE_NOT_EMPTY = 'must be non empty';
exports.VALIDATE_IS_STRING = 'must be a string';
exports.VALIDATE_MAIL_MATCHES = 'is not an email address allowed';
exports.VALIDATE_PASSWORD_MATCHES = 'is not a password allowed';

exports.GET_USER_BY_MAIL_ERROR = 'Error trying to get a user by mail';
exports.USER_ALREADY_EXIST = 'User already exist in database';
