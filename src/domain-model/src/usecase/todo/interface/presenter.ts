import { TodoDto } from '../../../entity';
import { TodoEntity } from '../../../entity/todo/TodoEntity';

export type GetTodoOutputData = {
  todo: TodoDto;
};

export interface GetTodoPresenter {
  output(todo: TodoEntity | null): void;
  getResponse(): GetTodoOutputData | null;
}

export type CreateTodoOutputData = {
  todo: TodoDto;
};

export interface CreateTodoPresenter {
  output(todo: TodoEntity | null): void;
  getResponse(): CreateTodoOutputData | null;
}

export type DoneTodoOutputData = {
  todo: TodoDto;
};

export interface DoneTodoPresenter {
  output(todo: TodoEntity | null): void;
  getResponse(): DoneTodoOutputData | null;
}

export type UndoneTodoOutputData = {
  todo: TodoDto;
};

export interface UndoneTodoPresenter {
  output(todo: TodoEntity | null): void;
  getResponse(): UndoneTodoOutputData | null;
}

export type DeleteTodoOutputData = {
  todo: TodoDto;
};

export interface DeleteTodoPresenter {
  output(todo: TodoEntity | null): void;
  getResponse(): DeleteTodoOutputData | null;
}
