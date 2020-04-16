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
				username : 'tester1',
				email    : 'test1@test.gmail.com',
				password : 'test1'
			},
			{
				username : 'tester2',
				email    : 'test2@test.gmail.com',
				password : 'test2'
			}
		]);
	},

	down : (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
		return queryInterface.bulkDelete('Users', null, {});
	}
};
