'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model1 = sequelize.define(
		'Model1',
		{
			name : DataTypes.TEXT
		},
		{}
	);
	Model1.associate = function(models) {
		// associations can be defined here
	};

	// Model1.associate = function(models) {
	//   Model1.belongsTo(models.Model2, {
	//     foreignKey: { allowNull: false }
	//   });
	// };

	// Model2 would have:
	// Model2.associate = function(models) {
	//   Model2.hasMany(models.Model1, { onDelete: "cascade" });
	// };

	return Model1;
};
