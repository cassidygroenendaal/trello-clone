'use strict';

module.exports = {
	up   : (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
		return queryInterface.bulkInsert('Users', [
			{
				username  : 'tester1',
				email     : 'test1@test.gmail.com',
				password  : 'test1',
				createdAt : new Date(),
				updatedAt : new Date()
			},
			{
				username  : 'tester2',
				email     : 'test2@test.gmail.com',
				password  : 'test2',
				createdAt : new Date(),
				updatedAt : new Date()
			}
		]);
	},

	down : (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
