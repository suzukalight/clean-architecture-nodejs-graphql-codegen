import {
  UserEntity,
  GetUserPresenter as GetUserPresenterIF,
  GetUserOutputData,
} from 'domain-model';

export class GetUserPresenter implements GetUserPresenterIF {
  private response: GetUserOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(userEntity: UserEntity | null) {
    this.response = userEntity ? { user: userEntity.toDto() } : null;
  }
}
