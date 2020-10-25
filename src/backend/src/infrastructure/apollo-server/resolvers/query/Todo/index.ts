import { QueryResolvers } from 'schema';

import { ApolloServerContext } from '../../../types';
import { todo } from './todo';
import { allDeadlineNearingTodos } from './allDeadlineNearingTodos';

export const Todo: QueryResolvers<ApolloServerContext> = {
  ...todo,
  ...allDeadlineNearingTodos,
};
