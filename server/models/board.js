'use strict';
module.exports = (sequelize, DataTypes) => {
	const Board = sequelize.define(
		'Board',
		{
			title       : {
				type      : DataTypes.STRING,
				allowNull : false
			},
			visibility  : {
				type         : DataTypes.STRING,
				allowNull    : false,
				defaultValue : 'public'
			},
			background  : {
				type         : DataTypes.STRING,
				allowNull    : false,
				defaultValue : '#0079bf'
			},
			isStarred   : {
				type         : DataTypes.BOOLEAN,
				allowNull    : false,
				defaultValue : false
			},
			isArchived  : {
				type         : DataTypes.BOOLEAN,
				allowNull    : false,
				defaultValue : false
			},
			description : DataTypes.TEXT
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

		Board.hasMany(models.List, { onDelete: 'cascade' });

		Board.hasMany(models.Card, { onDelete: 'cascade' });
	};

	return Board;
};
