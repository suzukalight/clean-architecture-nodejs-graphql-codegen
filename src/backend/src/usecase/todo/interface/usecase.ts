import { CreateTodoRequest, DoneTodoRequest, UndoneTodoRequest } from 'schema/types';

interface TodoUseCase<Request> {
  handle(request: Request): void;
}

export type GetTodoUseCase = TodoUseCase<string>;
export type CreateTodoUseCase = TodoUseCase<CreateTodoRequest>;
export type DoneTodoUseCase = TodoUseCase<DoneTodoRequest>;
export type UndoneTodoUseCase = TodoUseCase<UndoneTodoRequest>;
