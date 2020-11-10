import { IllegalArgumentError, PropertyRequiredError } from '../../../error';
import { Role, RoleTypes, denyIllegalRole } from '../';

describe('RoleEntity', () => {
  describe('denyIllegalRole', () => {
    test('OK: Roleエンティティを生成できる文字列である', () => {
      expect(() => denyIllegalRole(RoleTypes.Member)).not.toThrow();
    });
    test('NG: roleが空文字', () => {
      expect(() => denyIllegalRole('')).toThrow(PropertyRequiredError);
    });
    test('NG: roleが不正', () => {
      expect(() => denyIllegalRole('unknownRoleName')).toThrow(IllegalArgumentError);
    });
  });

  describe('constructor', () => {
    test('OK: Roleエンティティを生成できた', () => {
      expect(new Role(RoleTypes.Member)).toBeDefined();
    });
  });

  describe('getters', () => {
    const roleString = RoleTypes.Member;
    const roleEntity = new Role(roleString);

    test('OK: getRole', () => {
      expect(roleEntity.getRole()).toBe(roleString);
    });
    test('OK: toString', () => {
      expect(roleEntity.toString()).toBe(roleString);
    });
    test('OK: isEqual(string)', () => {
      expect(roleEntity.isEqual(roleString)).toBeTruthy();
    });
    test('OK: isEqual(Role)', () => {
      expect(roleEntity.isEqual(new Role(roleString))).toBeTruthy();
    });
    test('OK: isEqual(RoleTypes)', () => {
      expect(roleEntity.isEqual(RoleTypes.Member)).toBeTruthy();
    });
    test('NG: !== isEqual(string)', () => {
      expect(roleEntity.isEqual('unknownRoleName')).toBeFalsy();
    });
    test('NG: !== isEqual(Role)', () => {
      expect(roleEntity.isEqual(new Role(RoleTypes.Anonymous))).toBeFalsy();
    });
    test('NG: !== isEqual(RoleTypes)', () => {
      expect(roleEntity.isEqual(RoleTypes.Anonymous)).toBeFalsy();
    });
    test('NG: !== isEqual(unknown)', () => {
      expect(() => roleEntity.isEqual({} as any)).toThrow(IllegalArgumentError); // eslint-disable-line @typescript-eslint/no-explicit-any
    });
  });
});
