'use strict';

module.exports = {
	up   : (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Boards',
			[
				{
					title       : 'Board 1',
					isStarred   : false,
					visibility  : 'private',
					background  : '#0079bf',
					UserId      : 1,
					isArchived  : false,
					description :
						'Here is a test board..... Not too sure what else to put here.',
					createdAt   : new Date(),
					updatedAt   : new Date()
				},
				{
					title      : 'Board 2',
					isStarred  : true,
					visibility : 'private',
					background : '#d29034',
					UserId     : 1,
					isArchived : false,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Board 3',
					isStarred  : true,
					visibility : 'private',
					background : '#519839',
					UserId     : 1,
					isArchived : false,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Archived Board',
					isStarred  : false,
					visibility : 'private',
					background : '#519839',
					UserId     : 1,
					isArchived : true,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Board 1',
					isStarred  : true,
					visibility : 'private',
					background : '#b04632',
					UserId     : 2,
					isArchived : false,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title       : 'Board 2',
					isStarred   : false,
					visibility  : 'private',
					background  : '#89609e',
					description : 'YO WHATS UP THIS IS A BOARD!',
					UserId      : 2,
					isArchived  : false,
					createdAt   : new Date(),
					updatedAt   : new Date()
				}
			],
			{}
		);
	},

	down : (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Boards', null, {});
	}
};
