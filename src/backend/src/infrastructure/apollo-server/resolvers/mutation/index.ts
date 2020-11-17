import { MutationResolvers } from 'schema/lib/app/types';

import { User } from './User';
import { Todo } from './Todo';

export const Mutation: MutationResolvers = {
  ...User,
  ...Todo,
};
