module.exports = function(sequelize, DataTypes) {
  const Model1 = sequelize.define("Model1", {
    name: DataTypes.TEXT
  });

  Model1.associate = function(models) {
    Model1.belongsTo(models.Model2, {
      foreignKey: { allowNull: false }
    });
  };

  return Model1;
};
