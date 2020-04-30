'use strict';
module.exports = {
	up   : (queryInterface, Sequelize) => {
		return queryInterface.createTable('Cards', {
			id          : {
				allowNull     : false,
				autoIncrement : true,
				primaryKey    : true,
				type          : Sequelize.INTEGER
			},
			title       : {
				allowNull : false,
				type      : Sequelize.STRING
			},
			description : {
				type : Sequelize.STRING
			},
			position    : {
				allowNull : false,
				type      : Sequelize.INTEGER
			},
			isArchived  : {
				allowNull    : false,
				type         : Sequelize.BOOLEAN,
				defaultValue : false
			},
			ListId      : {
				allowNull : false,
				type      : Sequelize.INTEGER
			},
			BoardId     : {
				allowNull : false,
				type      : Sequelize.INTEGER
			},
			createdAt   : {
				allowNull    : false,
				type         : Sequelize.DATE,
				defaultValue : Sequelize.NOW
			},
			updatedAt   : {
				allowNull    : false,
				type         : Sequelize.DATE,
				defaultValue : Sequelize.NOW
			}
		});
	},
	down : (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Cards');
	}
};
