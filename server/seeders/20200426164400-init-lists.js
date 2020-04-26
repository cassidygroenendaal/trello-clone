'use strict';

module.exports = {
	up   : (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Lists',
			[
				{
					title     : 'List 1',
					position  : 1,
					BoardId   : 1,
					createdAt : new Date(),
					updatedAt : new Date()
				},
				{
					title     : 'List 2',
					position  : 2,
					BoardId   : 1,
					createdAt : new Date(),
					updatedAt : new Date()
				},
				{
					title     : 'List 1',
					position  : 1,
					BoardId   : 2,
					createdAt : new Date(),
					updatedAt : new Date()
				},
				{
					title     : 'List 2',
					position  : 2,
					BoardId   : 2,
					createdAt : new Date(),
					updatedAt : new Date()
				},
				{
					title     : 'List 3',
					position  : 3,
					BoardId   : 2,
					createdAt : new Date(),
					updatedAt : new Date()
				},
				{
					title     : 'List 4',
					position  : 4,
					BoardId   : 2,
					createdAt : new Date(),
					updatedAt : new Date()
				},
				{
					title     : 'List 1',
					position  : 1,
					BoardId   : 3,
					createdAt : new Date(),
					updatedAt : new Date()
				},
				{
					title     : 'List 1',
					position  : 1,
					BoardId   : 4,
					createdAt : new Date(),
					updatedAt : new Date()
				},
				{
					title     : 'List 1',
					position  : 1,
					BoardId   : 5,
					createdAt : new Date(),
					updatedAt : new Date()
				},
				{
					title     : 'List 2',
					position  : 2,
					BoardId   : 5,
					createdAt : new Date(),
					updatedAt : new Date()
				}
			],
			{}
		);
	},

	down : (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Lists', null, {});
	}
};
