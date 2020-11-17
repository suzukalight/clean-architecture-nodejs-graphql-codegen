import { Todo } from 'schema/lib/app/types';
import { TodoDto } from 'domain-model';

export const toGqlTodo = (todo: TodoDto | null | undefined): Todo | null => {
  if (!todo) return null;
  return {
    ...todo,
  };
};
