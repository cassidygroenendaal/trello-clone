'use strict';
module.exports = {
	up   : (queryInterface, Sequelize) => {
		return queryInterface.createTable('Lists', {
			id        : {
				allowNull     : false,
				autoIncrement : true,
				primaryKey    : true,
				type          : Sequelize.INTEGER
			},
			title     : {
				allowNull : false,
				type      : Sequelize.STRING
			},
			position  : {
				allowNull : false,
				type      : Sequelize.INTEGER
			},
			BoardId   : {
				allowNull : false,
				type      : Sequelize.INTEGER
			},
			createdAt : {
				allowNull    : false,
				type         : Sequelize.DATE,
				defaultValue : Sequelize.NOW
			},
			updatedAt : {
				allowNull    : false,
				type         : Sequelize.DATE,
				defaultValue : Sequelize.NOW
			}
		});
	},
	down : (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Lists');
	}
};
