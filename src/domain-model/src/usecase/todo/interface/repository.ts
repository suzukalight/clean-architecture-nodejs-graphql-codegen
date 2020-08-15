import { Maybe, CreateTodoRequest, DeleteTodoRequest } from 'schema/types';
import { TodoEntity } from 'domain-model/src/entity/todo/TodoEntity';

export interface TodoRepository {
  getById(id: string): Promise<Maybe<TodoEntity>>;

  create(input: CreateTodoRequest): Promise<TodoEntity>;
  update(input: TodoEntity): Promise<TodoEntity>;
  delete(input: DeleteTodoRequest): Promise<TodoEntity>;
}
