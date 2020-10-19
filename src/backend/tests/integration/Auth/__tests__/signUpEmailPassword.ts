import { ApolloServerTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';

import { SqliteDbConnection } from '../../setup/database';
import { createApolloServerForTesting } from '../../setup/apollo-server';

const SIGN_UP_EMAIL_PASSWORD = gql`
  mutation SignUpEmailPassword($input: SignUpEmailPasswordRequest) {
    signUpEmailPassword(input: $input) {
      user {
        id
        email
        roles
      }
      token
    }
  }
`;

describe('signUpEmailPassword', () => {
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

  test('OK: 新規のメールアドレスとパスワードを指定した', async () => {
    const result = await testClient?.mutate({
      mutation: SIGN_UP_EMAIL_PASSWORD,
      variables: {
        input: {
          email: 'new_member@email.com',
          password: 'password1234',
        },
      },
    });

    const { user, token } = result?.data?.signUpEmailPassword ?? {};
    expect(user?.email).toBe('new_member@email.com');
    expect(token).toBeDefined();
  });

  test('NG: 登録済みのメールアドレスを指定した', async () => {
    const result = await testClient?.mutate({
      mutation: SIGN_UP_EMAIL_PASSWORD,
      variables: {
        input: {
          email: 'admin@email.com',
          password: 'ninja5678',
        },
      },
    });

    const { data, errors } = result ?? {};
    expect(data?.signUpEmailPassword).toBeNull(); // dataはnullが返ってくる
    expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
  });

  test('NG: 無効なメールアドレスを指定した', async () => {
    const result = await testClient?.mutate({
      mutation: SIGN_UP_EMAIL_PASSWORD,
      variables: {
        input: {
          email: 'invalid_email_string',
          password: 'password1234',
        },
      },
    });

    const { data, errors } = result ?? {};
    expect(data?.signUpEmailPassword).toBeNull(); // dataはnullが返ってくる
    expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
  });

  test('NG: 適切ではないパスワードを指定した', async () => {
    const result = await testClient?.mutate({
      mutation: SIGN_UP_EMAIL_PASSWORD,
      variables: {
        input: {
          email: 'new_member_2@email.com',
          password: 'incorrectpassword',
        },
      },
    });

    const { data, errors } = result ?? {};
    expect(data?.signUpEmailPassword).toBeNull(); // dataはnullが返ってくる
    expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
  });

  test('NG: 無効なパラメータを指定した', async () => {
    const result = await testClient?.mutate({
      mutation: SIGN_UP_EMAIL_PASSWORD,
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
});
