import {
  GetUserPresenter,
  CreateUserPresenter,
  UpdateUserRolesPresenter,
  UpdateUserRolesOutputData,
  GetUserOutputData,
  CreateUserOutputData,
} from '../interface/presenter';
import { UserEntity } from '../../../entity/user/UserEntity';

export class MockGetUserPresenter implements GetUserPresenter {
  private response: GetUserOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(userEntity: UserEntity | null) {
    this.response = userEntity ? { user: userEntity.toDto() } : null;
  }
}

export class MockCreateUserPresenter implements CreateUserPresenter {
  private response: CreateUserOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(userEntity: UserEntity | null) {
    this.response = userEntity ? { user: userEntity.toDto() } : null;
  }
}

export class MockUpdateUserRolesPresenter implements UpdateUserRolesPresenter {
  private response: UpdateUserRolesOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(userEntity: UserEntity | null) {
    this.response = userEntity ? { user: userEntity.toDto() } : null;
  }
}
