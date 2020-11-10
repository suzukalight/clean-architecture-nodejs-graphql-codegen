import { ApolloServerTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import { RoleTypes } from 'common';

import { SqliteDbConnection } from '../../setup/database';
import { createApolloServerForTesting } from '../../setup/apollo-server';

const DELETE_USER = gql`
  # Write your query or mutation here
  mutation DeleteUser($input: DeleteUserRequest) {
    deleteUser(input: $input) {
      user {
        id
      }
    }
  }
`;

describe('deleteUser', () => {
  describe('Admin', () => {
    const actor = { id: '1', email: 'admin@email.com', roles: [RoleTypes.Admin] };
    const sqliteDbConnection = new SqliteDbConnection();
    let testClient: ApolloServerTestClient | undefined;

    beforeAll(async () => {
      const connection = await sqliteDbConnection.connect();
      testClient = await createApolloServerForTesting(connection, actor);
      await sqliteDbConnection.seedAll();
    });

    afterAll(async () => {
      await sqliteDbConnection.dispose();
    });

    test('OK: Adminロールで、エンティティの削除ができた', async () => {
      const result = await testClient?.mutate({
        mutation: DELETE_USER,
        variables: {
          input: {
            id: '3',
          },
        },
      });

      const { user } = result?.data?.deleteUser ?? {};
      expect(user).toBeDefined();
    });

    test('NG: 存在しないIDを指定した', async () => {
      const result = await testClient?.mutate({
        mutation: DELETE_USER,
        variables: {
          input: {
            id: '99999',
          },
        },
      });

      const { data, errors } = result ?? {};
      expect(data?.deleteUser).toBeNull(); // dataはnullが返ってくる
      expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
    });

    test('NG: 無効なパラメータを指定した', async () => {
      const result = await testClient?.mutate({
        mutation: DELETE_USER,
        variables: {
          input: {
            hoge: 'fugafuga',
          },
        },
      });

      const { data, errors } = result ?? {};
      expect(data).toBeUndefined(); // dataはundefinedが返ってくる（無効なリクエストのため）
      expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
    });
  });

  describe('Member', () => {
    const actor = { id: '2', email: 'member@email.com', roles: [RoleTypes.Member] };
    const sqliteDbConnection = new SqliteDbConnection();
    let testClient: ApolloServerTestClient | undefined;

    beforeAll(async () => {
      const connection = await sqliteDbConnection.connect();
      testClient = await createApolloServerForTesting(connection, actor);
      await sqliteDbConnection.seedAll();
    });

    afterAll(async () => {
      await sqliteDbConnection.dispose();
    });

    test('OK: 自身の削除ができた', async () => {
      const result = await testClient?.mutate({
        mutation: DELETE_USER,
        variables: {
          input: {
            id: '2',
          },
        },
      });

      const { user } = result?.data?.deleteUser ?? {};
      expect(user).toBeDefined();
    });

    test('NG: 失敗：Adminロールでないactorが操作した', async () => {
      const result = await testClient?.mutate({
        mutation: DELETE_USER,
        variables: {
          input: {
            id: '1',
          },
        },
      });

      const { data, errors } = result ?? {};
      expect(data?.deleteUser).toBeNull(); // dataはnullが返ってくる
      expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
    });
  });
});
