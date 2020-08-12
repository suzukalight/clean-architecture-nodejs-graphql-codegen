import { QueryResolvers } from 'schema/types';

import { Query as User } from './User';
import { Query as Todo } from './Todo';

export const Query: QueryResolvers = {
  ...User,
  ...Todo,
};
