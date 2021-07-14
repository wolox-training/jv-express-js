const { ROLES } = require('../../config/constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(ROLES),
        allowNull: false,
        defaultValue: ROLES.REGULAR
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'users'
    }
  );

  User.associate = models => {
    User.hasMany(models.Weet);
  };

  return User;
};
