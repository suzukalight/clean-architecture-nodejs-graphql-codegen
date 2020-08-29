import { QueryResolvers } from 'schema';

import { ApolloServerContext } from '../../../types';
import { user } from './user';

export const User: QueryResolvers<ApolloServerContext> = {
  ...user,
};
