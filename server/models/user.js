'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			username             : {
				type   : DataTypes.STRING,
				unique : true
			},
			email                : {
				type   : DataTypes.STRING,
				unique : true
			},
			password             : DataTypes.STRING,
			resetPasswordToken   : DataTypes.STRING,
			resetPasswordExpires : DataTypes.DATE
		},
		{}
	);

	User.associate = function(models) {
		// associations can be defined here
	};

	User.prototype.comparePassword = function(challenge) {
		return this.password === challenge;
	};

	return User;
};
