'use strict';

const crypto = require('crypto');

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
			password             : {
				type : DataTypes.STRING,
				get() {
					return () => this.getDataValue('password');
				}
			},
			salt                 : {
				type : DataTypes.STRING,
				get() {
					return () => this.getDataValue('salt');
				}
			},
			resetPasswordToken   : DataTypes.STRING,
			resetPasswordExpires : DataTypes.DATE
		},
		{}
	);

	User.associate = function(models) {
		// associations can be defined here
	};

	User.generateSalt = function() {
		return crypto.randomBytes(16).toString('base64');
	};

	User.encryptPassword = function(password, salt) {
		return crypto
			.createHash('RSA-SHA256')
			.update(password)
			.update(salt)
			.digest('hex');
	};

	const setSaltAndPassword = user => {
		if (user.changed('password')) {
			user.salt = User.generateSalt();
			user.password = User.encryptPassword(
				user.password(),
				user.salt()
			);
		}
	};

	User.prototype.comparePassword = function(challenge) {
		return (
			this.password() === User.encryptPassword(challenge, this.salt())
		);
	};

	User.beforeCreate(setSaltAndPassword);
	User.beforeUpdate(setSaltAndPassword);

	return User;
};
