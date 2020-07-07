import { User } from '../../../types';
import { isValid } from '../validator';

describe('UserEntity::validator', () => {
  it('test', () => {
    const user1 = { id: '1' };
    expect(isValid(user1)).toBeTruthy();

    const user2 = { aaa: 'aaa' } as unknown as User;
    expect(isValid(user2)).toBeFalsy();
  });
});
