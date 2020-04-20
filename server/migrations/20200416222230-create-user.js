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
			fullname             : {
				allowNull : false,
				type      : Sequelize.STRING
			},
			initials             : {
				allowNull : false,
				type      : Sequelize.STRING
			},
			bio                  : Sequelize.TEXT,
			avatar               : Sequelize.STRING,
			password             : {
				allowNull : false,
				type      : Sequelize.STRING
			},
			salt                 : {
				allowNull : false,
				type      : Sequelize.STRING
			},
			resetPasswordToken   : Sequelize.STRING,
			resetPasswordExpires : Sequelize.DATE,
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
