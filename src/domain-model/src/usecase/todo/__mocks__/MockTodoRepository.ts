import { CreateTodoRequest, TodoStatus, DeleteTodoRequest } from 'schema/types';
import { NotFoundError } from 'common/error/NotFound';

import { TodoEntity } from '../../../entity/todo/TodoEntity';
import { TodoRepository } from '../interface/repository';

type InMemoryStore = {
  idCounter: number;
  entities: Map<string, TodoEntity>;
};

export const createInMemoryStore = (
  idCounter = 0,
  entities: Map<string, TodoEntity> = new Map<string, TodoEntity>(),
): InMemoryStore => {
  return {
    idCounter,
    entities,
  };
};

export class MockTodoRepository implements TodoRepository {
  private store: InMemoryStore;

  constructor() {
    this.store = createInMemoryStore();
  }

  public async getById(id: string) {
    return this.store.entities.get(id) ?? null;
  }

  public async create(todo: CreateTodoRequest) {
    const id = `${++this.store.idCounter}`;
    const newEntity = new TodoEntity({
      id,
      ...todo,
      status: TodoStatus.Undone,
    });

    this.store.entities.set(id, newEntity);
    return newEntity;
  }

  public async update(todo: TodoEntity) {
    const id = todo.getId().toString();
    const targetEntity = this.store.entities.get(id);
    if (!targetEntity) throw new NotFoundError();

    this.store.entities.set(id, todo);

    return todo;
  }

  public async delete(request: DeleteTodoRequest) {
    const { id } = request;
    const targetEntity = this.store.entities.get(id);
    if (!targetEntity) throw new NotFoundError();

    this.store.entities.delete(id);

    return targetEntity;
  }
}
