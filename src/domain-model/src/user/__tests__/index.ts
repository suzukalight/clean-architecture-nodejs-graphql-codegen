import { User } from '../../types';
import { UserEntity } from '../UserEntity';
import { PropertyRequiredError } from 'common/error/PropertyRequired';
import { IllegalArgumentError } from 'common/error/IllegalArgument';

describe('UserEntity', () => {
  it('エンティティを生成できた', () => {
    const user = { id: '1', email: 'aaa@bbb.com' };
    const user1 = new UserEntity(user);
    expect(user1.getID().toString()).toBe(user.id);
    expect(user1.getEmail().toString()).toBe(user.email);
  });

  it('idが不足しているため、失敗した', () => {
    expect(() => {
      const user = { email: 'aaa@bbb.com' };
      new UserEntity((user as unknown) as User);
    }).toThrow(PropertyRequiredError);
  });

  it('emailが不足しているため、失敗した', () => {
    expect(() => {
      const user = { id: '1' };
      new UserEntity((user as unknown) as User);
    }).toThrow(PropertyRequiredError);
  });

  it('不正なメールアドレスを指定したため、失敗した', () => {
    expect(() => {
      const user = { id: '1', email: 'aaaaaaaa' };
      new UserEntity(user);
    }).toThrow(IllegalArgumentError);
  });
});
