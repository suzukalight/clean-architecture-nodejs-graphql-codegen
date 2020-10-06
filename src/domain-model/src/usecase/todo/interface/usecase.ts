import { UserEntity } from '../../../entity/user/UserEntity';

export type GetTodoInputData = {
  id: string;
};

export interface GetTodoUseCase {
  handle(request: GetTodoInputData, actor: UserEntity): void;
}

export type CreateTodoInputData = {
  ownerId: string;
  title: string;
  dueDate?: Date | null;
};

export interface CreateTodoUseCase {
  handle(request: CreateTodoInputData, actor: UserEntity): void;
}

export type DoneTodoInputData = {
  id: string;
};

export interface DoneTodoUseCase {
  handle(request: DoneTodoInputData, actor: UserEntity): void;
}

export type UndoneTodoInputData = {
  id: string;
};

export interface UndoneTodoUseCase {
  handle(request: UndoneTodoInputData, actor: UserEntity): void;
}

export type DeleteTodoInputData = {
  id: string;
};

export interface DeleteTodoUseCase {
  handle(request: DeleteTodoInputData, actor: UserEntity): void;
}
