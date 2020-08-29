import { MutationResolvers } from 'schema';

import { User } from './User';
import { Todo } from './Todo';
import { Auth } from './Auth';

export const Mutation: MutationResolvers = {
  ...User,
  ...Todo,
  ...Auth,
};
