'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'position', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'position')
};
