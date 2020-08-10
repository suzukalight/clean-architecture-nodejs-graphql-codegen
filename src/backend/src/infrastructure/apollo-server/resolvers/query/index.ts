import { QueryResolvers } from 'schema/types';

import { Query as User } from './User';

export const Query: QueryResolvers = {
  ...User,
};
