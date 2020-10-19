import { ApolloServerTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';

import { SqliteDbConnection } from '../../setup/database';
import { createApolloServerForTesting } from '../../setup/apollo-server';

const SIGN_IN_EMAIL_PASSWORD = gql`
  mutation SignInEmailPassword($input: SignInEmailPasswordRequest) {
    signInEmailPassword(input: $input) {
      user {
        id
        email
        roles
      }
      token
    }
  }
`;

describe('signInEmailPassword', () => {
  const sqliteDbConnection = new SqliteDbConnection();
  let testClient: ApolloServerTestClient | undefined;

  beforeAll(async () => {
    const connection = await sqliteDbConnection.connect();

    testClient = await createApolloServerForTesting(connection);
    await sqliteDbConnection.seedAll();
  });

  afterAll(async () => {
    await sqliteDbConnection.dispose();
  });

  test('OK: 登録済みのメールアドレスとパスワードを指定した', async () => {
    const result = await testClient?.mutate({
      mutation: SIGN_IN_EMAIL_PASSWORD,
      variables: {
        input: {
          email: 'admin@email.com',
          password: 'password1234',
        },
      },
    });

    const { user, token } = result?.data?.signInEmailPassword ?? {};
    expect(user?.email).toBe('admin@email.com');
    expect(token).toBeDefined();
  });

  test('NG: 無効なパラメータを指定した', async () => {
    const result = await testClient?.mutate({
      mutation: SIGN_IN_EMAIL_PASSWORD,
      variables: {
        input: {
          hoge: 'fuga',
        },
      },
    });

    const { data, errors } = result ?? {};
    expect(data).toBeUndefined(); // dataはundefinedが返ってくる（無効なリクエストのため）
    expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
  });

  test('NG: 無効なメールアドレスを指定した', async () => {
    const result = await testClient?.mutate({
      mutation: SIGN_IN_EMAIL_PASSWORD,
      variables: {
        input: {
          email: 'not_a_member@email.com',
          password: 'password1234',
        },
      },
    });

    const { data, errors } = result ?? {};
    expect(data?.signInEmailPassword).toBeNull(); // dataはnullが返ってくる
    expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
  });

  test('NG: 登録済みのメールアドレスに対して、誤ったパスワードを指定した', async () => {
    const result = await testClient?.mutate({
      mutation: SIGN_IN_EMAIL_PASSWORD,
      variables: {
        input: {
          email: 'admin@email.com',
          password: 'incorrectpassword',
        },
      },
    });

    const { data, errors } = result ?? {};
    expect(data?.signInEmailPassword).toBeNull(); // dataはnullが返ってくる
    expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
  });
});
