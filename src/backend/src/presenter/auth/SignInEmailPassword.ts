import {
  UserEntity,
  SignInEmailPasswordPresenter as SignInEmailPasswordPresenterIF,
  SignInEmailPassworOutputData,
} from 'domain-model';

export class SignInEmailPasswordPresenter implements SignInEmailPasswordPresenterIF {
  private response: SignInEmailPassworOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(token: string, user: UserEntity | null) {
    this.response = { token, user: user?.toDto() ?? null };
  }
}
