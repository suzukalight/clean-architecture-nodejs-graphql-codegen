import { CreateUserResponse, User, Maybe } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';

interface UserPresenter<Response> {
  output(userEntity: Maybe<UserEntity>): void;
  getResponse(): Maybe<Response>;
}

export type GetUserPresenter = UserPresenter<User>;
export type CreateUserPresenter = UserPresenter<CreateUserResponse>;
