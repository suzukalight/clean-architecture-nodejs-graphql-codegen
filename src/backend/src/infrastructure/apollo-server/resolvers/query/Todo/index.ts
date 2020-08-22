import { QueryResolvers } from 'schema/types';

import { ApolloServerContext } from '../../type';
import { todo } from './todo';

export const Todo: QueryResolvers<ApolloServerContext> = {
  ...todo,
};
