import {
  SignInEmailPasswordPresenter,
  SignInEmailPasswordOutputData,
  SignUpEmailPasswordPresenter,
  SignUpEmailPasswordOutputData,
} from '../interface/presenter';

export class MockSignInEmailPasswordPresenter implements SignInEmailPasswordPresenter {
  protected response: SignInEmailPasswordOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public output(response: SignInEmailPasswordOutputData) {
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
