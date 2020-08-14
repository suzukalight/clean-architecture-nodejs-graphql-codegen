import {
  Todo,
  Maybe,
  CreateTodoResponse,
  DoneTodoResponse,
  UndoneTodoResponse,
} from 'schema/types';
import { TodoEntity } from 'domain-model/src/todo/TodoEntity';

interface TodoPresenter<Response> {
  output(TodoEntity: Maybe<TodoEntity>): void;
  getResponse(): Maybe<Response>;
}

export type GetTodoPresenter = TodoPresenter<Todo>;
export type CreateTodoPresenter = TodoPresenter<CreateTodoResponse>;
export type DoneTodoPresenter = TodoPresenter<DoneTodoResponse>;
export type UndoneTodoPresenter = TodoPresenter<UndoneTodoResponse>;
