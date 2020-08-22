import { QueryResolvers } from 'schema/types';

import { ApolloServerContext } from '../../type';
import { user } from './user';

export const User: QueryResolvers<ApolloServerContext> = {
  ...user,
};
