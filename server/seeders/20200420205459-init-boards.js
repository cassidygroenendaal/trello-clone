'use strict';

module.exports = {
	up   : (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Boards',
			[
				{
					title      : 'Board 1',
					starred    : false,
					visibility : 'public',
					background : '#0079bf',
					UserId     : 1,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Board 2',
					starred    : false,
					visibility : 'public',
					background : '#d29034',
					UserId     : 1,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Board 3',
					starred    : true,
					visibility : 'public',
					background : '#519839',
					UserId     : 1,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Board 1',
					starred    : true,
					visibility : 'public',
					background : '#b04632',
					UserId     : 2,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Board 2',
					starred    : false,
					visibility : 'public',
					background : '#89609e',
					UserId     : 2,
					createdAt  : new Date(),
					updatedAt  : new Date()
				}
			],
			{}
		);
	},

	down : (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Boards', null, {});
	}
};
