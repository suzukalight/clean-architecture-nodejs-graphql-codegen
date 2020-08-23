import {
  CreateTodoRequest,
  DoneTodoRequest,
  UndoneTodoRequest,
  DeleteTodoRequest,
  Maybe,
} from 'schema/types';
import { UserEntity } from '../../../entity/user/UserEntity';

interface TodoUseCase<Request> {
  handle(request: Request, actor: Maybe<UserEntity>): void;
}

export type GetTodoUseCase = TodoUseCase<string>;
export type CreateTodoUseCase = TodoUseCase<CreateTodoRequest>;
export type DoneTodoUseCase = TodoUseCase<DoneTodoRequest>;
export type UndoneTodoUseCase = TodoUseCase<UndoneTodoRequest>;
export type DeleteTodoUseCase = TodoUseCase<DeleteTodoRequest>;
