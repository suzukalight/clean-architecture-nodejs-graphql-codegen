import { Maybe, Role } from 'schema/types';
import { AuthenticationFailedError } from 'common/error/AuthenticationFailed';
import { UnauthorizedError } from 'common/error/Unauthorized';

import { ID } from '../../entity/common/ID';
import { UserEntity } from '../../entity/user/UserEntity';

export const denyUnauthenticated = (actor: Maybe<UserEntity>, message?: string) => {
  if (!actor) throw new AuthenticationFailedError(message);
};

export const denyWhenActorHasOnlyAnonymousRole = (actor: Maybe<UserEntity>, message?: string) => {
  denyUnauthenticated(actor);

  // anonumous ではないロールを1つも持っていない
  if (!actor?.getRoles().some((role) => !role.isEqual(Role.Anonymous))) {
    throw new UnauthorizedError(message);
  }
};

export const allowOnlyWhenActorHasMemberRole = (actor: Maybe<UserEntity>, message?: string) => {
  denyUnauthenticated(actor);

  if (!actor?.getRoles().some((role) => role.isEqual(Role.Member))) {
    throw new UnauthorizedError(message);
  }
};

export const allowOnlyWhenActorIsOwner = (
  ownerId: ID,
  actor: Maybe<UserEntity>,
  message?: string,
) => {
  denyUnauthenticated(actor);

  if (!actor?.getId().isEqual(ownerId))
    throw new UnauthorizedError(message ?? '作成した本人しか操作することはできません');
};
