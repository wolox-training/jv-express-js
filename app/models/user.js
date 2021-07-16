const { USERS_POSITIONS, ROLES } = require('../../config/constants');

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
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get() {
          const rating = this.getDataValue('position');
          if (rating < 6) return USERS_POSITIONS.DEV;
          else if (rating < 9) return USERS_POSITIONS.LEAD;
          else if (rating < 19) return USERS_POSITIONS.TL;
          else if (rating < 29) return USERS_POSITIONS.EM;
          else if (rating < 49) return USERS_POSITIONS.HEAD;
          return USERS_POSITIONS.CEO;
        }
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'users'
    }
  );

  User.associate = models => {
    User.hasMany(models.Weet, { foreignKey: 'userId' });
    User.hasMany(models.Rating, { foreignKey: 'ratingUserId' });
  };

  return User;
};
