import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';

import { TodoDto } from '../../../entity/todo';
import { denyIfNotSet } from '../../../policy/decision/common';
import {
  TodoQueryService,
  AllTodosQuery,
  AllTodosWithDeadlineApproachingQuery,
} from '../interface/queryService';

type InMemoryStore = {
  entities: Map<string, TodoDto>;
};
export const createInMemoryStore = (todos: TodoDto[]): InMemoryStore => ({
  entities: new Map<string, TodoDto>(todos.map((todo) => [todo.id, todo])),
});

export class MockTodoQueryService implements TodoQueryService {
  private store: InMemoryStore;

  constructor(todos: TodoDto[]) {
    this.store = createInMemoryStore(todos);
  }

  public async all(_query: AllTodosQuery) {
    // FIXME
    return { todos: [...this.store.entities.values()] };
  }

  public async allTodosWithDeadlineApproaching(query: AllTodosWithDeadlineApproachingQuery) {
    denyIfNotSet(query, ['dueDate', 'daysBeforeWarning']);
    const todos = [...this.store.entities.values()];
    const deadlineDate = addDays(query.dueDate, query.daysBeforeWarning + 1);

    // TODO: actorによる制限
    const todosWithDeadlineApproaching = todos.filter(
      (todo) => todo.dueDate && isBefore(todo.dueDate, deadlineDate),
    );

    return { todos: todosWithDeadlineApproaching };
  }
}
