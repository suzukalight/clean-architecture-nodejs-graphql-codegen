import {
  SignInEmailPasswordPresenter,
  SignInEmailPasswordOutputData,
  SignUpEmailPasswordPresenter,
  SignUpEmailPasswordOutputData,
  SignInAuth0Presenter,
  SignInAuth0OutputData,
  SignUpAuth0Presenter,
  SignUpAuth0OutputData,
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

export class MockSignInAuth0Presenter implements SignInAuth0Presenter {
  protected response: SignInAuth0OutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public output(response: SignInAuth0OutputData) {
    this.response = response;
  }
}

export class MockSignUpAuth0Presenter implements SignUpAuth0Presenter {
  protected response: SignUpAuth0OutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public output(response: SignUpAuth0OutputData) {
    this.response = response;
  }
}
