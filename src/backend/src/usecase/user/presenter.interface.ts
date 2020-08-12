import { CreateUserResponse, User, Maybe } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

export interface GetUserPresenter {
  output(userEntity: Maybe<UserEntity>): void;
  getResponse(): Maybe<User>;
}

export interface CreateUserPresenter {
  output(userEntity: Maybe<UserEntity>): void;
  getResponse(): Maybe<CreateUserResponse>;
}
