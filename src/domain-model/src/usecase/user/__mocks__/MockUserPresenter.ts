import { Maybe, User, CreateUserResponse, UpdateUserRolesResponse } from 'schema';

import {
  GetUserPresenter,
  CreateUserPresenter,
  UpdateUserRolesPresenter,
} from '../interface/presenter';
import { UserEntity } from '../../../entity/user/UserEntity';

export class MockGetUserPresenter implements GetUserPresenter {
  private response: Maybe<User> = null;

  public getResponse(): Maybe<User> {
    return this.response;
  }

  public async output(userEntity: Maybe<UserEntity>) {
    this.response = userEntity ? userEntity.toJSON() : null;
  }
}

export class MockCreateUserPresenter implements CreateUserPresenter {
  private response: Maybe<CreateUserResponse> = null;

  public getResponse(): Maybe<CreateUserResponse> {
    return this.response;
  }

  public async output(userEntity: Maybe<UserEntity>) {
    this.response = { user: userEntity ? userEntity.toJSON() : null };
  }
}

export class MockUpdateUserRolesPresenter implements UpdateUserRolesPresenter {
  private response: Maybe<UpdateUserRolesResponse> = null;

  public getResponse(): Maybe<UpdateUserRolesResponse> {
    return this.response;
  }

  public async output(user: UserEntity) {
    this.response = { user: user.toJSON() };
  }
}
