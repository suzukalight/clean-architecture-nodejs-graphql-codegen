import { MutationResolvers } from 'schema/types';

import { ApolloServerContext } from '../../../types';
import { createUser } from './createUser';
import { updateUserRoles } from './updateUserRoles';

export const User: MutationResolvers<ApolloServerContext> = {
  ...createUser,
  ...updateUserRoles,
};
