'use strict';
module.exports = (sequelize, DataTypes) => {
	const Card = sequelize.define(
		'Card',
		{
			title       : {
				type      : DataTypes.STRING,
				allowNull : false
			},
			description : DataTypes.STRING,
			position    : {
				type      : DataTypes.INTEGER,
				allowNull : false
			},
			isArchived  : {
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

	Card.associate = function(models) {
		Card.belongsTo(models.Board, {
      foreignKey: {allowNull: false}
    })

    Card.belongsTo(models.List, {
      foreignKey: {allowNull: false}
    })
	};

	return Card;
};
