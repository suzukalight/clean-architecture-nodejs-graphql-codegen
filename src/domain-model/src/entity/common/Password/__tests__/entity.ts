import { IllegalArgumentError, PropertyRequiredError } from 'common';
import { encryptPassword } from '../encrypt';
import { Password } from '../entity';

describe('PasswordEntity', () => {
  describe('constructor', () => {
    test('OK: Passwordエンティティを生成できた', () => {
      expect(new Password('encryptedPasswordData1234')).toBeDefined();
    });
    test('NG: パスワードが空文字', () => {
      expect(() => new Password('')).toThrow(PropertyRequiredError);
    });
  });

  describe('getters', () => {
    const passwordEncrypted = 'encryptedPasswordData1234';
    const password = new Password(passwordEncrypted);

    test('OK: getPasswordEncrypted', () => {
      expect(password.getPasswordEncrypted()).toBe(passwordEncrypted);
    });
    test('OK: toString', () => {
      expect(password.toString()).toBe(passwordEncrypted);
    });
    test('OK: isEqual(string)', () => {
      expect(password.isEqual(passwordEncrypted)).toBeTruthy();
    });
    test('OK: isEqual(Password)', () => {
      expect(password.isEqual(new Password(passwordEncrypted))).toBeTruthy();
    });
    test('NG: !== isEqual(string)', () => {
      expect(password.isEqual('anotherEncryptedData')).toBeFalsy();
    });
    test('NG: !== isEqual(Password)', () => {
      expect(password.isEqual(new Password('anotherEncryptedData'))).toBeFalsy();
    });
    test('NG: !== isEqual(unknown)', () => {
      expect(() => password.isEqual({} as any)).toThrow(IllegalArgumentError); // eslint-disable-line @typescript-eslint/no-explicit-any
    });
  });

  describe('compareWith', () => {
    test('OK: compareWith', async () => {
      const passwordPlain = 'encryptedPasswordData1234';
      const passwordEncrypted = await encryptPassword(passwordPlain);
      expect(new Password(passwordEncrypted).compareWith(passwordPlain)).resolves.toBeTruthy();
    });
    test('NG: パスワードが異なる', async () => {
      const passwordPlain = 'encryptedPasswordData1234';
      const passwordEncrypted = await encryptPassword(passwordPlain);
      expect(
        new Password(passwordEncrypted).compareWith('anotherPasswordPhrase'),
      ).resolves.toBeFalsy();
    });
  });
});
