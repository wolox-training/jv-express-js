const bcrypt = require('bcryptjs');
const { NUM_SALT } = require('../../config/constants');

exports.encryptPassword = (value, salt = NUM_SALT) => bcrypt.hashSync(value, salt);
