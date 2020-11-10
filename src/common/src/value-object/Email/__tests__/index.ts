import { IllegalArgumentError, PropertyRequiredError } from '../../../error';
import { Email, denyIllegalEmail } from '../';

describe('EmailEntity', () => {
  describe('denyIllegalEmail', () => {
    test('OK: Emailエンティティを生成できた', () => {
      expect(denyIllegalEmail('aaa@email.com')).toBeDefined();
    });
    test('NG: emailが空文字', () => {
      expect(() => denyIllegalEmail('')).toThrow(PropertyRequiredError);
    });
    test('NG: emailが不正', () => {
      expect(() => denyIllegalEmail('invalidemailaddress')).toThrow(IllegalArgumentError);
    });
  });

  describe('constructor', () => {
    test('OK: Emailエンティティを生成できた', () => {
      expect(new Email('aaa@email.com')).toBeDefined();
    });
    test('NG: emailが空文字', () => {
      expect(() => new Email('')).toThrow(PropertyRequiredError);
    });
    test('NG: emailが不正', () => {
      expect(() => new Email('invalidemailaddress')).toThrow(IllegalArgumentError);
    });
  });

  describe('getters', () => {
    const emailString = 'aaa@email.com';
    const emailEntity = new Email(emailString);

    test('OK: getEmail', () => {
      expect(emailEntity.getEmail()).toBe(emailString);
    });
    test('OK: toString', () => {
      expect(emailEntity.toString()).toBe(emailString);
    });
    test('OK: isEqual(string)', () => {
      expect(emailEntity.isEqual(emailString)).toBeTruthy();
    });
    test('OK: isEqual(Email)', () => {
      expect(emailEntity.isEqual(new Email(emailString))).toBeTruthy();
    });
    test('NG: !== isEqual(string)', () => {
      expect(emailEntity.isEqual('another-address@email.com')).toBeFalsy();
    });
    test('NG: !== isEqual(Email)', () => {
      expect(emailEntity.isEqual(new Email('another-address@email.com'))).toBeFalsy();
    });
    test('NG: !== isEqual(unknown)', () => {
      expect(() => emailEntity.isEqual({} as any)).toThrow(IllegalArgumentError); // eslint-disable-line @typescript-eslint/no-explicit-any
    });
  });
});
