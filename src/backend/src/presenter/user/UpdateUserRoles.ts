import {
  UserEntity,
  UpdateUserRolesPresenter as UpdateUserRolesPresenterIF,
  UpdateUserRolesOutputData,
} from 'domain-model';

export class UpdateUserRolesPresenter implements UpdateUserRolesPresenterIF {
  private response: UpdateUserRolesOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(userEntity: UserEntity | null) {
    this.response = userEntity ? { user: userEntity.toDto() } : null;
  }
}
