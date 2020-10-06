import {
  SignInEmailPasswordPresenter,
  SignInEmailPassworOutputData,
  SignUpEmailPasswordPresenter,
  SignUpEmailPasswordOutputData,
} from '../interface/presenter';

export class MockSignInEmailPasswordPresenter implements SignInEmailPasswordPresenter {
  protected response: SignInEmailPassworOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public output(response: SignInEmailPassworOutputData) {
    this.response = response;
  }
}

export class MockSignUpEmailPasswordPresenter implements SignUpEmailPasswordPresenter {
  protected response: SignUpEmailPasswordOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public output(response: SignUpEmailPasswordOutputData) {
    this.response = response;
  }
}
