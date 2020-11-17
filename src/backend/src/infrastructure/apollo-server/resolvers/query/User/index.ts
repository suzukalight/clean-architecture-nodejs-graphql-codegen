import { QueryResolvers } from 'schema/lib/app/types';

import { ApolloServerContext } from '../../../types';
import { user } from './user';

export const User: QueryResolvers<ApolloServerContext> = {
  ...user,
};
