import { Connection } from 'typeorm';
import { ApolloServerTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';

import { createDbConnection } from '../../setup/database';
import { createApolloServerForTesting } from '../../setup/apollo-server';
import { seedAll } from '../../../../src/infrastructure/typeorm/seeder/seedAll';

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
  let dbConnection: Connection | undefined;
  let testClient: ApolloServerTestClient | undefined;

  beforeAll(async () => {
    dbConnection = await createDbConnection();
    testClient = await createApolloServerForTesting(dbConnection);
    await seedAll(dbConnection);
  });

  afterAll(async () => {
    dbConnection?.close();
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
