import { QueryResolvers } from 'schema';

import { ApolloServerContext } from '../../../types';
import { todo } from './todo';
import { allTodosWithDeadlineApproaching } from './allTodosWithDeadlineApproaching';

export const Todo: QueryResolvers<ApolloServerContext> = {
  ...todo,
  ...allTodosWithDeadlineApproaching,
};
