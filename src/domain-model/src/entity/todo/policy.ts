import { Maybe } from 'schema/types';
import { AuthenticationFailedError } from 'common/error/AuthenticationFailed';
import { UnauthorizedError } from 'common/error/Unauthorized';

import { ID } from '../common/ID';
import { UserEntity } from '../user/UserEntity';

export const denyUnauthenticated = (actor: Maybe<UserEntity>) => {
  if (!actor) throw new AuthenticationFailedError();
};

export const denyWhenActorIsNotOwner = (ownerId: ID, actor: Maybe<UserEntity>) => {
  denyUnauthenticated(actor);

  if (!actor?.getId().isEqual(ownerId))
    throw new UnauthorizedError('作成した本人しかdoneにすることはできません');
};
