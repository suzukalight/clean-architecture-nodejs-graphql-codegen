import { IllegalArgumentError, PropertyRequiredError, encryptPassword } from 'common';

import { AuthEmailPasswordDto } from '../AuthEmailPasswordDto';
import { AuthEmailPasswordEntity } from '../AuthEmailPasswordEntity';

describe('AuthEmailPasswordEntity', () => {
  const password = 'pass1234';
  let passwordEncrypted: string;
  let authDto: AuthEmailPasswordDto;

  beforeAll(async () => {
    passwordEncrypted = await encryptPassword(password);
    authDto = { userId: '1', email: 'aaa@email.com', passwordEncrypted };
  });

  test('OK: エンティティを生成できた', () => {
    const auth1 = new AuthEmailPasswordEntity(authDto);
    expect(auth1.getUserId().isEqual(authDto.userId)).toBeTruthy();
    expect(auth1.getEmail().isEqual(authDto.email)).toBeTruthy();
    expect(auth1.getPassword().isEqual(authDto.passwordEncrypted)).toBeTruthy();
  });

  test('NG: userIdが不足しているため、失敗した', () => {
    const invalidAuthEmailPasswordDto = { ...authDto };
    delete invalidAuthEmailPasswordDto.userId;
    expect(() => new AuthEmailPasswordEntity(invalidAuthEmailPasswordDto)).toThrow(
      PropertyRequiredError,
    );
  });

  test('NG: emailが不足しているため、失敗した', () => {
    const invalidAuthEmailPasswordDto = { ...authDto };
    delete invalidAuthEmailPasswordDto.email;
    expect(() => new AuthEmailPasswordEntity(invalidAuthEmailPasswordDto)).toThrow(
      PropertyRequiredError,
    );
  });

  test('NG: 不正なemailを指定したため、失敗した', () => {
    const invalidAuthEmailPasswordDto = { ...authDto, email: 'invalidEmailString' };
    expect(() => new AuthEmailPasswordEntity(invalidAuthEmailPasswordDto)).toThrow(
      IllegalArgumentError,
    );
  });

  test('NG: passwordEncryptedが不足しているため、失敗した', () => {
    const invalidAuthEmailPasswordDto = { ...authDto };
    delete invalidAuthEmailPasswordDto.passwordEncrypted;
    expect(() => new AuthEmailPasswordEntity(invalidAuthEmailPasswordDto)).toThrow(
      PropertyRequiredError,
    );
  });

  test('NG: 不正なpasswordEncryptedを指定したため、失敗した', () => {
    const invalidAuthEmailPasswordDto = { ...authDto, passwordEncrypted: '' };
    expect(() => new AuthEmailPasswordEntity(invalidAuthEmailPasswordDto)).toThrow(
      PropertyRequiredError,
    );
  });
});
