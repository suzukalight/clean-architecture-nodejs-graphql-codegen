import { QueryResolvers } from 'schema';

import { ApolloServerContext } from '../../../types';
import { todo } from './todo';

export const Todo: QueryResolvers<ApolloServerContext> = {
  ...todo,
};
