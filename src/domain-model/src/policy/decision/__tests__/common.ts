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

  describe('denyWhenActorHasOnlyAnonymousRole', () => {
    test('actorが設定されていればOK', async () => {
      const actor = new UserEntity({ id: '1', email: 'aaa@bb.com', roles: [RoleTypes.Member] });
      denyWhenActorHasOnlyAnonymousRole(actor);
    });

    test('Anonymous+Memberは成功', async () => {
      const actor = new UserEntity({
        id: '1',
        email: 'aaa@bb.com',
        roles: [RoleTypes.Anonymous, RoleTypes.Member],
      });
      expect(() => denyWhenActorHasOnlyAnonymousRole(null)).toThrow(AuthenticationFailedError);
    });

    test('Anonymousロールしか持っていないため、失敗した', async () => {
      const actor = new UserEntity({ id: '1', email: 'aaa@bb.com', roles: [RoleTypes.Anonymous] });
      expect(() => denyWhenActorHasOnlyAnonymousRole(null)).toThrow(AuthenticationFailedError);
    });

    test('actorが設定されていないため、失敗した', async () => {
      expect(() => denyWhenActorHasOnlyAnonymousRole(null)).toThrow(AuthenticationFailedError);
    });

    test('actorが設定されていないため、失敗した。（メッセージつき）', async () => {
      expect(() => denyWhenActorHasOnlyAnonymousRole(null, 'メンバー権限をつけてください')).toThrow(
        /メンバー権限をつけてください/,
      );
    });
  });
});
