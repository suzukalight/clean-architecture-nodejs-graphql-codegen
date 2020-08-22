import { QueryResolvers } from 'schema/types';

import { User } from './User';
import { Todo } from './Todo';

export const Query: QueryResolvers = {
  ...User,
  ...Todo,
};
