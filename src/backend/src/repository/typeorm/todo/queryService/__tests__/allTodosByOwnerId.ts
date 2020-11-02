import { Role } from 'domain-model';
import { Connection } from 'typeorm';

import { GqlTodoRepository } from '../../repository/Todo';
import { GqlUserRepository } from '../../../user/repository/User';
import { SqliteDbConnection } from '../../../_testutils/connection';
import { RoleTypes } from '../../../../../../../domain-model/lib';
import { GqlTodoQueryService } from '../Todo';

const seedAll = async (connection: Connection) => {
  const userRepository = new GqlUserRepository(connection);
  const todoRepository = new GqlTodoRepository(connection);

  const actor = await userRepository.create({});
  await userRepository.create({});
  await userRepository.create({});
  await userRepository.create({});
  actor.addRole(new Role(RoleTypes.Member));

  const creators = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (value) => {
    await todoRepository.create({
      ownerId: `${(value % 4) + 1}`,
      title: `TODO #${value}`,
      dueDate: new Date(`2020-01-10T00:00Z`),
    });
  });

  await Promise.all(creators);
};

describe('GqlTodoQueryService::allTodosByOwnerId', () => {
  const sqliteDbConnection = new SqliteDbConnection();

  beforeAll(async () => {
    const connection = await sqliteDbConnection.connect();
    await seedAll(connection);
  });

  afterAll(async () => {
    await sqliteDbConnection.dispose();
  });

  test.each`
    ownerId | length
    ${'1'}  | ${3}
    ${'2'}  | ${3}
    ${'3'}  | ${2}
    ${'4'}  | ${2}
    ${'5'}  | ${0}
  `(
    'OK: ownerId=$ownerIdのとき、エンティティを$length件取得できた',
    async ({ ownerId, length }: { ownerId: string; length: number }) => {
      const connection = sqliteDbConnection.getConnection();
      if (!connection) throw new Error('cannot connect to test database.');
      const todoQueryService = new GqlTodoQueryService(connection);

      const result = await todoQueryService.allTodosByOwnerId({ ownerId });

      expect(result.todos?.length).toBe(length);
    },
  );
});
