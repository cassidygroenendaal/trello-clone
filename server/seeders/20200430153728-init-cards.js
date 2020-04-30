'use strict';

module.exports = {
	up   : (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Cards',
			[
				{
					title      : 'Card 1 (list 1)',
					position   : 0,
					isArchived : false,
					ListId     : 1,
					BoardId    : 1,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Card 2 (list 1)',
					position   : 1,
					isArchived : false,
					ListId     : 1,
					BoardId    : 1,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Card 1 (list 1)',
					position   : 0,
					isArchived : false,
					ListId     : 3,
					BoardId    : 2,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Card 2 (list 1)',
					position   : 1,
					isArchived : false,
					ListId     : 3,
					BoardId    : 2,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Card 1 (list 2)',
					position   : 0,
					isArchived : false,
					ListId     : 4,
					BoardId    : 2,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Card 2 (list 2)',
					position   : 1,
					isArchived : false,
					ListId     : 4,
					BoardId    : 2,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Card 3 (list 2)',
					position   : 2,
					isArchived : false,
					ListId     : 4,
					BoardId    : 2,
					createdAt  : new Date(),
					updatedAt  : new Date()
				},
				{
					title      : 'Card 4 (archived) (list 2)',
					position   : -1,
					isArchived : true,
					ListId     : 4,
					BoardId    : 2,
					createdAt  : new Date(),
					updatedAt  : new Date()
				}
			],
			{}
		);
	},

	down : (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Cards', null, {});
	}
};
