import { QueryResolvers } from 'schema/types';

import { ApolloServerContext } from '../../../types';
import { todo } from './todo';

export const Todo: QueryResolvers<ApolloServerContext> = {
  ...todo,
};
