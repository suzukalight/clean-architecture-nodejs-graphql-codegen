import {
  Todo,
  Maybe,
  CreateTodoResponse,
  DoneTodoResponse,
  UndoneTodoResponse,
  DeleteTodoResponse,
} from 'schema/types';
import { TodoEntity } from 'domain-model/src/entity/todo/TodoEntity';

interface TodoPresenter<Response> {
  output(TodoEntity: Maybe<TodoEntity>): void;
  getResponse(): Response;
}

export type GetTodoPresenter = TodoPresenter<Maybe<Todo>>;
export type CreateTodoPresenter = TodoPresenter<CreateTodoResponse>;
export type DoneTodoPresenter = TodoPresenter<DoneTodoResponse>;
export type UndoneTodoPresenter = TodoPresenter<UndoneTodoResponse>;
export type DeleteTodoPresenter = TodoPresenter<DeleteTodoResponse>;
