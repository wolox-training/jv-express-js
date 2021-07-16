module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ratingUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weetId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      score: {
        type: DataTypes.ENUM,
        values: [-1, 1],
        allowNull: false
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'ratings'
    }
  );
  Rating.associate = models => {
    Rating.belongsTo(models.Weet, { foreignKey: 'weetId' });
    Rating.belongsTo(models.User, { foreignKey: 'ratingUserId' });
  };

  return Rating;
};
