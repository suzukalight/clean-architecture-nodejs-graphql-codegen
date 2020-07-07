import { User } from '../../../types';
import { UserEntity } from '..';

describe('UserEntity', () => {
  it('引数ありで生成', () => {
    const user1 = new UserEntity({ id: '1' });
    expect(user1.id).toBe('1');
  });

  it('引数が不正な場合、throw Error', () => {
    try {
      const user2 = new UserEntity(({ aaa: 'aaa' } as unknown) as User);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
