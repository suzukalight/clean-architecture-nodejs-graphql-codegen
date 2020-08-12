import { MutationResolvers } from 'schema/types';

import { Mutation as User } from './User';
import { Mutation as Todo } from './Todo';

export const Mutation: MutationResolvers = {
  ...User,
  ...Todo,
};
