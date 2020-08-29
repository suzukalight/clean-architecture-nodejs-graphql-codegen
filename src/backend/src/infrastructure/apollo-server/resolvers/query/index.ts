import { QueryResolvers } from 'schema';

import { User } from './User';
import { Todo } from './Todo';

export const Query: QueryResolvers = {
  ...User,
  ...Todo,
};
