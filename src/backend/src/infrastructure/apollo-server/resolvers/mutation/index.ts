import { MutationResolvers } from 'schema';

import { User } from './User';
import { Todo } from './Todo';

export const Mutation: MutationResolvers = {
  ...User,
  ...Todo,
};
