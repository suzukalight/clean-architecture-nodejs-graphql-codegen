import { PropertyRequiredError, ConflictError, ValidationError, Role, RoleTypes, ID } from 'common';

import { UserDto } from '../UserDto';
import { UserEntity } from '../UserEntity';

describe('UserEntity', () => {
  describe('constructor', () => {
    test('OK: エンティティを生成できた', () => {
      const user = { id: '1', email: 'aaa@bbb.com', roles: [RoleTypes.Member] };
      const user1 = new UserEntity(user);
      expect(user1.getId().isEqual(user.id)).toBeTruthy();
    });

    test('NG: idが不足しているため、失敗した', () => {
      const user = { email: 'aaa@bbb.com', roles: [RoleTypes.Member] };
      expect(() => new UserEntity((user as unknown) as UserDto)).toThrow(PropertyRequiredError);
    });

    test('NG: rolesが不足しているため、失敗した', () => {
      const user = { id: '1', email: 'aaa@bbb.com' };
      expect(() => new UserEntity((user as unknown) as UserDto)).toThrow(PropertyRequiredError);
    });
  });

  describe('getter/setter', () => {
    const userDto = { id: '1', email: 'aaa@bbb.com', roles: [RoleTypes.Member] };

    test('OK: Id', () => {
      const user = new UserEntity(userDto);
      expect(user.getId().isEqual(userDto.id)).toBeTruthy();

      const newId = new ID('999');
      user.setId(newId);
      expect(user.getId().isEqual(newId)).toBeTruthy();
    });

    test('OK: Roles', () => {
      const user = new UserEntity(userDto);
      expect(user.getRoles()?.[0].isEqual(RoleTypes.Member)).toBeTruthy();

      user.addRole(new Role(RoleTypes.Admin));
      expect(user.getRoles()?.length).toBe(2);
      expect(user.getRoles()?.some((role) => role.isEqual(RoleTypes.Admin))).toBeTruthy();
      expect(user.getRoles()?.some((role) => role.isEqual(RoleTypes.Member))).toBeTruthy();

      user.removeRole(new Role(RoleTypes.Member));
      expect(user.getRoles()?.length).toBe(1);
      expect(user.getRoles()?.some((role) => role.isEqual(RoleTypes.Admin))).toBeTruthy();
      expect(user.getRoles()?.some((role) => role.isEqual(RoleTypes.Member))).toBeFalsy();
    });

    test('NG: すでに持っているロールを追加することはできない', () => {
      const user = new UserEntity(userDto);
      expect(() => user.addRole(new Role(RoleTypes.Member))).toThrow(ConflictError);
    });

    test('NG: 持っていないロールを削除することはできない', () => {
      const user = new UserEntity(userDto);
      expect(() => user.removeRole(new Role(RoleTypes.Admin))).toThrow(ConflictError);
    });

    test('NG: すべてのロールを削除することはできない', () => {
      const user = new UserEntity(userDto);
      expect(() => user.removeRole(new Role(RoleTypes.Member))).toThrow(ValidationError);
    });
  });
});
