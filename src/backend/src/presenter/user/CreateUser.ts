import {
  UserEntity,
  CreateUserPresenter as CreateUserPresenterIF,
  CreateUserOutputData,
} from 'domain-model';

export class CreateUserPresenter implements CreateUserPresenterIF {
  private response: CreateUserOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(userEntity: UserEntity | null) {
    this.response = userEntity ? { user: userEntity.toDto() } : null;
  }
}
