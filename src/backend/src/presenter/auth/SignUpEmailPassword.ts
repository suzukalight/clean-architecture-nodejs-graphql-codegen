import {
  UserEntity,
  SignUpEmailPasswordPresenter as SignUpEmailPasswordPresenterIF,
  SignUpEmailPasswordOutputData,
} from 'domain-model';

export class SignUpEmailPasswordPresenter implements SignUpEmailPasswordPresenterIF {
  private response: SignUpEmailPasswordOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(token: string, user: UserEntity | null) {
    this.response = { token, user: user?.toDto() ?? null };
  }
}
