module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
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
      }
    },
    {
      timestamps: false
    }
  );
  return User;
};
