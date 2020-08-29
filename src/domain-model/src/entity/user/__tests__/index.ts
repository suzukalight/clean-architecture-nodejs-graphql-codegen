import { User } from 'schema';
import { PropertyRequiredError, IllegalArgumentError } from 'common';

import { UserEntity } from '../UserEntity';
import { RoleTypes } from '../../common/Role';

describe('UserEntity', () => {
  test('エンティティを生成できた', () => {
    const user = { id: '1', email: 'aaa@bbb.com', roles: [RoleTypes.Member] };
    const user1 = new UserEntity(user);
    expect(user1.getId().toString()).toBe(user.id);
    expect(user1.getEmail().toString()).toBe(user.email);
  });

  test('idが不足しているため、失敗した', () => {
    const user = { email: 'aaa@bbb.com', roles: [RoleTypes.Member] };
    expect(() => new UserEntity((user as unknown) as User)).toThrow(PropertyRequiredError);
  });

  test('emailが不足しているため、失敗した', () => {
    const user = { id: '1', roles: [RoleTypes.Member] };
    expect(() => new UserEntity((user as unknown) as User)).toThrow(PropertyRequiredError);
  });

  test('rolesが不足しているため、失敗した', () => {
    const user = { id: '1', email: 'aaa@bbb.com' };
    expect(() => new UserEntity((user as unknown) as User)).toThrow(PropertyRequiredError);
  });

  test('不正なメールアドレスを指定したため、失敗した', () => {
    const user = { id: '1', email: 'aaaaaaaa', roles: [RoleTypes.Member] };
    expect(() => new UserEntity((user as unknown) as User)).toThrow(IllegalArgumentError);
  });
});
