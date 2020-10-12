import { AuthenticationFailedError } from 'common';

import { RoleTypes } from '../../../entity/common/Role';
import { UserEntity } from '../../../entity/user/UserEntity';
import {
  denyUnauthenticated,
  denyWhenActorHasOnlyAnonymousRole,
  allowOnlyWhenActorHasMemberRole,
} from '../common';

describe('PolicyDecisionCommon', () => {
  describe('denyUnauthenticated', () => {
    test('成功：actorが設定されている', async () => {
      const actor = new UserEntity({ id: '1', email: 'aaa@bb.com', roles: [RoleTypes.Member] });
      denyUnauthenticated(actor);
    });

    test('失敗：actorが設定されていない', async () => {
      expect(() => denyUnauthenticated(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない（メッセージつき）', async () => {
      expect(() => denyUnauthenticated(null, 'ログインしてください')).toThrow(
        /ログインしてください/,
      );
    });
  });

  describe('denyWhenActorHasOnlyAnonymousRole', () => {
    test('成功：Memberロールが設定されている', async () => {
      const actor = new UserEntity({ id: '1', email: 'aaa@bb.com', roles: [RoleTypes.Member] });
      denyWhenActorHasOnlyAnonymousRole(actor);
    });

    test('成功：Anonymous+Member', async () => {
      const actor = new UserEntity({
        id: '1',
        email: 'aaa@bb.com',
        roles: [RoleTypes.Anonymous, RoleTypes.Member],
      });
      expect(() => denyWhenActorHasOnlyAnonymousRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：Anonymousロールしか持っていない', async () => {
      const actor = new UserEntity({ id: '1', email: 'aaa@bb.com', roles: [RoleTypes.Anonymous] });
      expect(() => denyWhenActorHasOnlyAnonymousRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない', async () => {
      expect(() => denyWhenActorHasOnlyAnonymousRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない（メッセージつき）', async () => {
      expect(() => denyWhenActorHasOnlyAnonymousRole(null, 'メンバー権限をつけてください')).toThrow(
        /メンバー権限をつけてください/,
      );
    });
  });

  describe('allowOnlyWhenActorHasMemberRole', () => {
    test('成功：Memberロールが設定されている', async () => {
      const actor = new UserEntity({ id: '1', email: 'aaa@bb.com', roles: [RoleTypes.Member] });
      allowOnlyWhenActorHasMemberRole(actor);
    });

    test('成功：Anonymous+Member', async () => {
      const actor = new UserEntity({
        id: '1',
        email: 'aaa@bb.com',
        roles: [RoleTypes.Anonymous, RoleTypes.Member],
      });
      expect(() => allowOnlyWhenActorHasMemberRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：Anonymousロールしか持っていない', async () => {
      const actor = new UserEntity({ id: '1', email: 'aaa@bb.com', roles: [RoleTypes.Anonymous] });
      expect(() => allowOnlyWhenActorHasMemberRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：Adminロールしか持っていない', async () => {
      const actor = new UserEntity({ id: '1', email: 'aaa@bb.com', roles: [RoleTypes.Admin] });
      expect(() => allowOnlyWhenActorHasMemberRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：Anonymous+Admin', async () => {
      const actor = new UserEntity({
        id: '1',
        email: 'aaa@bb.com',
        roles: [RoleTypes.Anonymous, RoleTypes.Admin],
      });
      expect(() => allowOnlyWhenActorHasMemberRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない', async () => {
      expect(() => allowOnlyWhenActorHasMemberRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない（メッセージつき）', async () => {
      expect(() => allowOnlyWhenActorHasMemberRole(null, 'メンバー権限をつけてください')).toThrow(
        /メンバー権限をつけてください/,
      );
    });
  });
});
