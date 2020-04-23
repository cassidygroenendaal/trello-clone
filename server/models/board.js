'use strict';
module.exports = (sequelize, DataTypes) => {
	const Board = sequelize.define(
		'Board',
		{
			title      : {
				type      : DataTypes.STRING,
				allowNull : false
			},
			visibility : {
				type         : DataTypes.STRING,
				allowNull    : false,
				defaultValue : 'public'
			},
			background : {
				type         : DataTypes.STRING,
				allowNull    : false,
				defaultValue : '#0079bf'
			},
			isStarred    : {
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

	Board.associate = function(models) {
		Board.belongsTo(models.User, {
			foreignKey : { allowNull: false }
		});
	};

	return Board;
};
