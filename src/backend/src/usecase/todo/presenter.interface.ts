import { CreateTodoResponse, Todo, Maybe } from 'schema/types';
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';

interface TodoPresenter<Response> {
  output(TodoEntity: Maybe<TodoEntity>): void;
  getResponse(): Maybe<Response>;
}

export type GetTodoPresenter = TodoPresenter<Todo>;
export type CreateTodoPresenter = TodoPresenter<CreateTodoResponse>;
