import { CreateUserResponse } from 'schema/types';

export interface CreateUserPresenter {
  output(response: CreateUserResponse): void;
}
