'use strict';

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'masahiko_kubara@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'suzukalight@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
