import {
  SignInEmailPasswordPresenter,
  SignInEmailPassworOutputData,
  SignUpEmailPasswordPresenter,
  SignUpEmailPasswordOutputData,
} from '../interface/presenter';
import { UserEntity } from '../../../entity/user/UserEntity';

export class MockSignInEmailPasswordPresenter implements SignInEmailPasswordPresenter {
  protected response: SignInEmailPassworOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public output(token: string, user: UserEntity) {
    this.response = { token, user: user.toDto() };
  }
}

export class MockSignUpEmailPasswordPresenter implements SignUpEmailPasswordPresenter {
  protected response: SignUpEmailPasswordOutputData | null = null;

  public getResponse() {
    return this.response;
  }
  public output(token: string, user: UserEntity) {
    this.response = { token, user: user.toDto() };
  }
}
