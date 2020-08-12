import { CreateTodoRequest } from 'schema/types';

interface TodoUseCase<Request> {
  handle(request: Request): void;
}

export type GetTodoUseCase = TodoUseCase<string>;
export type CreateTodoUseCase = TodoUseCase<CreateTodoRequest>;
