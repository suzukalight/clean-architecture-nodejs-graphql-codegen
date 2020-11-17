import { QueryResolvers } from 'schema/lib/app/types';

import { ApolloServerContext } from '../../../types';
import { todo } from './todo';
import { allTodosWithDeadlineApproaching } from './allTodosWithDeadlineApproaching';

export const Todo: QueryResolvers<ApolloServerContext> = {
  ...todo,
  ...allTodosWithDeadlineApproaching,
};
