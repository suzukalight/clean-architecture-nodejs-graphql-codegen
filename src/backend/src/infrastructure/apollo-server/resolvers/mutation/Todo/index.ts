import { MutationResolvers } from 'schema/lib/app/types';

import { ApolloServerContext } from '../../../types';
import { createTodo } from './createTodo';
import { deleteTodo } from './deleteTodo';
import { doneTodo } from './doneTodo';
import { undoneTodo } from './undoneTodo';

export const Todo: MutationResolvers<ApolloServerContext> = {
  ...createTodo,
  ...deleteTodo,
  ...doneTodo,
  ...undoneTodo,
};
