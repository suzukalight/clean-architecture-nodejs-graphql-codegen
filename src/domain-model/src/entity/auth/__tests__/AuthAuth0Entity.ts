import { PropertyRequiredError } from 'common';

import { AuthAuth0Dto } from '../AuthAuth0Dto';
import { AuthAuth0Entity } from '../AuthAuth0Entity';

describe('AuthAuth0Entity', () => {
  let authDto: AuthAuth0Dto;

  beforeAll(async () => {
    authDto = { auth0UserId: 'auth0|1', userId: '1' };
  });

  test('OK: エンティティを生成できた', () => {
    const auth1 = new AuthAuth0Entity(authDto);
    expect(auth1.getAuth0UserId().isEqual(authDto.auth0UserId)).toBeTruthy();
  });

  test('NG: auth0UserIdが不足しているため、失敗した', () => {
    const invalidAuthAuth0Dto = { userId: '1' } as AuthAuth0Dto;
    expect(() => new AuthAuth0Entity(invalidAuthAuth0Dto)).toThrow(PropertyRequiredError);
  });

  test('NG: userIdが不足しているため、失敗した', () => {
    const invalidAuthAuth0Dto = { auth0UserId: 'auth0|1' } as AuthAuth0Dto;
    expect(() => new AuthAuth0Entity(invalidAuthAuth0Dto)).toThrow(PropertyRequiredError);
  });
});
