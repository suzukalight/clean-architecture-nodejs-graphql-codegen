import { TodoDto } from '../../../entity/todo';
import {
  TodoQueryService,
  AllTodosQuery,
  DeadlineNearingTodosQuery,
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

  public async allDeadlineNearingTodos(_query: DeadlineNearingTodosQuery) {
    // FIXME: dueDateに基づいて払い出す
    return { todos: [...this.store.entities.values()] };
  }
}
