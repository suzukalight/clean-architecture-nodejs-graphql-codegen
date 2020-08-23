import { UnauthorizedError } from 'common/error/Unauthorized';
import { AuthenticationFailedError } from 'common/error/AuthenticationFailed';
import { Maybe, Role } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';

export const denyUnauthorized = (actor?: Maybe<UserEntity>) => {
  if (!actor) throw new UnauthorizedError();
};

export const denyWhenActorHasOnlyAnonymousRole = (actor?: Maybe<UserEntity>) => {
  denyUnauthorized(actor);

  // anonumous ではないロールを1つも持っていない
  if (!actor?.getRoles().some((role) => !role.isEqual(Role.Anonymous))) {
    throw new AuthenticationFailedError();
  }
};

export const allowWhenActorHasMemberRole = (actor?: Maybe<UserEntity>) => {
  denyUnauthorized(actor);

  if (!actor?.getRoles().some((role) => role.isEqual(Role.Member))) {
    throw new AuthenticationFailedError();
  }
};
