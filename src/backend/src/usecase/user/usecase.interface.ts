import { CreateUserRequest } from 'schema/types';

export interface CreateUserUseCase {
  handle(request: CreateUserRequest): void;
}
