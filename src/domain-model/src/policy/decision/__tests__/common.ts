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
    test('成功：actorが設定されている', () => {
      const actor = new UserEntity({ id: '1', roles: [RoleTypes.Member] });
      denyUnauthenticated(actor);
    });

    test('失敗：actorが設定されていない', () => {
      expect(() => denyUnauthenticated(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない（メッセージつき）', () => {
      expect(() => denyUnauthenticated(null, 'ログインしてください')).toThrow(
        /ログインしてください/,
      );
    });
  });

  describe('denyWhenActorHasOnlyAnonymousRole', () => {
    test('成功：Memberロールが設定されている', () => {
      const actor = new UserEntity({ id: '1', roles: [RoleTypes.Member] });
      denyWhenActorHasOnlyAnonymousRole(actor);
    });

    test('成功：Anonymous+Member', () => {
      const actor = new UserEntity({
        id: '1',
        roles: [RoleTypes.Anonymous, RoleTypes.Member],
      });
      denyWhenActorHasOnlyAnonymousRole(actor);
    });

    test('失敗：Anonymousロールしか持っていない', () => {
      const actor = new UserEntity({ id: '1', roles: [RoleTypes.Anonymous] });
      expect(() => denyWhenActorHasOnlyAnonymousRole(actor)).toThrow(UnauthorizedError);
    });

    test('失敗：actorが設定されていない', () => {
      expect(() => denyWhenActorHasOnlyAnonymousRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない（メッセージつき）', () => {
      expect(() => denyWhenActorHasOnlyAnonymousRole(null, 'メンバー権限をつけてください')).toThrow(
        /メンバー権限をつけてください/,
      );
    });
  });

  describe('allowOnlyWhenActorHasMemberRole', () => {
    test('成功：Memberロールが設定されている', () => {
      const actor = new UserEntity({ id: '1', roles: [RoleTypes.Member] });
      allowOnlyWhenActorHasMemberRole(actor);
    });

    test('成功：Anonymous+Member', () => {
      const actor = new UserEntity({
        id: '1',
        roles: [RoleTypes.Anonymous, RoleTypes.Member],
      });
      denyWhenActorHasOnlyAnonymousRole(actor);
    });

    test('失敗：Anonymousロールしか持っていない', () => {
      const actor = new UserEntity({ id: '1', roles: [RoleTypes.Anonymous] });
      expect(() => allowOnlyWhenActorHasMemberRole(actor)).toThrow(UnauthorizedError);
    });

    test('失敗：Adminロールしか持っていない', () => {
      const actor = new UserEntity({ id: '1', roles: [RoleTypes.Admin] });
      expect(() => allowOnlyWhenActorHasMemberRole(actor)).toThrow(UnauthorizedError);
    });

    test('失敗：Anonymous+Admin', () => {
      const actor = new UserEntity({
        id: '1',
        roles: [RoleTypes.Anonymous, RoleTypes.Admin],
      });
      expect(() => allowOnlyWhenActorHasMemberRole(actor)).toThrow(UnauthorizedError);
    });

    test('失敗：actorが設定されていない', () => {
      expect(() => allowOnlyWhenActorHasMemberRole(null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない（メッセージつき）', () => {
      expect(() => allowOnlyWhenActorHasMemberRole(null, 'メンバー権限をつけてください')).toThrow(
        /メンバー権限をつけてください/,
      );
    });
  });

  describe('allowOnlyWhenActorIsOwner', () => {
    test('成功：同じownerId', () => {
      const ownerId = new ID('1');
      const actor = new UserEntity({
        id: ownerId.getId(),
        roles: [RoleTypes.Member],
      });
      allowOnlyWhenActorIsOwner(ownerId, actor);
    });

    test('失敗：異なるownerId', () => {
      const ownerId = new ID('1');
      const actor = new UserEntity({ id: '2', roles: [RoleTypes.Member] });
      expect(() => allowOnlyWhenActorIsOwner(ownerId, actor)).toThrow(UnauthorizedError);
    });

    test('失敗：actorが設定されていない', () => {
      const ownerId = new ID('1');
      expect(() => allowOnlyWhenActorIsOwner(ownerId, null)).toThrow(AuthenticationFailedError);
    });

    test('失敗：actorが設定されていない（メッセージつき）', () => {
      const ownerId = new ID('1');
      expect(() => allowOnlyWhenActorIsOwner(ownerId, null, 'オーナーが違います')).toThrow(
        /オーナーが違います/,
      );
    });
  });
});
