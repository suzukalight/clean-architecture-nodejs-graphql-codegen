import { AuthenticationFailedError, UnauthorizedError } from 'common';

import { RoleTypes } from '../../../entity/common/Role';
import { ID } from '../../../entity/common/ID';
import { UserEntity } from '../../../entity/user/UserEntity';
import {
  denyUnauthenticated,
  denyWhenActorHasOnlyAnonymousRole,
  allowOnlyWhenActorHasMemberRole,
  allowOnlyWhenActorIsOwner,
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

  describe('allowOnlyWhenActorIsOwner', () => {
    test('成功：同じownerId', async () => {
      const ownerId = new ID('1');
      const actor = new UserEntity({
        id: ownerId.getId(),
        email: 'aaa@bb.com',
        roles: [RoleTypes.Member],
      });
      allowOnlyWhenActorIsOwner(ownerId, actor);
    });

    test('失敗：異なるownerId', async () => {
      const ownerId = new ID('1');
      const actor = new UserEntity({ id: '2', email: 'aaa@bb.com', roles: [RoleTypes.Member] });
      expect(() => allowOnlyWhenActorIsOwner(ownerId, actor)).toThrow(UnauthorizedError);
    });

    test('失敗：actorが設定されていない', async () => {
      const ownerId = new ID('1');
      expect(() => allowOnlyWhenActorIsOwner(ownerId, null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない（メッセージつき）', async () => {
      const ownerId = new ID('1');
      expect(() => allowOnlyWhenActorIsOwner(ownerId, null, 'オーナーが違います')).toThrow(
        /オーナーが違います/,
      );
    });
  });
});
