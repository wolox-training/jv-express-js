'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('weets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quote: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }),

  down: queryInterface => queryInterface.dropTable('weets')
};
