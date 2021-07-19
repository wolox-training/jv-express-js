'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ratings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      weet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'weets',
          key: 'id'
        }
      },
      rating_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      score: {
        type: Sequelize.ENUM,
        values: ['-1', '1'],
        allowNull: false
      }
    }),

  down: queryInterface => queryInterface.dropTable('ratings')
};
