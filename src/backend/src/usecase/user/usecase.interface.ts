import { CreateUserRequest } from 'schema/types';

export interface GetUserUseCase {
  handle(id: string): void;
}

export interface CreateUserUseCase {
  handle(request: CreateUserRequest): void;
}
