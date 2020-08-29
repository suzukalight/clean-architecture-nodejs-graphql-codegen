import { Maybe, CreateTodoRequest, DeleteTodoRequest } from 'schema';

import { TodoEntity } from '../../../entity/todo/TodoEntity';

export interface TodoRepository {
  getById(id: string): Promise<Maybe<TodoEntity>>;

  create(input: CreateTodoRequest): Promise<TodoEntity>;
  update(todo: TodoEntity): Promise<TodoEntity>;
  delete(input: DeleteTodoRequest): Promise<TodoEntity>;
}
