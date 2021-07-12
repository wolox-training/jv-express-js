const { ROLES } = require('../../config/constants');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM,
      values: Object.values(ROLES),
      allowNull: false,
      defaultValue: ROLES.REGULAR
    }),
  down: queryInterface =>
    Promise.all([queryInterface.removeColumn('users', 'role'), queryInterface.dropEnum('enum_users_role')])
};
