import { TodoDto } from '../../../entity';

export type GetTodoOutputData = {
  todo: TodoDto | null;
};

export interface GetTodoPresenter {
  output(response: GetTodoOutputData): void;
}

export type CreateTodoOutputData = {
  todo: TodoDto | null;
};

export interface CreateTodoPresenter {
  output(response: CreateTodoOutputData): void;
}

export type DoneTodoOutputData = {
  todo: TodoDto | null;
};

export interface DoneTodoPresenter {
  output(response: DoneTodoOutputData): void;
}

export type UndoneTodoOutputData = {
  todo: TodoDto | null;
};

export interface UndoneTodoPresenter {
  output(response: UndoneTodoOutputData): void;
}

export type DeleteTodoOutputData = {
  todo: TodoDto | null;
};

export interface DeleteTodoPresenter {
  output(response: DeleteTodoOutputData): void;
}
