import { QueryResolvers } from 'schema/lib/app/types';

import { User } from './User';
import { Todo } from './Todo';

export const Query: QueryResolvers = {
  ...User,
  ...Todo,
};
