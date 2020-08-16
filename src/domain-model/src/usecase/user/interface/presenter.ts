import { Maybe, User, CreateUserResponse, UpdateUserRolesResponse } from 'schema/types';

import { UserEntity } from '../../../entity/user/UserEntity';

export interface UserPresenter<Response> {
  output(userEntity: Maybe<UserEntity>): void;
  getResponse(): Maybe<Response>;
}

export type GetUserPresenter = UserPresenter<Maybe<User>>;

export type CreateUserPresenter = UserPresenter<CreateUserResponse>;
export type UpdateUserRolesPresenter = UserPresenter<UpdateUserRolesResponse>;
