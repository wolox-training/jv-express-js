// Configuration bcrypt
exports.HASH_MESSAGE_ERROR = 'Error hashing the password';
exports.COMPARE_HASH_MESSAGE_ERROR = 'Error comparing the passwords';

// Messages - Users states
exports.USER_CREATED = 'User created successfuly';

// Messages - Validate SignUp users
exports.validateMessage = (keyName, msg) => `'${keyName}' ${msg}`;
exports.VALIDATE_EXISTS = 'is required';
exports.VALIDATE_NOT_EMPTY = 'must be non empty';
exports.VALIDATE_IS_STRING = 'must be a string';
exports.VALIDATE_MAIL_MATCHES = 'is not an email address allowed';
exports.VALIDATE_PASSWORD_MATCHES = 'is not a password allowed';

// Messages - Database
exports.USER_ALREADY_EXIST = 'User already exist in database';
exports.CREATE_USER_ON_DB_ERROR = 'User can not be created in database';
exports.QUERYING_DATABASE_ERROR = 'Error querying to database';

// Messages - Sessions
exports.BAD_CREDENTIALS = 'Input credentials are not valid';
exports.SIGN_IN_SUCCESSFUL = 'Sign in process was successful';
exports.SIGN_IN_MESSAGE_ERROR = 'Was not posible sign in';

// Configuration - get Users
exports.NO_TOKEN_MESSAGE_ERROR = 'There isn´t a token in the request';
exports.INVALID_TOKEN_MESSAGE_ERROR = 'Unauthorized for this session';
exports.GET_USERS_SUCCESSFULLY = 'Users were obtained successfully';
exports.JWT_DECODE_MESSAGE_ERROR = 'Error trying to decode JWT';
