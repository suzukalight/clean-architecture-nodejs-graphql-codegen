import { Connection } from 'typeorm';

import { GqlUserQueryService } from '../User';
import { GqlUserRepository } from '../../repository/User';
import { SqliteDbConnection } from '../../../_testutils/connection';

const seedAll = async (connection: Connection) => {
  const userRepository = new GqlUserRepository(connection);
  const users = [1, 2, 3].map(async (id) => {
    await userRepository.create({
      email: `user${id}@email.com`,
    });
  });
  await Promise.all(users);
};

describe('GqlUserueryService::getUserById', () => {
  const sqliteDbConnection = new SqliteDbConnection();

  beforeAll(async () => {
    const connection = await sqliteDbConnection.connect();
    await seedAll(connection);
  });

  afterAll(async () => {
    await sqliteDbConnection.dispose();
  });

  test.each`
    id     | exists
    ${'1'} | ${true}
    ${'2'} | ${true}
    ${'3'} | ${true}
    ${'4'} | ${false}
  `(
    'OK: id=$idのエンティティは取得できるか？=$exists',
    async ({ id, exists }: { id: string; exists: boolean }) => {
      const connection = sqliteDbConnection.getConnection();
      if (!connection) throw new Error('cannot connect to test database.');
      const userQueryService = new GqlUserQueryService(connection);

      const result = await userQueryService.getUserById({ id });

      expect(!!result?.user).toBe(exists);
    },
  );
});
