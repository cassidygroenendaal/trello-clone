'use strict';
module.exports = {
	up   : (queryInterface, Sequelize) => {
		return queryInterface.createTable('Boards', {
			id         : {
				allowNull     : false,
				autoIncrement : true,
				primaryKey    : true,
				type          : Sequelize.INTEGER
			},
			title      : {
				allowNull : false,
				type      : Sequelize.STRING
			},
			visibility : {
				allowNull    : false,
				type         : Sequelize.STRING,
				defaultValue : 'public'
			},
			background : {
				allowNull    : false,
				type         : Sequelize.STRING,
				defaultValue : '#0079bf'
			},
			starred    : {
				allowNull    : false,
				type         : Sequelize.BOOLEAN,
				defaultValue : false
			},
			UserId     : {
				allowNull : false,
				type      : Sequelize.INTEGER
			},
			createdAt  : {
				allowNull    : false,
				type         : Sequelize.DATE,
				defaultValue : Sequelize.NOW
			},
			updatedAt  : {
				allowNull    : false,
				type         : Sequelize.DATE,
				defaultValue : Sequelize.NOW
			}
		});
	},
	down : (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Boards');
	}
};
