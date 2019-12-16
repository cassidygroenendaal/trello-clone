module.exports = function(sequelize, DataTypes) {
  const Model2 = sequelize.define("Model2", {
    name: DataTypes.TEXT
  });

  Model2.associate = function(models) {
    Model2.hasMany(models.Model1, { onDelete: "cascade" });
  };

  return Model2;
};
