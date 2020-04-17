'use strict';
module.exports = {
	up   : (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id                   : {
				allowNull     : false,
				autoIncrement : true,
				primaryKey    : true,
				type          : Sequelize.INTEGER
			},
			username             : {
				allowNull : false,
				type      : Sequelize.STRING,
				unique    : true
			},
			email                : {
				allowNull : false,
				type      : Sequelize.STRING,
				unique    : true
			},
			password             : {
				allowNull : false,
				type      : Sequelize.STRING
			},
			salt             : {
				allowNull : false,
				type      : Sequelize.STRING
			},
			resetPasswordToken   : {
				type : Sequelize.STRING
			},
			resetPasswordExpires : {
				type : Sequelize.DATE
			},
			createdAt            : {
				allowNull    : false,
				type         : Sequelize.DATE,
				defaultValue : Sequelize.NOW
			},
			updatedAt            : {
				allowNull    : false,
				type         : Sequelize.DATE,
				defaultValue : Sequelize.NOW
			}
		});
	},
	down : (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users');
	}
};
