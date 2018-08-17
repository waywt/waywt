module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {});

  Brand.associate = (models) => {
    Brand.hasMany(models.Outfit);
  };

  return Brand;
};
