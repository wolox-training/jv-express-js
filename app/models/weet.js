module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quote: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'weets'
    }
  );

  Weet.associate = models => {
    Weet.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Weet;
};
