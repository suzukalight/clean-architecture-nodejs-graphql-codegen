import { MutationResolvers } from 'schema/types';

import { Mutation as User } from './User';

export const Mutation: MutationResolvers = {
  ...User,
};
