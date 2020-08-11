import { CreateUserResponse, User, Maybe } from 'schema/types';

export interface GetUserPresenter {
  output(response: Maybe<User>): void;
}

export interface CreateUserPresenter {
  output(response: CreateUserResponse): void;
}
