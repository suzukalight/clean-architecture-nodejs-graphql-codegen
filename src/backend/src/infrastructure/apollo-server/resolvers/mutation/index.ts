import { MutationResolvers } from 'schema/types';

import { Mutation as User } from './User';
import { Mutation as Todo } from './Todo';
import { Mutation as Auth } from './Auth';

export const Mutation: MutationResolvers = {
  ...User,
  ...Todo,
  ...Auth,
};
