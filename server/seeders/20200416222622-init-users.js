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
				email     : 'test1@test.com',
				// password  : 'test1',
				password  : '1905b8b0f6cf50b1dc4dbf375d5896e1f4d722e10674451f7bd039d7807f4a9a',
				salt      : 'cxpIM8qgvLW1UDa/folScQ==',
				createdAt : new Date(),
				updatedAt : new Date()
			},
			{
				username  : 'tester2',
				email     : 'test2@test.com',
				// password  : 'test2',
				password  : '4c88fcd7368d3b3aa79c128f1dab969da4b9609d0dd5e6a9bc0cb9b60418a724',
				salt      : '9eoL5U3QKQUW207v9sSQqw==',
				createdAt : new Date(),
				updatedAt : new Date()
			}
		]);
	},

	down : (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
