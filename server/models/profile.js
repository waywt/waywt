module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    header: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 120],
      },
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 720],
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,       
      },
    },
  }, {});

  Profile.associate = (models) => {
    Profile.belongsTo(models.User);
  };

  return Profile;
};
