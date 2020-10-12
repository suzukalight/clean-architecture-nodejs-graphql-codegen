import { AuthenticationFailedError } from 'common';

import { RoleTypes } from '../../../entity/common/Role';
import { UserEntity } from '../../../entity/user/UserEntity';
import { denyUnauthenticated, denyWhenActorHasOnlyAnonymousRole } from '../common';

describe('PolicyDecisionCommon', () => {
  describe('denyUnauthenticated', () => {
    test('actorが設定されていればOK', async () => {
      const actor = new UserEntity({ id: '1', email: 'aaa@bb.com', roles: [RoleTypes.Member] });
      denyUnauthenticated(actor);
    });

    test('actorが設定されていないため、失敗した', async () => {
      expect(() => denyUnauthenticated(null)).toThrow(AuthenticationFailedError);
    });

    test('actorが設定されていないため、失敗した。（メッセージつき）', async () => {
      expect(() => denyUnauthenticated(null, 'ログインしてください')).toThrow(
        /ログインしてください/,
      );
    });
  });
});
