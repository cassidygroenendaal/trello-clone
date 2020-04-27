'use strict';
module.exports = (sequelize, DataTypes) => {
	const List = sequelize.define(
		'List',
		{
			title      : {
				type      : DataTypes.STRING,
				allowNull : false
			},
			position   : {
				type      : DataTypes.INTEGER,
				allowNull : false
			},
			isArchived : {
				type         : DataTypes.BOOLEAN,
				allowNull    : false,
				defaultValue : false
			}
		},
		{}
	);

	//===========================================
	// Associations
	//-------------------------------------------

	List.associate = function(models) {
		List.belongsTo(models.Board, {
			foreignKey : { allowNull: false }
		});
	};

	return List;
};
