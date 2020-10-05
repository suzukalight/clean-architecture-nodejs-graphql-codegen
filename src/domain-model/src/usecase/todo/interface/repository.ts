import { TodoEntity } from '../../../entity/todo/TodoEntity';
import { CreateTodoInputData } from './usecase';

export interface TodoRepository {
  getById(id: string): Promise<TodoEntity | null>;

  create(input: CreateTodoInputData): Promise<TodoEntity>;
  update(todo: TodoEntity): Promise<TodoEntity>;
  delete(id: string): Promise<TodoEntity>;
}
