import { Connection } from 'typeorm';
import addDays from 'date-fns/addDays';
import { Role, RoleTypes } from 'common';

import { GqlTodoRepository } from '../../repository/Todo';
import { GqlUserRepository } from '../../../user/repository/User';
import { SqliteDbConnection } from '../../../_testutils/connection';
import { GqlTodoQueryService } from '../Todo';

const seedAll = async (connection: Connection, startingPointDueDate: Date) => {
  const userRepository = new GqlUserRepository(connection);
  const todoRepository = new GqlTodoRepository(connection);

  const actor = await userRepository.create({});
  actor.addRole(new Role(RoleTypes.Member));

  const creators = [1, 2, 3].map(async (value) => {
    await todoRepository.create({
      ownerId: actor.getId().toString(),
      title: `TODO #${value}`,
      dueDate: addDays(startingPointDueDate, value),
    });
  });

  await Promise.all(creators);
};

describe('GqlTodoQueryService::allTodosWithDeadlineApproaching', () => {
  const sqliteDbConnection = new SqliteDbConnection();

  beforeAll(async () => {
    const connection = await sqliteDbConnection.connect();
    await seedAll(connection, new Date('2020-01-10T00:00Z'));
  });

  afterAll(async () => {
    await sqliteDbConnection.dispose();
  });

  test.each`
    dueDate                | length
    ${'2019-10-01T00:00Z'} | ${0}
    ${'2020-01-07T00:00Z'} | ${0}
    ${'2020-01-08T00:00Z'} | ${1}
    ${'2020-01-09T00:00Z'} | ${2}
    ${'2020-01-10T00:00Z'} | ${3}
    ${'2020-01-11T00:00Z'} | ${3}
    ${'2021-01-01T00:00Z'} | ${3}
  `(
    'OK: dueDate=$dueDateのとき、エンティティを$length件取得できた',
    async ({ dueDate, length }: { dueDate: string; length: number }) => {
      const connection = sqliteDbConnection.getConnection();
      if (!connection) throw new Error('cannot connect to test database.');
      const todoQueryService = new GqlTodoQueryService(connection);

      const result = await todoQueryService.allTodosWithDeadlineApproaching({
        dueDate: new Date(dueDate),
        daysBeforeWarning: 3,
      });

      expect(result.todos?.length).toBe(length);
    },
  );
});
