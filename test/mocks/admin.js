/* eslint-disable no-unused-vars */
const { ADMIN_PRIVILEGES_MESSAGE_ERROR } = require('../../config/constants');

exports.getBadResponsePrivileges = {
  message: ADMIN_PRIVILEGES_MESSAGE_ERROR,
  internal_code: 'unauthorized'
};

exports.adminUser = {
  name: 'Jhon',
  lastName: 'Velasquez',
  password: '$2a$10$xACyWYbW8uJxydccdoKYq.Iq5O7yHaOoPPlq4oPNMQT304QWqbBhy',
  mail: 'admin.velasquez@wolox.co',
  role: 'admin'
};

exports.regularUser = {
  name: 'Jhon',
  lastName: 'Velasquez',
  password: 'abcd1234',
  mail: 'regular.velasquez@wolox.co',
  role: 'regular'
};

exports.signinAdminCredentials = {
  mail: 'admin.velasquez@wolox.co',
  password: 'abcd1234'
};
exports.signinRegularCredentials = {
  mail: 'regular.velasquez@wolox.co',
  password: 'abcd1234'
};
